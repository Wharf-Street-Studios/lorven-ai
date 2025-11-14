import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../../context/TokenContext';
import { Button, BottomNavigation } from '../../components/ui';
import { ArrowLeft01Icon, Coins01Icon, SparklesIcon, Award01Icon, Task01Icon, Share08Icon, UserAdd01Icon } from 'hugeicons-react';

const dailyMissions = [
  { id: 1, title: 'Create 3 AI images', reward: 5, progress: 1, total: 3, completed: false },
  { id: 2, title: 'Share a creation', reward: 3, progress: 0, total: 1, completed: false },
  { id: 3, title: 'Like 5 posts', reward: 2, progress: 3, total: 5, completed: false },
];

const achievements = [
  { id: 1, title: 'First Creation', Icon: SparklesIcon, reward: 10, progress: 100, unlocked: true },
  { id: 2, title: 'Social Butterfly', Icon: UserAdd01Icon, reward: 25, progress: 60, unlocked: false },
  { id: 3, title: '7-Day Streak', Icon: SparklesIcon, reward: 50, progress: 40, unlocked: false },
  { id: 4, title: '100 Creations', Icon: Award01Icon, reward: 100, progress: 25, unlocked: false },
];

const Rewards: React.FC = () => {
  const navigate = useNavigate();
  const { earnTokens } = useTokens();

  const handleClaimMission = (missionId: number, reward: number) => {
    earnTokens(reward, 'Daily mission completed');
    alert(`Claimed ${reward} tokens!`);
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all"
          >
            <ArrowLeft01Icon size={24} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white ml-3">Rewards</h1>
        </div>
      </header>

      {/* Streak Counter */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 text-white text-center">
          <p className="text-sm opacity-90 mb-2">Daily Login Streak</p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <SparklesIcon size={56} color="#ffffff" />
            <span className="text-5xl font-bold">3</span>
          </div>
          <p className="text-sm opacity-90">days in a row</p>
        </div>
      </div>

      {/* Daily Missions */}
      <div className="px-4 pb-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Daily Missions</h2>
          <span className="text-sm text-dark-500">Resets in 18h</span>
        </div>
        <div className="space-y-3">
          {dailyMissions.map((mission) => (
            <div key={mission.id} className="bg-dark-100 rounded-3xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-white mb-1">{mission.title}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-dark-150 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all"
                        style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-dark-500">
                      {mission.progress}/{mission.total}
                    </span>
                  </div>
                </div>
                <div className="ml-4 text-right flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1.5">
                    <Coins01Icon size={16} color="#3b82f6" />
                    <span className="font-bold text-white">{mission.reward}</span>
                  </div>
                  {mission.progress >= mission.total ? (
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => handleClaimMission(mission.id, mission.reward)}
                    >
                      Claim
                    </Button>
                  ) : (
                    <span className="text-xs text-dark-500">In progress</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 pb-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-dark-100 rounded-3xl p-4 text-center ${
                achievement.unlocked ? 'border-2 border-yellow-500' : 'opacity-60'
              }`}
            >
              <achievement.Icon size={48} color={achievement.unlocked ? '#eab308' : '#ffffff'} className="mx-auto mb-2" />
              <p className="font-semibold text-white text-sm mb-2">{achievement.title}</p>
              <div className="w-full h-2 bg-dark-150 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
              <p className="text-xs text-dark-500 mb-2">{achievement.progress}% Complete</p>
              <div className="flex items-center justify-center gap-1">
                <Coins01Icon size={14} color="#3b82f6" />
                <span className="text-xs font-bold text-white">{achievement.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Program */}
      <div className="px-4 pb-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">Refer Friends</h2>
        <div className="bg-dark-100 rounded-3xl p-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <UserAdd01Icon size={32} color="#ffffff" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Earn 50 Tokens</h3>
            <p className="text-dark-500 text-sm">
              For each friend who signs up using your referral link
            </p>
          </div>
          <div className="bg-dark-150 p-4 rounded-xl mb-4 flex items-center justify-between">
            <code className="text-sm text-white font-mono truncate flex-1">epiko-ai-studios.ai/r/USER123</code>
            <button className="ml-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 transition-colors">
              <Share08Icon size={20} color="#ffffff" />
            </button>
          </div>
          <Button variant="primary" size="large" fullWidth>
            Share Referral Link
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Rewards;
