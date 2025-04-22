// Image generation service for the MyStory AI app
// This file connects the UI to the image generation API

import { ImageGenerationRequest, generateImage, generateImageWithStability } from './api/image';

// Configuration for image generation
const IMAGE_CONFIG = {
  size: '1024x1024',
  style: 'vivid', // For DALL-E
  useStability: false // Set to true to use Stability.ai instead of DALL-E
};

/**
 * Enhances the image prompt to make it more child-friendly and detailed
 */
export function enhanceImagePrompt(prompt: string): string {
  return `Create a child-friendly, colorful illustration for a children's story: ${prompt}. 
          Make it appropriate for children aged 4-8, with bright colors and a playful style.
          No scary elements, violence, or inappropriate content.
          Style: Colorful, cute, rounded shapes, soft edges, bright lighting.`;
}

/**
 * Generates images for all scenes in a story
 */
export async function generateImagesForStory(scenes: Array<{ title: string; image_prompt: string }>) {
  try {
    console.log(`Generating images for ${scenes.length} scenes...`);
    
    const imagePromises = scenes.map((scene, index) => {
      const enhancedPrompt = enhanceImagePrompt(scene.image_prompt);
      console.log(`Scene ${index + 1}: ${scene.title}`);
      console.log(`Enhanced prompt: ${enhancedPrompt.substring(0, 100)}...`);
      
      const request: ImageGenerationRequest = {
        prompt: enhancedPrompt,
        size: IMAGE_CONFIG.size,
        style: IMAGE_CONFIG.style
      };
      
      // Use either DALL-E or Stability.ai based on configuration
      return IMAGE_CONFIG.useStability 
        ? generateImageWithStability(request)
        : generateImage(request);
    });
    
    return Promise.all(imagePromises);
  } catch (error) {
    console.error('Error generating images for story:', error);
    throw new Error('Failed to generate images for story');
  }
}

/**
 * Generates a single image for a specific scene
 */
export async function generateImageForScene(sceneTitle: string, imagePrompt: string) {
  try {
    console.log(`Generating image for scene: ${sceneTitle}`);
    
    const enhancedPrompt = enhanceImagePrompt(imagePrompt);
    console.log(`Enhanced prompt: ${enhancedPrompt.substring(0, 100)}...`);
    
    const request: ImageGenerationRequest = {
      prompt: enhancedPrompt,
      size: IMAGE_CONFIG.size,
      style: IMAGE_CONFIG.style
    };
    
    // Use either DALL-E or Stability.ai based on configuration
    return IMAGE_CONFIG.useStability 
      ? generateImageWithStability(request)
      : generateImage(request);
  } catch (error) {
    console.error(`Error generating image for scene ${sceneTitle}:`, error);
    throw new Error(`Failed to generate image for scene ${sceneTitle}`);
  }
}

/**
 * Preloads images to improve user experience
 */
export function preloadImages(imageUrls: string[]) {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
