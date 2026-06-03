import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const submission = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      service,
      message,
      date: new Date().toISOString().split('T')[0],
      read: false,
    };

    return NextResponse.json({ success: true, submission });
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Submissions API' });
}
