import { tarotCards } from '../../lib/tarotCards'; 

export function drawRandomCard() {
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  
  return tarotCards[randomIndex]
}