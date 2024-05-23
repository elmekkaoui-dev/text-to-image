import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { NextApiRequest } from "next";

// Create a POST API Route
export async function POST(req: any, res:NextResponse) {
    const inference = new HfInference(process.env.HF_APIKEY);
    const model = "ZB-Tech/Text-to-Image";
  // Extract the prompt from the request body
  const request = await req.json()
  const prompt = request.prompt as string;

      console.log('------------- body: ', prompt);
      
  // use the model
    const result = await inference.textToImage({
        inputs: prompt,
        model: model
    })
  // log the result
  console.log(result)


  // Hugging Face will return us the generated image as a blob, forward it to our frontend
  //const result = await response.blob();
  const finalResponse = new NextResponse(result)
  return finalResponse
}
