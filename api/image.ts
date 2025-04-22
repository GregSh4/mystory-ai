export type ImageGenerationRequest = {
  prompt: string;
  size?: string;   // ✅ optional, or remove ? if always required
  style?: string;  // ✅ optional
};

export function generateImage(request: ImageGenerationRequest) {
  console.log("Fake image generation for:", request.prompt);
  return Promise.resolve("https://placekitten.com/512/512");
}

export function generateImageWithStability(request: ImageGenerationRequest) {
  console.log("Fake stable image generation for:", request.prompt);
  return Promise.resolve("https://placebear.com/512/512");
}
