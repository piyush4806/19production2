import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, url, category } = body;

    if (!title || !url) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const video = {
      id: Date.now().toString(),
      title,
      url,
      category: category || 'Music Video',
      date: new Date().toISOString().split('T')[0],
    };

    return NextResponse.json({ success: true, video });
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Videos API' });
}
