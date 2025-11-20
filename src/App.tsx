import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DevlogCardCreator } from './components/DevlogCardCreator';
import { DevlogCard } from './components/DevlogCard';
import { DevlogEntry } from './types';

function App() {
  const [cardToDisplay, setCardToDisplay] = useState<DevlogEntry | null>(null);

  const handleCardCreation = (entry: DevlogEntry) => {
    setCardToDisplay(entry);
  };

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

      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            DevLog
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Create beautiful cards to share your development journey
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8 md:space-y-10 max-w-4xl mx-auto">
          <DevlogCardCreator onSubmit={handleCardCreation} />

          {cardToDisplay ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg sm:text-xl mb-2">Your DevLog Card</h3>
                <p className="text-white/60 text-sm">Click "Download Card" to save as PNG</p>
              </div>
              <div className="flex justify-center">
                <DevlogCard entry={cardToDisplay} />
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="text-white/60 text-base sm:text-lg mb-4">
                No card created yet
              </div>
              <div className="text-white/40 text-sm sm:text-base">
                Fill out the form above to create your first DevLog card!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;