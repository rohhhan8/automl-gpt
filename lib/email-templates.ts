export interface EmailTemplateData {
  name: string;
  email: string;
  planType?: 'free' | 'pro' | 'enterprise';
  message?: string;
}

export class EmailTemplates {
  private static siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://automlgpt.netlify.app';
  private static adminEmail = 'rohancelenrity35@gmail.com';

  // Base HTML template with modern styling - Optimized for email clients
  private static getBaseTemplate(content: string): string {
    return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>AutoML Pro</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Base styles */
        body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #1f2937;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .logo {
            display: inline-block;
            margin-bottom: 20px;
        }
        
        .logo-icon {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            text-align: center;
            line-height: 40px;
            margin-right: 12px;
            font-size: 20px;
        }
        
        .logo-text {
            color: white;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.5px;
            vertical-align: middle;
        }
        
        .header-title {
            color: white;
            font-size: 32px;
            font-weight: 700;
            margin: 0 0 10px 0;
        }
        
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 18px;
            font-weight: 500;
            margin: 0;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 20px 0;
        }
        
        .message {
            font-size: 16px;
            color: #4b5563;
            margin: 0 0 30px 0;
            line-height: 1.7;
        }
        
        .plan-card {
            background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
            border: 2px solid #10b981;
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            position: relative;
        }
        
        .plan-badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        
        .plan-title {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 10px 0;
        }
        
        .plan-price {
            font-size: 32px;
            font-weight: 800;
            color: #10b981;
            margin: 0 0 20px 0;
        }
        
        .plan-price .original {
            font-size: 18px;
            color: #9ca3af;
            text-decoration: line-through;
            margin-left: 10px;
        }
        
        .features-list {
            list-style: none;
            margin: 20px 0;
            padding: 0;
        }
        
        .features-list li {
            padding: 8px 0;
            font-size: 15px;
            color: #374151;
        }
        
        .check-icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: #10b981;
            border-radius: 50%;
            text-align: center;
            line-height: 20px;
            color: white;
            font-size: 12px;
            margin-right: 12px;
            vertical-align: middle;
        }
        
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
        }
        
        .info-grid {
            margin: 30px 0;
        }
        
        .info-card {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .info-card-icon {
            font-size: 24px;
            margin-bottom: 15px;
        }
        
        .info-card-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 8px 0;
        }
        
        .info-card-desc {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
        }
        
        .footer {
            background: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        
        .footer-text {
            color: #6b7280;
            font-size: 14px;
            margin: 0 0 20px 0;
        }
        
        .social-links {
            margin: 0 0 20px 0;
        }
        
        .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: #e5e7eb;
            border-radius: 8px;
            text-align: center;
            line-height: 40px;
            text-decoration: none;
            margin: 0 7px;
            font-size: 18px;
        }
        
        .divider {
            height: 1px;
            background: #e5e7eb;
            margin: 30px 0;
        }
        
        .highlight {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid #f59e0b;
            margin: 20px 0;
        }
        
        .admin-alert {
            background: linear-gradient(135deg, #fef2f2, #fee2e2);
            border: 2px solid #ef4444;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .admin-alert-title {
            color: #dc2626;
            font-size: 20px;
            font-weight: 700;
            margin: 0 0 10px 0;
        }
        
        /* Mobile responsive */
        @media only screen and (max-width: 600px) {
            .email-container {
                border-radius: 12px;
                margin: 10px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .header-title {
                font-size: 28px;
            }
            
            .plan-card {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        ${content}
    </div>
</body>
</html>`;
  }

  // Welcome email template for users
  static getUserWelcomeEmail(userData: EmailTemplateData): { subject: string; html: string } {
    type PlanDetails = {
      title: string;
      emoji: string;
      pricing: string;
      originalPrice?: string;
      badge: string;
      features: string[];
      nextSteps: string;
      ctaText: string;
      ctaUrl: string;
    };

    const planDetails: Record<'free' | 'pro' | 'enterprise', PlanDetails> = {
      free: {
        title: 'Free Plan',
        emoji: '🆓',
        pricing: 'Free Forever',
        badge: 'STARTER',
        features: [
          '5 ML models per month',
          'Basic datasets (up to 1GB)',
          'Community support',
          'Standard processing speed',
          'Basic analytics',
          'Public model sharing'
        ],
        nextSteps: 'Visit our Chat page to start building your first AI model!',
        ctaText: 'Start Building Now',
        ctaUrl: `${this.siteUrl}/chat`
      },
      pro: {
        title: 'Professional Plan',
        emoji: '⭐',
        pricing: '$15/month',
        originalPrice: '$20/month',
        badge: 'EARLY BIRD',
        features: [
          '50 ML models per month',
          'Large datasets (up to 10GB)',
          'Priority email support',
          'Fast processing speed',
          'Advanced analytics',
          'Private model hosting',
          'API access',
          'Custom preprocessing'
        ],
        nextSteps: 'We\'ll send payment details when our ML service is ready. Your early bird pricing is locked in!',
        ctaText: 'View Dashboard',
        ctaUrl: `${this.siteUrl}/dashboard`
      },
      enterprise: {
        title: 'Enterprise Plan',
        emoji: '🏢',
        pricing: 'Custom Pricing',
        badge: 'ENTERPRISE',
        features: [
          'Unlimited ML models',
          'Unlimited dataset size',
          '24/7 dedicated support',
          'Lightning-fast processing',
          'Advanced analytics & reporting',
          'Private cloud deployment',
          'Full API access',
          'Custom integrations',
          'SLA guarantee',
          'On-premise options'
        ],
        nextSteps: 'Our enterprise team will contact you soon to discuss custom pricing and implementation.',
        ctaText: 'Contact Enterprise Team',
        ctaUrl: `${this.siteUrl}/contact`
      }
    };

    const plan = planDetails[userData.planType || 'free'];
    const subject = `🎉 Welcome to AutoML Pro - Your ${plan.title} is Ready!`;

    const content = `
        <div class="header">
            <div class="logo">
                <span class="logo-icon">🧠</span>
                <span class="logo-text">AutoML Pro</span>
            </div>
            <h1 class="header-title">Welcome to the Future!</h1>
            <p class="header-subtitle">Your AI journey starts here</p>
        </div>
        
        <div class="content">
            <h2 class="greeting">Hello ${userData.name}! 👋</h2>
            
            <p class="message">
                Thank you for joining AutoML Pro! You've taken the first step towards transforming your ideas into intelligent models using the power of AI.
            </p>
            
            <div class="plan-card">
                <div class="plan-badge">
                    ${plan.emoji} ${plan.badge}
                </div>
                <h3 class="plan-title">${plan.title}</h3>
                <div class="plan-price">
                    ${plan.pricing}
                    ${plan.originalPrice ? `<span class="original">${plan.originalPrice}</span>` : ''}
                </div>
                
                <ul class="features-list">
                    ${plan.features.map(feature => `
                        <li>
                            <span class="check-icon">✓</span>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-card-icon">💬</div>
                    <h4 class="info-card-title">Describe Your Task</h4>
                    <p class="info-card-desc">Simply tell us what you want to achieve in plain English</p>
                </div>
                <div class="info-card">
                    <div class="info-card-icon">🤖</div>
                    <h4 class="info-card-title">AI Does the Work</h4>
                    <p class="info-card-desc">Our AI analyzes and builds your model automatically</p>
                </div>
                <div class="info-card">
                    <div class="info-card-icon">📊</div>
                    <h4 class="info-card-title">Get Results</h4>
                    <p class="info-card-desc">Download your trained model and start using it</p>
                </div>
            </div>
            
            <div class="highlight">
                <strong>What's Next?</strong><br>
                ${plan.nextSteps}
            </div>
            
            <div class="cta-section">
                <a href="${plan.ctaUrl}" class="cta-button">${plan.ctaText}</a>
            </div>
            
            <div class="divider"></div>
            
            <p class="message">
                <strong>Need Help?</strong><br>
                Reply to this email or visit our Help Center. We're here to support your AI journey every step of the way.
            </p>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="https://twitter.com/automlpro" class="social-link">🐦</a>
                <a href="https://linkedin.com/company/automlpro" class="social-link">💼</a>
                <a href="https://github.com/automlpro" class="social-link">🐙</a>
            </div>
            <p class="footer-text">
                Welcome to the future of machine learning!<br>
                <strong>The AutoML Pro Team</strong><br>
                🧠 Transforming Ideas into Intelligence
            </p>
        </div>
    `;

    return {
      subject,
      html: this.getBaseTemplate(content)
    };
  }

  // Admin notification email template
  static getAdminNotificationEmail(userData: EmailTemplateData): { subject: string; html: string } {
    const planEmojis = {
      free: '🆓',
      pro: '⭐',
      enterprise: '🏢'
    };

    const planNames = {
      free: 'Free Plan',
      pro: 'Professional Plan',
      enterprise: 'Enterprise Plan'
    };

    const plan = userData.planType || 'free';
    const subject = `🚨 NEW USER ALERT: ${userData.name} registered for ${planNames[plan]}`;

    const actionItems = {
      free: [
        'Add to free user monitoring list',
        'Track usage patterns for upgrade opportunities',
        'Send follow-up emails about Pro features',
        'Monitor engagement metrics'
      ],
      pro: [
        'Add user to Pro early access list',
        'Prepare payment link for when service is ready',
        'Ensure early bird pricing ($15/month) is locked in',
        'Add to priority support queue'
      ],
      enterprise: [
        'Schedule enterprise demo call within 24 hours',
        'Prepare custom pricing proposal',
        'Assign dedicated account manager',
        'Send enterprise welcome package'
      ]
    };

    const content = `
        <div class="header">
            <div class="logo">
                <span class="logo-icon">🚨</span>
                <span class="logo-text">Admin Alert</span>
            </div>
            <h1 class="header-title">New User Registration</h1>
            <p class="header-subtitle">Action Required</p>
        </div>
        
        <div class="content">
            <div class="admin-alert">
                <h3 class="admin-alert-title">🚨 NEW USER REGISTRATION ALERT</h3>
                <p>A new user has registered for the ${planNames[plan]}. Immediate action may be required.</p>
            </div>
            
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-card-icon">👤</div>
                    <h4 class="info-card-title">User Information</h4>
                    <div class="info-card-desc">
                        <strong>Name:</strong> ${userData.name}<br>
                        <strong>Email:</strong> ${userData.email}<br>
                        <strong>Plan:</strong> ${planEmojis[plan]} ${planNames[plan]}
                    </div>
                </div>
                <div class="info-card">
                    <div class="info-card-icon">⏰</div>
                    <h4 class="info-card-title">Registration Details</h4>
                    <div class="info-card-desc">
                        <strong>Time:</strong> ${new Date().toLocaleString()}<br>
                        <strong>Source:</strong> AutoML Pro Website<br>
                        <strong>Status:</strong> Active
                    </div>
                </div>
            </div>
            
            <div class="plan-card">
                <div class="plan-badge">
                    ${planEmojis[plan]} ${planNames[plan].toUpperCase()}
                </div>
                <h3 class="plan-title">Plan Details</h3>
                
                ${plan === 'free' ? `
                    <p class="message">
                        <strong>🆓 FREE PLAN USER</strong><br>
                        • User signed up for the free plan<br>
                        • They can upgrade to Pro or Enterprise anytime<br>
                        • Monitor usage for upgrade opportunities
                    </p>
                ` : plan === 'pro' ? `
                    <p class="message">
                        <strong>⭐ PROFESSIONAL PLAN (EARLY ACCESS)</strong><br>
                        • User registered for early access to Pro Plan<br>
                        • Early bird pricing: $15/month (Save $5!)<br>
                        • Send payment link when ML service is ready<br>
                        • Pricing is locked in for this user
                    </p>
                ` : `
                    <p class="message">
                        <strong>🏢 ENTERPRISE PLAN INQUIRY</strong><br>
                        • User interested in Enterprise Plan<br>
                        • Custom pricing discussion required<br>
                        • Schedule demo call ASAP<br>
                        • Assign dedicated account manager
                    </p>
                `}
            </div>
            
            <div class="highlight">
                <strong>⚡ ACTION REQUIRED:</strong><br><br>
                <ul class="features-list">
                    ${actionItems[plan].map(action => `
                        <li>
                            <span class="check-icon">⚡</span>
                            ${action}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-card-icon">📧</div>
                    <h4 class="info-card-title">Contact User</h4>
                    <div class="info-card-desc">
                        <a href="mailto:${userData.email}" style="color: #10b981; text-decoration: none;">
                            ${userData.email}
                        </a>
                    </div>
                </div>
                <div class="info-card">
                    <div class="info-card-icon">📊</div>
                    <h4 class="info-card-title">Admin Dashboard</h4>
                    <div class="info-card-desc">
                        <a href="${this.siteUrl}/admin" style="color: #10b981; text-decoration: none;">
                            View Dashboard
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="cta-section">
                <a href="mailto:${userData.email}" class="cta-button">Contact User Now</a>
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                This is an automated notification from AutoML Pro.<br>
                Please take appropriate action based on the user's plan type.<br><br>
                <strong>Admin Team - AutoML Pro</strong>
            </p>
        </div>
    `;

    return {
      subject,
      html: this.getBaseTemplate(content)
    };
  }
}