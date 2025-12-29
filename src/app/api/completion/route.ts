// app/api/completion/route.ts
import {OpenAIApi, Configuration} from 'openai-edge'
import { gateway } from 'ai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 });
    }

    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY!,
    });

    const openai = new OpenAIApi(config);

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages:[{
            role:'system',
            content:'You are a helpful AI embedded in a notion test editor app that is used to autocomplete sentences. The traitsof AI include expert knowledge, helpfulness, cleverness, and articulatness. AI is well-behaved and well-mannered individual who is always friednly, kind, insiring, and is eager to provide vivid and thoughtful repsonses.'
        },
        {
            role:'user',
            content:`I'm writing a piece of text in a notion text editor appRouterContext. Help me complete my train of thoughts here: ##${prompt}## keep the tone of the text consistent with the rest of the test. And keep the response short and sweet.`
        }
    ],
    });

   const data = await response.json();
    if (!data.choices) {
        console.error("OpenAI error response:", data);
        throw new Error("OpenAI did not return choices");
    }

  const text = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to generate AI text' }), { status: 500 });
  }
}
