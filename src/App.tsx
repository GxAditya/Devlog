import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DevlogCardCreator } from './components/DevlogCardCreator';
import { DevlogCard } from './components/DevlogCard';
import { ProfileSection } from './components/ProfileSection';
import { AuthForm } from './components/AuthForm';
import { useUserProfile } from './hooks/useUserProfile';
import { DevlogEntry } from './types';

function App() {
  const { user, loading, isAuthenticated } = useUserProfile();
  const [cardToDisplay, setCardToDisplay] = useState<DevlogEntry | null>(null);

  const handleCardCreation = (entry: DevlogEntry) => {
    setCardToDisplay(entry);
  };

  const handleAuthSuccess = () => {
    // Auth state will be handled by the useUserProfile hook
    // This callback is just to trigger any additional logic if needed
  };

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 relative overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/1860.jpg)' }}
        />
        <div className="relative z-10 text-center">
          <motion.div
            className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <h2 className="text-white text-xl font-semibold">Loading DevLog...</h2>
        </div>
      </div>
    );
  }

  // Show auth form if user is not authenticated
  if (!isAuthenticated) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  // Show main app if user is authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/1860.jpg)' }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            DevLog
          </h1>
          <p className="text-white/70 text-lg">
            Create beautiful cards to share your development journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <ProfileSection />
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <DevlogCardCreator onSubmit={handleCardCreation} />
            
            {cardToDisplay && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h3 className="text-white font-semibold text-xl mb-2">Your DevLog Card</h3>
                  <p className="text-white/60 text-sm">Click "Download Card" to save as PNG</p>
                </div>
                <div className="flex justify-center">
                  <div className="transform scale-90 origin-center">
                    <DevlogCard entry={cardToDisplay} />
                  </div>
                </div>
              </motion.div>
            )}

            {!cardToDisplay && (
              <div className="text-center py-12">
                <div className="text-white/60 text-lg mb-4">
                  No card created yet
                </div>
                <div className="text-white/40">
                  Fill out the form above to create your first DevLog card!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;