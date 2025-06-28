import React, { useState } from 'react';
import { Calendar, Edit3, Save, X, User, Upload, AlertCircle, CheckCircle, Database, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { useUserProfile } from '../hooks/useUserProfile';

export const ProfileSection: React.FC = () => {
  const { profile, user, updateProfile, hasProfile, loading, error, isSupabaseConnected, signOut } = useUserProfile();
  const [isEditing, setIsEditing] = useState(!hasProfile);
  const [editName, setEditName] = useState(profile.name);
  const [editProfilePicture, setEditProfilePicture] = useState(profile.profilePicture);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditProfilePicture(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (editName.trim()) {
      await updateProfile({
        name: editName.trim(),
        profilePicture: editProfilePicture
      });
      setIsEditing(false);
      setImagePreview('');
    }
  };

  const handleCancel = () => {
    setEditName(profile.name);
    setEditProfilePicture(profile.profilePicture);
    setImagePreview('');
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const removeImage = () => {
    setEditProfilePicture('');
    setImagePreview('');
  };

  if (loading) {
    return (
      <GlassCard className="p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-4 sm:h-6 bg-white/10 rounded mb-2 animate-pulse" />
          <div className="h-3 sm:h-4 bg-white/10 rounded animate-pulse" />
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="text-center space-y-3 sm:space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            isSupabaseConnected 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
          }`}>
            <Database size={12} />
            <span className="hidden sm:inline">{isSupabaseConnected ? 'Authenticated' : 'Local Storage'}</span>
            <span className="sm:hidden">{isSupabaseConnected ? 'Auth' : 'Local'}</span>
          </div>
        </div>

        {/* User Email */}
        {user?.email && (
          <div className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-4 break-all">
            {user.email}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-2 sm:p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-xs sm:text-sm"
          >
            <AlertCircle size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="break-words">{error}</span>
          </motion.div>
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20"
        >
          {(profile.profilePicture || imagePreview) ? (
            <img
              src={imagePreview || profile.profilePicture}
              alt={profile.name || 'Profile'}
              className="w-full h-full rounded-full object-cover border-2 border-white/20"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div
            className={`w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg ${
              (profile.profilePicture || imagePreview) ? 'hidden' : ''
            }`}
          >
            {profile.name ? getInitials(profile.name) : <User size={20} className="sm:w-8 sm:h-8" />}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 sm:space-y-4"
            >
              <div>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 text-center outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
                  autoFocus
                />
              </div>
              
              {/* Image Upload Section */}
              <div className="space-y-2 sm:space-y-3">
                <div className="text-white/70 text-xs sm:text-sm">Profile Picture (Browser Only)</div>
                
                {/* Image Preview or Upload Button */}
                {(editProfilePicture || imagePreview) ? (
                  <div className="relative">
                    <img
                      src={imagePreview || editProfilePicture}
                      alt="Preview"
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/20 mx-auto"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors"
                    >
                      <X size={10} className="sm:w-3 sm:h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 border-2 border-dashed border-white/30 rounded-full flex items-center justify-center mx-auto hover:bg-white/20 transition-colors">
                      <Upload size={16} className="sm:w-5 sm:h-5 text-white/60" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
                
                {/* Upload Button */}
                <label className="cursor-pointer">
                  <div className="text-center">
                    <span className="text-white/60 text-xs hover:text-white transition-colors">
                      {(editProfilePicture || imagePreview) ? 'Change Image' : 'Upload Image'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                
                <div className="text-white/40 text-xs">
                  Max size: 2MB • JPG, PNG, GIF
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <motion.button
                  onClick={handleSave}
                  disabled={!editName.trim()}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={14} className="sm:w-4 sm:h-4" />
                  Save
                </motion.button>
                {hasProfile && (
                  <motion.button
                    onClick={handleCancel}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={14} className="sm:w-4 sm:h-4" />
                    Cancel
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="display"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="relative group">
                <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 break-words">
                  {profile.name || 'Anonymous Developer'}
                </h2>
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="absolute -top-1 -right-6 sm:-right-8 opacity-0 group-hover:opacity-100 p-1 text-white/60 hover:text-white transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit3 size={14} className="sm:w-4 sm:h-4" />
                </motion.button>
              </div>
              <p className="text-white/70 mb-3 sm:mb-4 text-xs sm:text-sm">Building amazing things, one commit at a time</p>
              
              {/* Storage Info */}
              <div className="text-center text-white/50 text-xs mb-3 sm:mb-4">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle size={10} className="sm:w-3 sm:h-3" />
                  <span className="hidden sm:inline">Name: {isSupabaseConnected ? 'Supabase' : 'Local'} • Picture: Browser</span>
                  <span className="sm:hidden">{isSupabaseConnected ? 'DB' : 'Local'} • Browser</span>
                </div>
              </div>

              {/* Sign Out Button */}
              <motion.button
                onClick={handleSignOut}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 font-medium hover:bg-red-500/30 transition-all mx-auto text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={14} className="sm:w-4 sm:h-4" />
                Sign Out
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {!isEditing && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-white">DevLog</div>
              <div className="text-xs sm:text-sm text-white/60">Platform</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-white">Cards</div>
              <div className="text-xs sm:text-sm text-white/60">Creator</div>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
};