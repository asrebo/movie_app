import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const searchQuery  = await request.text();

  console.log(searchQuery);

  const res = await fetch('https://api.themoviedb.org/3/search/movie?query=' + searchQuery ,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.API_KEY,
      },
    }
  );

  return NextResponse.json(await res.json());
}
