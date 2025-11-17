import { NextResponse } from 'next/server';
import { getMovies } from '@/lib/tmdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'popular';

  try {
    const movies = await getMovies(category);
    return NextResponse.json({ movies });
  } catch (error) {
    console.error('Error in movies API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
