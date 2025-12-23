import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
  const response = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
          You are a creative AI assistant that generates prompts for image generation.
          Output ONLY a description for the object itself, suitable for DALL·E.
          Use a minimalistic, flat-style illustration.
          Do NOT include lists, notebook elements, text, or titles.
          Examples:
          Input: "cat"
          Output: "minimalistic flat illustration of a cute cat, simple shapes, pastel colors, centered, no background distractions"
          Input: "dog"
          Output: "minimalistic flat illustration of a playful dog, simple shapes, pastel colors, centered, no background distractions"
          `
      },
      {
        role: "user",
        content: `Generate a thumbnail description for a notebook titled "${name}".`,
      },
    ],
  });

  const data = await response.json();

  if (!data.choices) {
    console.error("OpenAI error response:", data);
    throw new Error("OpenAI did not return choices");
  }

  const image_description = data.choices?.[0]?.message?.content;

  if (!image_description) {
    console.error("OpenAI empty content:", data);
    throw new Error("No content returned from OpenAI");
  }
  return image_description;
}


export async function generateImage(image_description: string): Promise<string> {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1,
      size: "256x256",
    });

    const data = await response.json();

    const image_url = data?.data?.[0]?.url;

    if (!image_url) {
      console.error("OpenAI image response:", data);
      throw new Error("No image URL returned from OpenAI");
    }

    return image_url;
  } catch (error) {
    console.error("generateImage error:", error);
    throw error;
  }
}
