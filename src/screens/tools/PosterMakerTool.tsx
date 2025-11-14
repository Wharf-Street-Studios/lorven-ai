import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';

const posterTemplates = [
  { id: 1, name: 'Action Movie', emoji: '💥', category: 'Action' },
  { id: 2, name: 'Romance', emoji: '💕', category: 'Romance' },
  { id: 3, name: 'Sci-Fi', emoji: '🚀', category: 'SciFi' },
  { id: 4, name: 'Horror', emoji: '👻', category: 'Horror' },
  { id: 5, name: 'Comedy', emoji: '😂', category: 'Comedy' },
  { id: 6, name: 'Drama', emoji: '🎭', category: 'Drama' },
];

const PosterMakerTool: React.FC = () => {
  const config = {
    name: 'Poster Maker',
    icon: '🎬',
    toolId: 'poster-maker',
    description: 'Create professional movie-style posters',
    instructions: 'Upload Your Photo',
    uploadCount: 1,
    templates: posterTemplates,
  };

  return <AIToolTemplate config={config} />;
};

export default PosterMakerTool;
