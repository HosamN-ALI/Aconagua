-- AI Chat Platform Database Schema
-- This migration sets up the initial database structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    messages JSONB NOT NULL,
    response TEXT NOT NULL,
    model VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create generated_images table
CREATE TABLE IF NOT EXISTS public.generated_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prompt TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON public.conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generated_images_created_at ON public.generated_images(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your needs)
CREATE POLICY "Allow public read access to conversations"
    ON public.conversations
    FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert to conversations"
    ON public.conversations
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public read access to generated_images"
    ON public.generated_images
    FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert to generated_images"
    ON public.generated_images
    FOR INSERT
    WITH CHECK (true);

-- Add comments for documentation
COMMENT ON TABLE public.conversations IS 'Stores AI chat conversations';
COMMENT ON TABLE public.generated_images IS 'Stores generated images metadata';
