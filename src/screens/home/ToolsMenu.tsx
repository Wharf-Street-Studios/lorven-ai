import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../../context/TokenContext';
import { BottomNavigation } from '../../components/ui';
import { Coins01Icon } from 'hugeicons-react';

const allTools = [
  {
    id: 'face-swap',
    name: 'Face Swap',
    icon: '🎭',
    description: 'Replace faces in photos',
    cost: 10,
    path: '/tools/face-swap',
  },
  {
    id: 'ai-avatar',
    name: 'AI Avatar',
    icon: '👤',
    description: 'Stylized portraits',
    cost: 10,
    path: '/tools/ai-avatar',
  },
  {
    id: 'couple-photo',
    name: 'Couple Photo',
    icon: '💑',
    description: 'Romantic scenes',
    cost: 15,
    path: '/tools/couple-photo',
  },
  {
    id: 'baby-predictor',
    name: 'Baby Predictor',
    icon: '👶',
    description: 'Future baby preview',
    cost: 15,
    path: '/tools/baby-predictor',
  },
  {
    id: 'gender-swap',
    name: 'Gender Swap',
    icon: '⚧️',
    description: 'Gender transformation',
    cost: 10,
    path: '/tools/gender-swap',
  },
  {
    id: 'age-transform',
    name: 'Age Transform',
    icon: '⏳',
    description: 'Age progression',
    cost: 10,
    path: '/tools/age-transform',
  },
  {
    id: 'enhance',
    name: 'Enhance',
    icon: '✨',
    description: 'HD quality boost',
    cost: 15,
    path: '/tools/enhance',
  },
];

const ToolsMenu: React.FC = () => {
  const navigate = useNavigate();
  const { balance } = useTokens();

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Create</h1>
          <button
            onClick={() => navigate('/wallet')}
            className="flex items-center gap-2 px-3 py-1.5 bg-dark-100 rounded-full hover:bg-dark-150 active:scale-95 transition-all"
          >
            <Coins01Icon size={16} color="#ffffff" />
            <span className="font-semibold text-white text-sm">{balance}</span>
          </button>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {allTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => navigate(tool.path)}
              className="bg-dark-100 border border-dark-100 rounded-2xl p-4 hover:bg-dark-150 active:bg-dark-150 transition-colors text-left"
            >
              <div className="aspect-square bg-dark-150 rounded-xl flex items-center justify-center mb-3">
                <span className="text-5xl">{tool.icon}</span>
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">
                {tool.name}
              </h3>
              <p className="text-xs text-dark-600 mb-2 line-clamp-1">
                {tool.description}
              </p>
              <div className="flex items-center gap-1 text-xs text-dark-500">
                <span>💎</span>
                <span className="font-medium">{tool.cost} tokens</span>
              </div>
            </button>
          ))}
        </div>

        {/* Get Tokens CTA */}
        <div className="mt-6 bg-dark-100 text-white rounded-2xl p-5 border border-dark-100">
          <h3 className="font-semibold text-base mb-1">Need more tokens?</h3>
          <p className="text-sm text-dark-600 mb-4">
            Unlock unlimited creativity
          </p>
          <button
            onClick={() => navigate('/wallet')}
            className="w-full bg-white text-black font-semibold text-sm py-2.5 rounded-xl hover:bg-neutral-100 active:scale-98 transition-all"
          >
            Get Tokens
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ToolsMenu;
