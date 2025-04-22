// OpenAI API integration for story generation

// In a production app, this would be stored in environment variables
const OPENAI_API_KEY = 'sk-demo-key-replace-with-real-key';

export interface StoryPrompt {
  character: string;
  theme: string;
  setting: string;
}

export interface StoryScene {
  title: string;
  text: string;
  image_prompt: string;
}

export interface GeneratedStory {
  title: string;
  scenes: StoryScene[];
}

/**
 * Generates a story using OpenAI's GPT model based on the provided prompt
 */
export async function generateStory(prompt: StoryPrompt): Promise<GeneratedStory> {
  try {
    // In a real app with proper API key, we would make the actual API call
    // For demo purposes, we'll simulate the API call with a delay
    
    console.log('Generating story with prompt:', prompt);
    
    // This is the system prompt that would be sent to OpenAI
    const systemPrompt = `
      You are a playful and creative storyteller for children aged 4 to 8. 
      Your stories must be safe, wholesome, imaginative, and use simple vocabulary. 
      Each story includes 5 scenes with text and a visual description for each.
    `;
    
    // This is the user prompt that would be sent to OpenAI
    const userPrompt = `
      Create a children's story with the following elements:
      - Main character: ${prompt.character}
      - Theme: ${prompt.theme}
      - Setting: ${prompt.setting}
      
      Format your response as a JSON object with the following structure:
      {
        "title": "Story Title",
        "scenes": [
          {
            "title": "Scene Title",
            "text": "Scene text content appropriate for children aged 4-8...",
            "image_prompt": "Detailed description for image generation"
          },
          ...more scenes (5 total)
        ]
      }
    `;
    
    // In a real app, we would make the API call to OpenAI
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4',
    //     messages: [
    //       { role: 'system', content: systemPrompt },
    //       { role: 'user', content: userPrompt }
    //     ],
    //     temperature: 0.7,
    //     max_tokens: 1500
    //   })
    // });
    
    // const data = await response.json();
    // return JSON.parse(data.choices[0].message.content) as GeneratedStory;
    
    // For demo purposes, return a mock story based on the prompt
    return generateMockStory(prompt);
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error('Failed to generate story');
  }
}

/**
 * Generates a mock story for demo purposes
 */
function generateMockStory(prompt: StoryPrompt): GeneratedStory {
  const { character, theme, setting } = prompt;
  
  // Create a title based on the prompt
  const title = `${character}'s ${theme.charAt(0).toUpperCase() + theme.slice(1)} in the ${setting.charAt(0).toUpperCase() + setting.slice(1)}`;
  
  // Create scenes based on the theme
  let scenes: StoryScene[] = [];
  
  if (theme === 'adventure') {
    scenes = [
      {
        title: "The Beginning",
        text: `${character} was excited to explore the ${setting}. It was a beautiful day and there was so much to discover!`,
        image_prompt: `A cheerful ${character} standing at the entrance of a ${setting}, looking excited and ready for adventure, bright colors, child-friendly style`
      },
      {
        title: "The Discovery",
        text: `While exploring, ${character} found a mysterious map hidden under a rock. It showed the way to a secret treasure!`,
        image_prompt: `${character} finding a colorful treasure map under a rock in the ${setting}, looking surprised and curious, child-friendly style`
      },
      {
        title: "The Challenge",
        text: `To reach the treasure, ${character} had to cross a wobbly bridge over a bubbling stream. It was a little scary, but ${character} was brave!`,
        image_prompt: `${character} carefully crossing a wooden bridge over a stream in the ${setting}, looking determined, child-friendly style`
      },
      {
        title: "The Surprise",
        text: `The treasure wasn't gold or jewels - it was a magical seed! When planted, it grew into a beautiful flower that glowed with rainbow colors.`,
        image_prompt: `${character} planting a magical seed in the ${setting}, with a glowing rainbow flower starting to grow, child-friendly style`
      },
      {
        title: "The Return",
        text: `${character} brought the rainbow flower home and shared its magic with friends. Everyone agreed it was the best adventure ever!`,
        image_prompt: `${character} showing the magical rainbow flower to friends in the ${setting}, everyone looking happy and amazed, child-friendly style`
      }
    ];
  } else if (theme === 'friendship') {
    scenes = [
      {
        title: "A Lonely Day",
        text: `${character} was feeling lonely in the ${setting}. It was a beautiful place, but it would be more fun with a friend.`,
        image_prompt: `A slightly sad ${character} sitting alone in the ${setting}, looking around for company, soft colors, child-friendly style`
      },
      {
        title: "An Unexpected Meeting",
        text: `Suddenly, ${character} heard a small sound. Behind a tree was a little fox who seemed lost and afraid.`,
        image_prompt: `${character} discovering a small fox hiding behind a tree in the ${setting}, both looking curious about each other, child-friendly style`
      },
      {
        title: "Helping Hand",
        text: `The fox had hurt its paw. ${character} carefully wrapped it with a soft leaf and offered the fox some berries.`,
        image_prompt: `${character} gently helping the fox with its injured paw in the ${setting}, wrapping it with a leaf, child-friendly style`
      },
      {
        title: "Playing Together",
        text: `Soon the fox felt better, and they played hide-and-seek among the trees. ${character} had never had so much fun!`,
        image_prompt: `${character} and the fox playing hide-and-seek in the ${setting}, looking joyful and energetic, child-friendly style`
      },
      {
        title: "Friends Forever",
        text: `As the sun set, the fox's family came looking for it. ${character} was invited to visit anytime. Now the ${setting} would never feel lonely again!`,
        image_prompt: `${character} and the fox saying goodbye at sunset in the ${setting}, with fox family nearby, looking happy with their new friendship, child-friendly style`
      }
    ];
  } else {
    // Default story for other themes
    scenes = [
      {
        title: "Once Upon a Time",
        text: `${character} lived in a beautiful ${setting} and loved ${theme}s more than anything else.`,
        image_prompt: `${character} in a beautiful ${setting}, surrounded by elements related to ${theme}, bright colors, child-friendly style`
      },
      {
        title: "A Special Day",
        text: `One day, something magical happened in the ${setting}. ${character} couldn't believe their eyes!`,
        image_prompt: `${character} looking amazed at something magical happening in the ${setting}, bright colors, child-friendly style`
      },
      {
        title: "The Journey",
        text: `${character} decided to go on a journey through the ${setting} to learn more about the magic of ${theme}.`,
        image_prompt: `${character} walking on a path through the ${setting}, looking determined, child-friendly style`
      },
      {
        title: "New Friends",
        text: `Along the way, ${character} met new friends who also loved ${theme}. They decided to explore together.`,
        image_prompt: `${character} meeting new friendly characters in the ${setting}, all looking happy, child-friendly style`
      },
      {
        title: "Happy Ending",
        text: `After a wonderful adventure, ${character} and friends celebrated with a big party in the ${setting}. It was the best day ever!`,
        image_prompt: `${character} and friends having a celebration in the ${setting}, with decorations related to ${theme}, looking very happy, child-friendly style`
      }
    ];
  }
  
  return { title, scenes };
}
