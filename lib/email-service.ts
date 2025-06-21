import { EmailTemplates, EmailTemplateData } from './email-templates';

// Brevo Configuration
const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'rohancelebrity35@gmail.com';
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'AutoMLGPT';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Brevo API URL
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

interface EmailResults {
  welcome: boolean;
  admin: boolean;
}

interface EmailData {
  to: string;
  toName: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

class EmailServiceClass {
  private adminEmail = 'rohancelebrity35@gmail.com';
  private siteUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || 'https://automlgpt.netlify.app');

  async sendEmail(emailData: EmailData, retryCount = 0): Promise<{ success: boolean; error?: any }> {
    const maxRetries = 3;
    const baseDelay = 2000;
    
        
    try {
      const payload = {
        sender: {
          name: BREVO_SENDER_NAME,
          email: BREVO_SENDER_EMAIL
        },
        to: [{
          email: emailData.to,
          name: emailData.toName
        }],
        subject: emailData.subject,
        htmlContent: emailData.htmlContent,
        ...(emailData.textContent && { textContent: emailData.textContent })
      };

      const response = await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();
      
      if (response.ok) {
        return { success: true };
      } else {
        throw new Error(`Brevo API error: ${responseData.message || 'Unknown error'}`);
      }
      
    } catch (error: any) {
      // Handle rate limiting with exponential backoff
      if (error.status === 429 && retryCount < maxRetries) {
        const delay = baseDelay * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.sendEmail(emailData, retryCount + 1);
      }
      
      // If it's a rate limit error and we've exhausted retries
      if (error.status === 429) {
        return { 
          success: false, 
          error: {
            ...error,
            userMessage: 'Email service is temporarily busy. Please try again in a few minutes.'
          }
        };
      }
      
      return { success: false, error };
    }
  }

  async sendWelcomeEmail(userData: EmailTemplateData): Promise<boolean> {
    try {
      const { subject, html } = EmailTemplates.getUserWelcomeEmail(userData);
      
      const textContent = `
Welcome to AutoMLGPT, ${userData.name}!

Thank you for joining AutoMLGPT! You've taken the first step towards transforming your ideas into intelligent models using the power of AI. We're excited to have you on board! 🚀

Your ${userData.planType || 'free'} plan is now active and ready to use.

What's Next?
- Visit our Chat page to start building your first AI model
- Explore our dashboard to manage your projects
- Check out our documentation for guides and tutorials

Need Help?
Reply to this email or visit our Help Center. We're here to support your AI journey every step of the way.

Welcome to the future of machine learning!
The AutoMLGPT Team
🧠 Transforming Ideas into Intelligence
      `.trim();
      
      const emailData: EmailData = {
        to: userData.email,
        toName: userData.name,
        subject: subject,
        htmlContent: html,
        textContent: textContent
      };

      const result = await this.sendEmail(emailData);
      return result.success;
    } catch (error) {
      return false;
    }
  }

  async sendAdminNotification(userData: EmailTemplateData): Promise<boolean> {
    try {
      const { subject, html } = EmailTemplates.getAdminNotificationEmail(userData);
      
      const textContent = `
⭐ New Pro User: ${userData.name}

A new Professional user has registered for AutoMLGPT:

User Information:
- Name: ${userData.name}
- Email: ${userData.email}
- Plan: Professional ($15/month)
- Status: Early Bird Pricing Locked
- Registration Time: ${new Date().toLocaleString()}

Next Steps:
• Add to Pro early access list
• Prepare payment link when service is ready
• Early bird pricing ($15/month) is locked in
• Add to priority support queue

Contact User: ${userData.email}

AutoMLGPT Admin Team
🧠 Transforming Ideas into Intelligence
      `.trim();
      
      const emailData: EmailData = {
        to: this.adminEmail,
        toName: 'AutoML Pro Admin',
        subject: subject,
        htmlContent: html,
        textContent: textContent
      };

      const result = await this.sendEmail(emailData);
      return result.success;
    } catch (error) {
      return false;
    }
  }

  async sendBothEmails(userData: EmailTemplateData): Promise<EmailResults> {
    const results: EmailResults = {
      welcome: false,
      admin: false
    };

    try {
      // Send welcome email first
      results.welcome = await this.sendWelcomeEmail(userData);
      
      // Only send admin notification for Pro users (not free users)
      if (userData.planType === 'pro' || userData.planType === 'enterprise') {
        // Wait 2 seconds before sending admin notification
        if (results.welcome) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        // Send admin notification only for Pro/Enterprise users
        results.admin = await this.sendAdminNotification(userData);
      } else {
        // For free users, skip admin notification (you'll analyze from database)
        results.admin = true; // Set to true to indicate "success" (no email needed)
      }
      
      return results;
    } catch (error) {
      return results;
    }
  }

  // Method to send admin notification only for specific plan types
  async sendAdminNotificationIfNeeded(userData: EmailTemplateData): Promise<boolean> {
    // Only send admin notifications for Pro and Enterprise users
    if (userData.planType === 'pro' || userData.planType === 'enterprise') {
      return await this.sendAdminNotification(userData);
    }
    
    // For free users, return true (no notification needed - analyze from database)
    return true;
  }
}

// Export singleton instance
export const EmailService = new EmailServiceClass();

// Export types for external use
export type { EmailTemplateData, EmailResults };