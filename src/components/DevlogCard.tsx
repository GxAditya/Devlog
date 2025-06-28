import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Hash, User, Calendar } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import { DevlogEntry } from '../types';
import { useUserProfile } from '../hooks/useUserProfile';
import { getTemplateById } from '../cardTemplates';

interface DevlogCardProps {
  entry: DevlogEntry;
}

export const DevlogCard: React.FC<DevlogCardProps> = ({ entry }) => {
  const { profile } = useUserProfile();
  const cardRef = useRef<HTMLDivElement>(null);
  const template = getTemplateById(entry.templateId || 'dark-gradient');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;

    try {
      // Store original styles
      const originalStyle = cardRef.current.style.cssText;
      
      // Temporarily set fixed dimensions for high-quality capture
      cardRef.current.style.width = '800px';
      cardRef.current.style.height = '450px';
      cardRef.current.style.transform = 'none';
      cardRef.current.style.maxWidth = 'none';

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: 800,
        height: 450,
        logging: false
      });

      // Restore original styles
      cardRef.current.style.cssText = originalStyle;

      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `devlog-card-${entry.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate card:', error);
      alert('Failed to generate card. Please try again.');
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={handleDownloadCard}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={16} />
          Download Card
        </motion.button>
      </div>

      {/* Business Card */}
      <div
        ref={cardRef}
        className={`w-full max-w-[800px] aspect-[16/9] mx-auto ${template.styles.container} rounded-2xl overflow-hidden shadow-2xl`}
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {/* Background Pattern */}
        <div className="relative w-full h-full">
          <div className={`absolute inset-0 ${template.styles.background}`} />
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 ${template.theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Card Content */}
          <div className="relative z-10 flex h-full">
            {/* Left Section - Profile */}
            <div className={`w-1/3 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center ${template.styles.profileSection}`}>
              <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
                {/* Profile Picture */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt={profile.name || 'Profile'}
                      className={`w-full h-full rounded-full object-cover ${template.styles.profilePicture}`}
                      crossOrigin="anonymous"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full ${template.styles.initials} rounded-full flex items-center justify-center font-bold text-sm sm:text-lg md:text-xl ${
                      profile.profilePicture ? 'hidden' : ''
                    }`}
                  >
                    {profile.name ? getInitials(profile.name) : <User size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <h2 className={`text-sm sm:text-lg md:text-xl ${template.styles.name} mb-1`}>
                    {profile.name || 'Anonymous Developer'}
                  </h2>
                  <p className={`${template.styles.role} text-xs sm:text-sm`}>Developer</p>
                </div>

                {/* Date */}
                <div className={`flex items-center justify-center gap-1 sm:gap-2 ${template.styles.date} text-xs`}>
                  <Calendar size={10} className="sm:w-3 sm:h-3 md:w-3 md:h-3 align-middle" />
                  <span className="align-middle">{format(entry.timestamp, 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </div>

            {/* Right Section - Content */}
            <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {/* Main Content */}
                <div className={`${template.styles.content} text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap`}>
                  {truncateText(entry.content, 200)}
                </div>

                {/* Code Snippet (if exists and short) */}
                {entry.codeSnippet && entry.codeSnippet.code.length < 150 && (
                  <div className="rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language={entry.codeSnippet.language}
                      style={template.theme === 'dark' ? atomDark : prism}
                      customStyle={{
                        margin: 0,
                        borderRadius: '8px',
                        background: template.theme === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                        border: `1px solid ${template.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        fontSize: '10px',
                        padding: '8px'
                      }}
                    >
                      {truncateText(entry.codeSnippet.code, 120)}
                    </SyntaxHighlighter>
                  </div>
                )}

                {/* Tags */}
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {entry.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1 px-2 py-1 ${template.styles.tags} rounded-full text-xs border`}
                      >
                        <Hash size={8} className="sm:w-2.5 sm:h-2.5" />
                        {tag}
                      </span>
                    ))}
                    {entry.tags.length > 4 && (
                      <span className={`${template.styles.date} text-xs`}>+{entry.tags.length - 4} more</span>
                    )}
                  </div>
                )}

                {/* Branding */}
                <div className={`pt-2 sm:pt-3 md:pt-4 border-t ${template.styles.branding}`}>
                  <div className="text-xs sm:text-sm font-medium">
                    DevLog
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};