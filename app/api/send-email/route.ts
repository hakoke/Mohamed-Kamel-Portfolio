import { NextResponse } from 'next/server';
import { Resend } from 'resend';

console.log('=== API Route Loaded ===');
console.log('Environment check:');
console.log('- RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('- RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
console.log('- RESEND_API_KEY prefix:', process.env.RESEND_API_KEY?.substring(0, 10) || 'missing');

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log('\n=== New Email Request ===');
  console.log('Timestamp:', new Date().toISOString());
  
  try {
    const { name, email, message } = await request.json();
    
    console.log('Request data received:');
    console.log('- Name:', name);
    console.log('- Email:', email);
    console.log('- Message length:', message?.length);
    
    console.log('\nAttempting to send via Resend...');
    console.log('Email config:');
    console.log('- From: Portfolio Contact <onboarding@resend.dev>');
    console.log('- To: mykamel.cs@gmail.com');
    console.log('- Reply-To:', email);
    console.log('- Subject: Portfolio Contact from', name);

    const emailPayload = {
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'ynkk46i2@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    console.log('Calling resend.emails.send()...');
    const data = await resend.emails.send(emailPayload);

    console.log('Response received from Resend:');
    console.log('Full response:', JSON.stringify(data, null, 2));
    
    // Check if Resend returned an error (it doesn't always throw)
    if (data.error) {
      console.error('❌ Resend returned an error!');
      console.error('Error name:', data.error.name);
      console.error('Error message:', data.error.message);
      console.error('Full error:', JSON.stringify(data.error, null, 2));
      
      return NextResponse.json(
        { 
          error: 'Resend API error', 
          details: data.error.message,
          errorName: data.error.name
        },
        { status: 400 }
      );
    }
    
    console.log('✅ SUCCESS! Email sent');
    console.log('Email ID:', data.data?.id);
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('\n❌ ERROR sending email');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    if (error.response) {
      console.error('Error response:', error.response);
    }
    
    if (error.statusCode) {
      console.error('Status code:', error.statusCode);
    }
    
    console.error('Full error object:', JSON.stringify(error, null, 2));
    
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: error.message,
        errorType: error.constructor.name,
        statusCode: error.statusCode || 500
      },
      { status: 500 }
    );
  }
}

