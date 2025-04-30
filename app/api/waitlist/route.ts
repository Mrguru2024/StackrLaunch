import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, occupation } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !occupation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Here you would typically:
    // 1. Validate the email format
    // 2. Store the data in your database
    // 3. Send a welcome email
    // 4. Add to your mailing list

    // For now, we'll just return a success response
    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined the waitlist',
        data: {
          email,
          firstName,
          lastName,
          occupation,
          joinedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
