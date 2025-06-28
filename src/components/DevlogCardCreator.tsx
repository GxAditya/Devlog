import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Palette, Code, Hash, X } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { DevlogEntry } from '../types';
import { cardTemplates, CardTemplate } from '../cardTemplates';

interface DevlogCardCreatorProps {
  onSubmit: (entry: DevlogEntry) => void;
}

export const DevlogCardCreator: React.FC<DevlogCardCreatorProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('dark-gradient');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState({ code: '', language: 'javascript' });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const selectedTemplate = cardTemplates.find(t => t.id === selectedTemplateId) || cardTemplates[0];

  const handleSubmit = () => {
    if (!content.trim()) return;

    const newEntry: DevlogEntry = {
      id: Date.now().toString(),
      content: content.trim(),
      tags,
      codeSnippet: codeSnippet.code ? codeSnippet : undefined,
      timestamp: new Date(),
      likes: 0,
      shares: 0,
      templateId: selectedTemplateId
    };

    onSubmit(newEntry);

    // Reset form
    setContent('');
    setTags([]);
    setCurrentTag('');
    setCodeSnippet({ code: '', language: 'javascript' });
    setShowCodeEditor(false);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  const darkTemplates = cardTemplates.filter(t => t.theme === 'dark');
  const lightTemplates = cardTemplates.filter(t => t.theme === 'light');

  return (
    <GlassCard className="p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Create Your DevLog Card</h2>
          <p className="text-white/70 text-sm sm:text-base">Share your development journey with a beautiful card</p>
        </div>

        {/* Template Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm sm:text-base">Choose Template</h3>
            <motion.button
              onClick={() => setShowTemplates(!showTemplates)}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Palette size={16} />
              <span className="hidden sm:inline">{showTemplates ? 'Hide Templates' : 'Browse Templates'}</span>
              <span className="sm:hidden">{showTemplates ? 'Hide' : 'Browse'}</span>
            </motion.button>
          </div>

          {/* Current Template Preview */}
          <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/20 rounded-lg">
            <div className={`w-12 h-8 ${selectedTemplate.preview} rounded border border-white/20`} />
            <div>
              <div className="text-white font-medium text-sm sm:text-base">{selectedTemplate.name}</div>
              <div className="text-white/60 text-xs sm:text-sm capitalize">{selectedTemplate.theme} theme</div>
            </div>
          </div>

          {/* Template Grid */}
          <AnimatePresence>
            {showTemplates && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {/* Dark Templates */}
                <div>
                  <h4 className="text-white/80 font-medium mb-3 text-sm sm:text-base">Dark Themes</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {darkTemplates.map((template) => (
                      <motion.button
                        key={template.id}
                        onClick={() => {
                          setSelectedTemplateId(template.id);
                          setShowTemplates(false);
                        }}
                        className={`p-2 sm:p-3 rounded-lg border transition-all ${
                          selectedTemplateId === template.id
                            ? 'border-purple-400 bg-purple-500/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-full h-12 sm:h-16 ${template.preview} rounded mb-2 border border-white/20`} />
                        <div className="text-white text-xs sm:text-sm font-medium">{template.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Light Templates */}
                <div>
                  <h4 className="text-white/80 font-medium mb-3 text-sm sm:text-base">Light Themes</h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {lightTemplates.map((template) => (
                      <motion.button
                        key={template.id}
                        onClick={() => {
                          setSelectedTemplateId(template.id);
                          setShowTemplates(false);
                        }}
                        className={`p-2 sm:p-3 rounded-lg border transition-all ${
                          selectedTemplateId === template.id
                            ? 'border-purple-400 bg-purple-500/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-full h-12 sm:h-16 ${template.preview} rounded mb-2 border border-gray-400 shadow-sm shadow-gray-300`} />
                        <div className="text-white text-xs sm:text-sm font-medium">{template.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main text area */}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="What are you building today? Share your development thoughts, progress, or insights..."
            className="w-full h-32 sm:h-40 bg-white/5 border border-white/20 rounded-xl p-3 sm:p-4 text-white placeholder-white/60 text-base sm:text-lg leading-relaxed resize-none outline-none focus:border-white/40 focus:bg-white/10 transition-all"
            maxLength={280}
          />
          <div className="absolute bottom-3 right-3 text-xs sm:text-sm text-white/50 bg-black/20 px-2 py-1 rounded">
            {content.length}/280
          </div>
        </div>

        {/* Tags */}
        <AnimatePresence>
          {tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full text-xs sm:text-sm text-white border border-white/20"
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-300 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Code editor */}
        <AnimatePresence>
          {showCodeEditor && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <select
                value={codeSnippet.language}
                onChange={(e) => setCodeSnippet({ ...codeSnippet, language: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm w-full sm:w-auto"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="css">CSS</option>
                <option value="html">HTML</option>
                <option value="json">JSON</option>
              </select>
              <textarea
                value={codeSnippet.code}
                onChange={(e) => setCodeSnippet({ ...codeSnippet, code: e.target.value })}
                placeholder="Paste your code here..."
                className="w-full h-20 sm:h-24 bg-black/30 border border-white/20 rounded-lg p-3 text-white font-mono text-sm resize-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tag input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
            placeholder="Add tags..."
            className="flex-1 bg-transparent border-b border-white/20 pb-2 text-white placeholder-white/60 outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
          />
          <button
            onClick={addTag}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Hash size={20} />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-3">
            <button
              onClick={() => setShowCodeEditor(!showCodeEditor)}
              className={`p-2 rounded-lg transition-all ${
                showCodeEditor 
                  ? 'bg-purple-500/30 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Code size={20} />
            </button>
          </div>

          <motion.button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 sm:gap-3 text-sm sm:text-lg shadow-lg shadow-purple-500/25"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Send size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Create Card</span>
            <span className="sm:hidden">Create</span>
          </motion.button>
        </div>

        {/* Hint */}
        <div className="text-center text-white/50 text-xs sm:text-sm">
          <p>Tip: Press Cmd/Ctrl + Enter to quickly create your card</p>
        </div>
      </div>
    </GlassCard>
  );
};