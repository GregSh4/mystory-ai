import React from 'react';

// Component for editing generated stories
const StoryEditor = ({ 
  story, 
  onSave, 
  onCancel 
}: { 
  story: { 
    title: string; 
    scenes: Array<{ 
      title: string; 
      text: string; 
      image_prompt: string; 
    }> 
  }; 
  onSave: (editedStory: any) => void; 
  onCancel: () => void; 
}) => {
  const [editedStory, setEditedStory] = React.useState(story);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedStory({
      ...editedStory,
      title: e.target.value
    });
  };

  const handleSceneChange = (index: number, field: string, value: string) => {
    const updatedScenes = [...editedStory.scenes];
    updatedScenes[index] = {
      ...updatedScenes[index],
      [field]: value
    };
    
    setEditedStory({
      ...editedStory,
      scenes: updatedScenes
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-comic font-bold text-purple-700 mb-6">Edit Your Story</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Story Title</label>
        <input
          type="text"
          value={editedStory.title}
          onChange={handleTitleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {editedStory.scenes.map((scene, index) => (
        <div key={index} className="mb-8 p-4 border border-purple-200 rounded-lg bg-purple-50">
          <h3 className="text-xl font-comic font-bold text-purple-600 mb-4">Scene {index + 1}</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Scene Title</label>
            <input
              type="text"
              value={scene.title}
              onChange={(e) => handleSceneChange(index, 'title', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Scene Text</label>
            <textarea
              value={scene.text}
              onChange={(e) => handleSceneChange(index, 'text', e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-2">Image Description</label>
            <textarea
              value={scene.image_prompt}
              onChange={(e) => handleSceneChange(index, 'image_prompt', e.target.value)}
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">This description will be used to generate the image for this scene.</p>
          </div>
        </div>
      ))}

      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(editedStory)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default StoryEditor;
