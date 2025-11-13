import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../../context/TokenContext';
import { BottomNavigation } from '../../components/ui';
import {
  Coins01Icon,
  UserIcon,
  SparklesIcon,
  FavouriteIcon,
  Baby01Icon,
  UserMultiple02Icon,
  Time01Icon,
  MagicWand02Icon
} from 'hugeicons-react';

const allTools = [
  {
    id: 'face-swap',
    name: 'Face Swap',
    icon: UserIcon,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    description: 'Replace faces in photos',
    cost: 10,
    path: '/tools/face-swap',
  },
  {
    id: 'ai-avatar',
    name: 'AI Avatar',
    icon: SparklesIcon,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop',
    description: 'Stylized portraits',
    cost: 10,
    path: '/tools/ai-avatar',
  },
  {
    id: 'couple-photo',
    name: 'Couple Photo',
    icon: FavouriteIcon,
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=600&fit=crop',
    description: 'Romantic scenes',
    cost: 15,
    path: '/tools/couple-photo',
  },
  {
    id: 'baby-predictor',
    name: 'Baby Predictor',
    icon: Baby01Icon,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop',
    description: 'Future baby preview',
    cost: 15,
    path: '/tools/baby-predictor',
  },
  {
    id: 'gender-swap',
    name: 'Gender Swap',
    icon: UserMultiple02Icon,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop',
    description: 'Gender transformation',
    cost: 10,
    path: '/tools/gender-swap',
  },
  {
    id: 'age-transform',
    name: 'Age Transform',
    icon: Time01Icon,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop',
    description: 'Age progression',
    cost: 10,
    path: '/tools/age-transform',
  },
  {
    id: 'enhance',
    name: 'Enhance',
    icon: MagicWand02Icon,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop',
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
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-white">Create</h1>
          <button
            onClick={() => navigate('/wallet')}
            className="flex items-center gap-2 px-3 py-2 bg-dark-100 rounded-full hover:bg-dark-150 active:scale-95 transition-all"
          >
            <Coins01Icon size={18} color="#ffffff" />
            <span className="font-semibold text-white text-sm">{balance}</span>
          </button>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="p-4 max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {allTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => navigate(tool.path)}
                className="bg-dark-100 rounded-3xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-transform group"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-dark-150">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Icon size={20} color="#ffffff" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-base mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-white/80 mb-3 line-clamp-1">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-white/90">
                      <Coins01Icon size={14} color="#ffffff" />
                      <span className="text-xs font-semibold">{tool.cost} tokens</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Get Tokens CTA */}
        <div className="bg-dark-100 rounded-3xl p-6 border border-dark-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
              <Coins01Icon size={24} color="#000000" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-base mb-1">Need more tokens?</h3>
              <p className="text-sm text-dark-500 mb-4">
                Unlock unlimited creativity with token packages
              </p>
              <button
                onClick={() => navigate('/wallet')}
                className="w-full bg-white text-black font-semibold text-sm py-3 rounded-xl hover:bg-gray-100 active:scale-98 transition-all"
              >
                Get Tokens
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ToolsMenu;
