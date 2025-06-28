import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Code, 
  Image, 
  Hash, 
  X,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';
import { GlassCard } from './GlassCard';

interface DevlogComposerProps {
  onSubmit: (entry: {
    content: string;
    tags: string[];
    codeSnippet?: { code: string; language: string };
    image?: string;
  }) => void;
}

export const DevlogComposer: React.FC<DevlogComposerProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState({ code: '', language: 'javascript' });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [image, setImage] = useState<string>('');

  const handleSubmit = () => {
    if (!content.trim()) return;

    onSubmit({
      content: content.trim(),
      tags,
      codeSnippet: codeSnippet.code ? codeSnippet : undefined,
      image: image || undefined
    });

    // Reset form
    setContent('');
    setTags([]);
    setCurrentTag('');
    setCodeSnippet({ code: '', language: 'javascript' });
    setImage('');
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

  const shareToSocial = (platform: string) => {
    const text = encodeURIComponent(content);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}&summary=${text}`,
      github: `https://github.com`
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <GlassCard className="p-6 mb-8">
      <div className="space-y-4">
        {/* Main text area */}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="What are you building today?"
            className="w-full h-32 bg-transparent border-none outline-none resize-none text-white placeholder-white/60 text-lg leading-relaxed"
            maxLength={280}
          />
          <div className="absolute bottom-2 right-2 text-sm text-white/50">
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
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full text-sm text-white border border-white/20"
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
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
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
                className="w-full h-24 bg-black/30 border border-white/20 rounded-lg p-3 text-white font-mono text-sm resize-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image URL input */}
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder-white/60 outline-none focus:border-white/40 transition-colors"
        />

        {/* Tag input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
            placeholder="Add tags..."
            className="flex-1 bg-transparent border-b border-white/20 pb-2 text-white placeholder-white/60 outline-none focus:border-white/40 transition-colors"
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
            <button className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all">
              <Image size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Social share buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => shareToSocial('twitter')}
                className="p-2 rounded-lg text-white/60 hover:text-blue-400 hover:bg-white/10 transition-all"
                title="Share to Twitter"
              >
                <Twitter size={16} />
              </button>
              <button
                onClick={() => shareToSocial('linkedin')}
                className="p-2 rounded-lg text-white/60 hover:text-blue-600 hover:bg-white/10 transition-all"
                title="Share to LinkedIn"
              >
                <Linkedin size={16} />
              </button>
              <button
                onClick={() => shareToSocial('github')}
                className="p-2 rounded-lg text-white/60 hover:text-gray-300 hover:bg-white/10 transition-all"
                title="Share to GitHub"
              >
                <Github size={16} />
              </button>
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={16} />
              Post
            </motion.button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};