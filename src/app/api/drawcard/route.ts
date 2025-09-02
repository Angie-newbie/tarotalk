import { NextResponse } from 'next/server';
import { tarotCards } from '../../lib/tarotCards'; 

export function GET() {
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  const card = tarotCards[randomIndex];

  return NextResponse.json(card);
}