import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: 'REPLICATE_API_TOKEN not configured' },
        { status: 500 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Using Stable Diffusion for image generation
    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      {
        input: {
          prompt: prompt,
          num_outputs: 1,
        }
      }
    );

    // Save to Supabase
    try {
      const supabase = await createClient();
      await supabase.from('generated_images').insert({
        prompt: prompt,
        image_url: Array.isArray(output) ? output[0] : output,
        created_at: new Date().toISOString(),
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if DB save fails
    }

    return NextResponse.json({
      success: true,
      image: Array.isArray(output) ? output[0] : output,
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
