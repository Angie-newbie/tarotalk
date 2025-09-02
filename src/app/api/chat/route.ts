// To handle api request and response
import { NextRequest, NextResponse } from "next/server";
// Openai SDK class use to talk to gpt
import { OpenAI } from "openai";
import { drawRandomCard } from "../drawcard/route"; 

// create a own open ai instance with secretkey
const openai = new OpenAI({
    //TODO: Change to seccret key
    apiKey: process.env.OPENAI_API_KEY
});

// exporting a POST function, which Next.js will call when someone sends a POST request to /api/chat.
export async function POST(req: NextRequest){
    // reads the JSON body of the request (e.g., { "question": "Will I find love?" }).
    const {question} = await req.json();

    if (!question){
        return NextResponse.json({error: 'missing questions'}, {status: 400});
    }

    // Draw a card
    const card = drawRandomCard();

    //Build the Prompt for GPT
    const prompt =  ` You are a mystical tarot reader. A user has drawn the card: "${card.name}", which means: "${card.meaning}".
    Their question is: "${question}".

    Give them a poetic and thoughtful tarot reading. Use simple language but add a touch of mysticism.
    `;

    try{
        // Call GPT-4
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8,
        })

        // Return the Result
        const aiReply = response.choices[0].message.content;
        return NextResponse.json({
            card,
            reading: aiReply
        });
        
    } catch (error){
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch reading' }, { status: 500 });
    }
}