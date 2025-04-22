// ElevenLabs API integration for voice narration

// In a production app, this would be stored in environment variables
const ELEVENLABS_API_KEY = 'demo-key-replace-with-real-key';

export interface NarrationRequest {
  text: string;
  voice_id?: string; // Voice ID to use
  model_id?: string; // Model ID to use
}

export interface NarrationResponse {
  audio_url: string;
  duration_seconds: number;
}

/**
 * Generates voice narration using ElevenLabs API based on the provided text
 */
export async function generateNarration(request: NarrationRequest): Promise<NarrationResponse> {
  try {
    const { 
      text, 
      voice_id = "pNInz6obpgDQGcFmaJgB", // Default to a child-friendly voice
      model_id = "eleven_multilingual_v2" 
    } = request;
    
    console.log('Generating narration for text:', text.substring(0, 50) + '...');
    
    // In a real app, we would make the API call to ElevenLabs
    // const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'xi-api-key': ELEVENLABS_API_KEY
    //   },
    //   body: JSON.stringify({
    //     text: text,
    //     model_id: model_id,
    //     voice_settings: {
    //       stability: 0.75,
    //       similarity_boost: 0.75,
    //       style: 0.5,
    //       use_speaker_boost: true
    //     }
    //   })
    // });
    
    // const audioBlob = await response.blob();
    // const audioUrl = URL.createObjectURL(audioBlob);
    
    // // Estimate duration (rough estimate: ~3 words per second for children's narration)
    // const wordCount = text.split(' ').length;
    // const estimatedDuration = wordCount / 3;
    
    // return {
    //   audio_url: audioUrl,
    //   duration_seconds: estimatedDuration
    // };
    
    // For demo purposes, return a mock audio URL
    return generateMockNarration(text);
  } catch (error) {
    console.error('Error generating narration:', error);
    throw new Error('Failed to generate narration');
  }
}

/**
 * Generates a mock narration response for demo purposes
 */
function generateMockNarration(text: string): NarrationResponse {
  // Estimate duration (rough estimate: ~3 words per second for children's narration)
  const wordCount = text.split(' ').length;
  const estimatedDuration = wordCount / 3;
  
  return {
    audio_url: 'https://example.com/mock-audio.mp3', // This would be a real audio URL in production
    duration_seconds: estimatedDuration
  };
}
