// DALL-E/Stability.ai API integration for image generation

// In a production app, this would be stored in environment variables
const DALLE_API_KEY = 'sk-demo-key-replace-with-real-key';
const STABILITY_API_KEY = 'sk-demo-key-replace-with-real-key';

export interface ImageGenerationRequest {
  prompt: string;
  size?: string; // e.g., "1024x1024"
  style?: string; // e.g., "vivid" or "natural"
}

export interface ImageGenerationResponse {
  url: string;
  alt: string;
}

/**
 * Generates an image using DALL-E based on the provided prompt
 */
export async function generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
  try {
    const { prompt, size = "1024x1024", style = "vivid" } = request;
    
    console.log('Generating image with prompt:', prompt);
    
    // In a real app, we would make the API call to DALL-E
    // const response = await fetch('https://api.openai.com/v1/images/generations', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${DALLE_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: "dall-e-3",
    //     prompt: `Create a child-friendly, colorful illustration for a children's story: ${prompt}. 
    //              Make it appropriate for children aged 4-8, with bright colors and a playful style.
    //              No scary elements, violence, or inappropriate content.`,
    //     n: 1,
    //     size: size,
    //     style: style
    //   })
    // });
    
    // const data = await response.json();
    // return {
    //   url: data.data[0].url,
    //   alt: prompt
    // };
    
    // For demo purposes, return a placeholder image
    return generateMockImage(prompt);
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}

/**
 * Alternative implementation using Stability.ai
 */
export async function generateImageWithStability(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
  try {
    const { prompt } = request;
    
    console.log('Generating image with Stability.ai, prompt:', prompt);
    
    // In a real app, we would make the API call to Stability.ai
    // const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${STABILITY_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     text_prompts: [
    //       {
    //         text: `Create a child-friendly, colorful illustration for a children's story: ${prompt}. 
    //                Make it appropriate for children aged 4-8, with bright colors and a playful style.
    //                No scary elements, violence, or inappropriate content.`,
    //         weight: 1
    //       }
    //     ],
    //     cfg_scale: 7,
    //     height: 1024,
    //     width: 1024,
    //     samples: 1,
    //     steps: 30
    //   })
    // });
    
    // const data = await response.json();
    // const base64Image = data.artifacts[0].base64;
    // const imageUrl = `data:image/png;base64,${base64Image}`;
    
    // return {
    //   url: imageUrl,
    //   alt: prompt
    // };
    
    // For demo purposes, return a placeholder image
    return generateMockImage(prompt);
  } catch (error) {
    console.error('Error generating image with Stability.ai:', error);
    throw new Error('Failed to generate image with Stability.ai');
  }
}

/**
 * Generates a mock image URL for demo purposes
 */
function generateMockImage(prompt: string): ImageGenerationResponse {
  // Create a placeholder image URL with the prompt encoded
  const encodedPrompt = encodeURIComponent(prompt);
  const colors = ['9C27B0', '2196F3', '4CAF50', 'FF9800', 'E91E63', '3F51B5', '009688'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return {
    url: `https://placehold.co/1024x1024/${randomColor}/FFFFFF?text=${encodedPrompt.substring(0, 100)}`,
    alt: prompt
  };
}
