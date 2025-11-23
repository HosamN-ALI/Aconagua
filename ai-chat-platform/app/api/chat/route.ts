import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.REQUESTY_API_KEY) {
      return NextResponse.json(
        { error: 'REQUESTY_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Call Requesty AI API
    const response = await fetch(`${process.env.REQUESTY_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REQUESTY_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Requesty API error:', error);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Save conversation to Supabase
    try {
      const supabase = await createClient();
      await supabase.from('conversations').insert({
        messages: messages,
        response: data.choices[0].message.content,
        model: 'gpt-4o-mini',
        created_at: new Date().toISOString(),
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if DB save fails
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
