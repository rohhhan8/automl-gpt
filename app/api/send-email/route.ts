import { NextRequest, NextResponse } from 'next/server';
import { EmailService, EmailTemplateData } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userData, emailType } = body;

    if (!userData || !userData.name || !userData.email) {
      return NextResponse.json(
        { error: 'Missing required user data (name, email)' },
        { status: 400 }
      );
    }

    const emailData: EmailTemplateData = {
      name: userData.name,
      email: userData.email,
      planType: userData.planType || 'free',
      message: userData.message
    };

    let results;

    switch (emailType) {
      case 'welcome':
        const welcomeResult = await EmailService.sendWelcomeEmail(emailData);
        results = { welcome: welcomeResult, admin: false };
        break;
      
      case 'admin':
        const adminResult = await EmailService.sendAdminNotification(emailData);
        results = { welcome: false, admin: adminResult };
        break;
      
      case 'both':
      default:
        results = await EmailService.sendBothEmails(emailData);
        break;
    }

    return NextResponse.json({
      success: true,
      results
    });

  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        message: 'Email sending failed'
      },
      { status: 500 }
    );
  }
}