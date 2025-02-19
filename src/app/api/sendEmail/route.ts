/* // pages/api/sendEmail.ts
import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, subject, text, html } = req.body;

    const msg = {
      to,
      from: 'agentfinder@canadacriminallawyer.ca',
      subject,
      text,
      html,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}*/

// src/app/api/sendEmail/route.ts
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

// Define the POST handler
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { to, subject, text, html } = await request.json();

    // Validate the required fields
    if (!to || !subject || !text || !html) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare the email data
    const msg = {
      to,
      from: 'agentfinder@canadacriminallawyer.ca', 
      subject,
      text,
      html,
    };

    // Send the email
    await sgMail.send(msg);

    // Return a success response
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    // Return an error response
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}