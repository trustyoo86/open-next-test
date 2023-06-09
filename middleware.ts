import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log('test middleware');

  const response =  NextResponse.next();

  response.headers.set('x-middleware', 'hello');

  return response;
}