export interface CardTemplate {
  id: string;
  name: string;
  theme: 'dark' | 'light';
  preview: string;
  styles: {
    container: string;
    background: string;
    profileSection: string;
    contentSection: string;
    profilePicture: string;
    initials: string;
    name: string;
    role: string;
    date: string;
    content: string;
    codeSnippet: string;
    tags: string;
    branding: string;
  };
}

export const cardTemplates: CardTemplate[] = [
  // Dark Templates (16 total - 6 original + 10 new)
  {
    id: 'dark-gradient',
    name: 'Dark Gradient',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700',
    styles: {
      container: 'bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700',
      background: 'bg-black/20',
      profileSection: 'bg-black/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-white/30',
      initials: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
      name: 'text-white font-bold',
      role: 'text-white/70',
      date: 'text-white/60',
      content: 'text-white',
      codeSnippet: 'bg-black/60 border border-white/10',
      tags: 'bg-white/20 text-white/90 border-white/20',
      branding: 'text-white/60 border-white/20'
    }
  },
  {
    id: 'dark-neon',
    name: 'Neon Dark',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
    styles: {
      container: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
      background: 'bg-cyan-500/10',
      profileSection: 'bg-cyan-500/20 backdrop-blur-sm border-r border-cyan-400/30',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/25',
      initials: 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white',
      name: 'text-cyan-100 font-bold',
      role: 'text-cyan-300/80',
      date: 'text-cyan-400/70',
      content: 'text-cyan-50',
      codeSnippet: 'bg-gray-900/80 border border-cyan-400/30',
      tags: 'bg-cyan-500/30 text-cyan-100 border-cyan-400/40',
      branding: 'text-cyan-300/70 border-cyan-400/30'
    }
  },
  {
    id: 'dark-forest',
    name: 'Forest Night',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
    styles: {
      container: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
      background: 'bg-emerald-500/10',
      profileSection: 'bg-emerald-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-emerald-400/50',
      initials: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white',
      name: 'text-emerald-100 font-bold',
      role: 'text-emerald-300/80',
      date: 'text-emerald-400/70',
      content: 'text-emerald-50',
      codeSnippet: 'bg-green-900/80 border border-emerald-400/30',
      tags: 'bg-emerald-500/30 text-emerald-100 border-emerald-400/40',
      branding: 'text-emerald-300/70 border-emerald-400/30'
    }
  },
  {
    id: 'dark-sunset',
    name: 'Sunset Dark',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900',
    styles: {
      container: 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900',
      background: 'bg-orange-500/10',
      profileSection: 'bg-orange-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-orange-400/50',
      initials: 'bg-gradient-to-br from-orange-500 to-red-500 text-white',
      name: 'text-orange-100 font-bold',
      role: 'text-orange-300/80',
      date: 'text-orange-400/70',
      content: 'text-orange-50',
      codeSnippet: 'bg-red-900/80 border border-orange-400/30',
      tags: 'bg-orange-500/30 text-orange-100 border-orange-400/40',
      branding: 'text-orange-300/70 border-orange-400/30'
    }
  },
  {
    id: 'dark-ocean',
    name: 'Ocean Depths',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900',
    styles: {
      container: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900',
      background: 'bg-blue-500/10',
      profileSection: 'bg-blue-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-blue-400/50',
      initials: 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white',
      name: 'text-blue-100 font-bold',
      role: 'text-blue-300/80',
      date: 'text-blue-400/70',
      content: 'text-blue-50',
      codeSnippet: 'bg-indigo-900/80 border border-blue-400/30',
      tags: 'bg-blue-500/30 text-blue-100 border-blue-400/40',
      branding: 'text-blue-300/70 border-blue-400/30'
    }
  },
  {
    id: 'dark-monochrome',
    name: 'Monochrome',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
    styles: {
      container: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
      background: 'bg-white/5',
      profileSection: 'bg-white/10 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-gray-400/50',
      initials: 'bg-gradient-to-br from-gray-600 to-gray-800 text-white',
      name: 'text-gray-100 font-bold',
      role: 'text-gray-300',
      date: 'text-gray-400',
      content: 'text-gray-200',
      codeSnippet: 'bg-black/80 border border-gray-600/30',
      tags: 'bg-gray-600/30 text-gray-200 border-gray-500/40',
      branding: 'text-gray-400 border-gray-600/30'
    }
  },

  // NEW DARK TEMPLATES (10 additional)
  {
    id: 'dark-aurora',
    name: 'Aurora Borealis',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900',
    styles: {
      container: 'bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900',
      background: 'bg-violet-500/10',
      profileSection: 'bg-violet-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-violet-400/50 shadow-lg shadow-violet-400/25',
      initials: 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white',
      name: 'text-violet-100 font-bold',
      role: 'text-violet-300/80',
      date: 'text-violet-400/70',
      content: 'text-violet-50',
      codeSnippet: 'bg-violet-900/80 border border-violet-400/30',
      tags: 'bg-violet-500/30 text-violet-100 border-violet-400/40',
      branding: 'text-violet-300/70 border-violet-400/30'
    }
  },
  {
    id: 'dark-crimson',
    name: 'Crimson Shadow',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-red-900 via-rose-900 to-pink-900',
    styles: {
      container: 'bg-gradient-to-br from-red-900 via-rose-900 to-pink-900',
      background: 'bg-red-500/10',
      profileSection: 'bg-red-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-red-400/50 shadow-lg shadow-red-400/25',
      initials: 'bg-gradient-to-br from-red-500 to-rose-500 text-white',
      name: 'text-red-100 font-bold',
      role: 'text-red-300/80',
      date: 'text-red-400/70',
      content: 'text-red-50',
      codeSnippet: 'bg-red-900/80 border border-red-400/30',
      tags: 'bg-red-500/30 text-red-100 border-red-400/40',
      branding: 'text-red-300/70 border-red-400/30'
    }
  },
  {
    id: 'dark-midnight',
    name: 'Midnight Storm',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900',
    styles: {
      container: 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900',
      background: 'bg-slate-500/10',
      profileSection: 'bg-slate-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-slate-400/50 shadow-lg shadow-slate-400/25',
      initials: 'bg-gradient-to-br from-slate-500 to-blue-500 text-white',
      name: 'text-slate-100 font-bold',
      role: 'text-slate-300/80',
      date: 'text-slate-400/70',
      content: 'text-slate-50',
      codeSnippet: 'bg-slate-900/80 border border-slate-400/30',
      tags: 'bg-slate-500/30 text-slate-100 border-slate-400/40',
      branding: 'text-slate-300/70 border-slate-400/30'
    }
  },
  {
    id: 'dark-cosmic',
    name: 'Cosmic Void',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-black via-purple-900 to-indigo-900',
    styles: {
      container: 'bg-gradient-to-br from-black via-purple-900 to-indigo-900',
      background: 'bg-purple-500/10',
      profileSection: 'bg-purple-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-purple-400/50 shadow-lg shadow-purple-400/25',
      initials: 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white',
      name: 'text-purple-100 font-bold',
      role: 'text-purple-300/80',
      date: 'text-purple-400/70',
      content: 'text-purple-50',
      codeSnippet: 'bg-black/80 border border-purple-400/30',
      tags: 'bg-purple-500/30 text-purple-100 border-purple-400/40',
      branding: 'text-purple-300/70 border-purple-400/30'
    }
  },
  {
    id: 'dark-ember',
    name: 'Ember Glow',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900',
    styles: {
      container: 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900',
      background: 'bg-amber-500/10',
      profileSection: 'bg-amber-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-amber-400/50 shadow-lg shadow-amber-400/25',
      initials: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white',
      name: 'text-amber-100 font-bold',
      role: 'text-amber-300/80',
      date: 'text-amber-400/70',
      content: 'text-amber-50',
      codeSnippet: 'bg-amber-900/80 border border-amber-400/30',
      tags: 'bg-amber-500/30 text-amber-100 border-amber-400/40',
      branding: 'text-amber-300/70 border-amber-400/30'
    }
  },
  {
    id: 'dark-jade',
    name: 'Jade Depths',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-emerald-900 via-green-900 to-lime-900',
    styles: {
      container: 'bg-gradient-to-br from-emerald-900 via-green-900 to-lime-900',
      background: 'bg-emerald-500/10',
      profileSection: 'bg-emerald-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-emerald-400/50 shadow-lg shadow-emerald-400/25',
      initials: 'bg-gradient-to-br from-emerald-500 to-green-500 text-white',
      name: 'text-emerald-100 font-bold',
      role: 'text-emerald-300/80',
      date: 'text-emerald-400/70',
      content: 'text-emerald-50',
      codeSnippet: 'bg-emerald-900/80 border border-emerald-400/30',
      tags: 'bg-emerald-500/30 text-emerald-100 border-emerald-400/40',
      branding: 'text-emerald-300/70 border-emerald-400/30'
    }
  },
  {
    id: 'dark-sapphire',
    name: 'Sapphire Night',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-blue-900 via-sky-900 to-cyan-900',
    styles: {
      container: 'bg-gradient-to-br from-blue-900 via-sky-900 to-cyan-900',
      background: 'bg-blue-500/10',
      profileSection: 'bg-blue-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-blue-400/50 shadow-lg shadow-blue-400/25',
      initials: 'bg-gradient-to-br from-blue-500 to-sky-500 text-white',
      name: 'text-blue-100 font-bold',
      role: 'text-blue-300/80',
      date: 'text-blue-400/70',
      content: 'text-blue-50',
      codeSnippet: 'bg-blue-900/80 border border-blue-400/30',
      tags: 'bg-blue-500/30 text-blue-100 border-blue-400/40',
      branding: 'text-blue-300/70 border-blue-400/30'
    }
  },
  {
    id: 'dark-magenta',
    name: 'Magenta Haze',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-fuchsia-900 via-pink-900 to-rose-900',
    styles: {
      container: 'bg-gradient-to-br from-fuchsia-900 via-pink-900 to-rose-900',
      background: 'bg-fuchsia-500/10',
      profileSection: 'bg-fuchsia-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-fuchsia-400/50 shadow-lg shadow-fuchsia-400/25',
      initials: 'bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white',
      name: 'text-fuchsia-100 font-bold',
      role: 'text-fuchsia-300/80',
      date: 'text-fuchsia-400/70',
      content: 'text-fuchsia-50',
      codeSnippet: 'bg-fuchsia-900/80 border border-fuchsia-400/30',
      tags: 'bg-fuchsia-500/30 text-fuchsia-100 border-fuchsia-400/40',
      branding: 'text-fuchsia-300/70 border-fuchsia-400/30'
    }
  },
  {
    id: 'dark-steel',
    name: 'Steel Storm',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-zinc-900 via-gray-900 to-slate-900',
    styles: {
      container: 'bg-gradient-to-br from-zinc-900 via-gray-900 to-slate-900',
      background: 'bg-zinc-500/10',
      profileSection: 'bg-zinc-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-zinc-400/50 shadow-lg shadow-zinc-400/25',
      initials: 'bg-gradient-to-br from-zinc-500 to-gray-500 text-white',
      name: 'text-zinc-100 font-bold',
      role: 'text-zinc-300/80',
      date: 'text-zinc-400/70',
      content: 'text-zinc-50',
      codeSnippet: 'bg-zinc-900/80 border border-zinc-400/30',
      tags: 'bg-zinc-500/30 text-zinc-100 border-zinc-400/40',
      branding: 'text-zinc-300/70 border-zinc-400/30'
    }
  },
  {
    id: 'dark-nebula',
    name: 'Nebula Dreams',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900',
    styles: {
      container: 'bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900',
      background: 'bg-indigo-500/10',
      profileSection: 'bg-indigo-500/20 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-indigo-400/50 shadow-lg shadow-indigo-400/25',
      initials: 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white',
      name: 'text-indigo-100 font-bold',
      role: 'text-indigo-300/80',
      date: 'text-indigo-400/70',
      content: 'text-indigo-50',
      codeSnippet: 'bg-indigo-900/80 border border-indigo-400/30',
      tags: 'bg-indigo-500/30 text-indigo-100 border-indigo-400/40',
      branding: 'text-indigo-300/70 border-indigo-400/30'
    }
  },

  // Modern Templates
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-fuchsia-600 via-purple-600 to-blue-600',
    styles: {
      container: 'bg-gradient-to-br from-fuchsia-600 via-purple-600 to-blue-600',
      background: 'bg-pink-500/10',
      profileSection: 'bg-black/40 backdrop-blur-md border-r border-pink-500/30',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-pink-500/70',
      initials: 'bg-gradient-to-br from-pink-500 to-purple-600 text-white',
      name: 'text-pink-300 font-bold text-xl',
      role: 'text-pink-200/80',
      date: 'text-pink-200/60',
      content: 'text-pink-100',
      codeSnippet: 'bg-black/70 border border-pink-500/30',
      tags: 'bg-pink-500/40 text-pink-100 border-pink-500/50',
      branding: 'text-pink-300/70 border-pink-500/30'
    }
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-purple-900 via-pink-700 to-orange-500',
    styles: {
      container: 'bg-gradient-to-br from-purple-900 via-pink-700 to-orange-500',
      background: 'bg-cyan-300/10',
      profileSection: 'bg-black/30 backdrop-blur-sm border-r border-cyan-300/30',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-cyan-300/60',
      initials: 'bg-gradient-to-br from-cyan-300 to-blue-400 text-purple-900 font-bold',
      name: 'text-cyan-200 font-bold',
      role: 'text-cyan-200/80',
      date: 'text-cyan-200/60',
      content: 'text-cyan-100',
      codeSnippet: 'bg-purple-900/70 border border-cyan-300/30',
      tags: 'bg-cyan-300/30 text-cyan-100 border-cyan-300/40',
      branding: 'text-cyan-200/70 border-cyan-300/30'
    }
  },
  {
    id: 'glass-dark',
    name: 'Glass Dark',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-gray-800 to-gray-900',
    styles: {
      container: 'bg-gradient-to-br from-gray-800 to-gray-900',
      background: 'bg-white/5',
      profileSection: 'bg-white/5 backdrop-blur-lg border-r border-white/10',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-white/20',
      initials: 'bg-white/20 text-white',
      name: 'text-white font-bold',
      role: 'text-gray-300',
      date: 'text-gray-400',
      content: 'text-gray-200',
      codeSnippet: 'bg-white/10 border border-white/10',
      tags: 'bg-white/10 text-gray-200 border-white/20',
      branding: 'text-gray-500 border-white/10'
    }
  },
  {
    id: 'glass-light',
    name: 'Glass Light',
    theme: 'light',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-200',
    styles: {
      container: 'bg-gradient-to-br from-gray-100 to-gray-200',
      background: 'bg-white/30',
      profileSection: 'bg-white/50 backdrop-blur-lg border-r border-gray-300/50',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-white/80',
      initials: 'bg-white/80 text-gray-800',
      name: 'text-gray-800 font-bold',
      role: 'text-gray-600',
      date: 'text-gray-500',
      content: 'text-gray-700',
      codeSnippet: 'bg-white/80 border border-gray-200',
      tags: 'bg-white/80 text-gray-700 border-gray-200',
      branding: 'text-gray-400 border-gray-200'
    }
  },
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    theme: 'light',
    preview: 'bg-gradient-to-br from-gray-50 to-white',
    styles: {
      container: 'bg-gradient-to-br from-gray-50 to-white',
      background: 'bg-gray-100/50',
      profileSection: 'bg-white/80 backdrop-blur-sm border-r border-gray-200',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-gray-300',
      initials: 'bg-gradient-to-br from-gray-600 to-gray-800 text-white',
      name: 'text-gray-900 font-bold',
      role: 'text-gray-600',
      date: 'text-gray-500',
      content: 'text-gray-800',
      codeSnippet: 'bg-gray-100 border border-gray-300',
      tags: 'bg-gray-200 text-gray-700 border-gray-300',
      branding: 'text-gray-500 border-gray-200'
    }
  },
  // Additional Modern Templates
  {
    id: 'sunrise',
    name: 'Sunrise',
    theme: 'light',
    preview: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-100',
    styles: {
      container: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-100',
      background: 'bg-white/30',
      profileSection: 'bg-white/70 backdrop-blur-sm border-r border-orange-200',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-orange-300',
      initials: 'bg-gradient-to-r from-orange-400 to-pink-400 text-white',
      name: 'text-orange-800 font-bold',
      role: 'text-orange-600',
      date: 'text-orange-500',
      content: 'text-orange-800',
      codeSnippet: 'bg-white/80 border border-orange-200',
      tags: 'bg-orange-100 text-orange-800 border-orange-200',
      branding: 'text-orange-300 border-orange-200'
    }
  },
  {
    id: 'midnight-ocean',
    name: 'Midnight Ocean',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900',
    styles: {
      container: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900',
      background: 'bg-blue-400/10',
      profileSection: 'bg-indigo-900/50 backdrop-blur-sm',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-blue-400/60',
      initials: 'bg-gradient-to-br from-blue-400 to-indigo-400 text-white',
      name: 'text-blue-200 font-bold',
      role: 'text-blue-200/80',
      date: 'text-blue-200/60',
      content: 'text-blue-100',
      codeSnippet: 'bg-blue-900/70 border border-blue-400/30',
      tags: 'bg-blue-400/30 text-blue-100 border-blue-400/40',
      branding: 'text-blue-200/70 border-blue-400/30'
    }
  },
  {
    id: 'hacker',
    name: 'Hacker',
    theme: 'dark',
    preview: 'bg-gradient-to-br from-green-900 to-black',
    styles: {
      container: 'bg-gradient-to-br from-green-900 to-black',
      background: 'bg-green-500/10',
      profileSection: 'bg-black/60 backdrop-blur-sm border-r border-green-500/30',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-green-500/60',
      initials: 'bg-green-500/20 text-green-400 border border-green-500/30',
      name: 'text-green-400 font-mono font-bold',
      role: 'text-green-500/80',
      date: 'text-green-600',
      content: 'text-green-300 font-mono text-sm',
      codeSnippet: 'bg-black/80 border border-green-500/30 font-mono text-green-400',
      tags: 'bg-green-900/50 text-green-400 border border-green-500/30 font-mono text-xs',
      branding: 'text-green-700 border-green-800/50 font-mono text-xs'
    }
  },
  // Light Templates (4)
  {
    id: 'light-minimal',
    name: 'Minimal Light',
    theme: 'light',
    preview: 'bg-gradient-to-br from-gray-50 to-white',
    styles: {
      container: 'bg-gradient-to-br from-gray-50 to-white',
      background: 'bg-gray-100/50',
      profileSection: 'bg-white/80 backdrop-blur-sm border-r border-gray-200',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-gray-300',
      initials: 'bg-gradient-to-br from-gray-600 to-gray-800 text-white',
      name: 'text-gray-900 font-bold',
      role: 'text-gray-600',
      date: 'text-gray-500',
      content: 'text-gray-800',
      codeSnippet: 'bg-gray-100 border border-gray-300',
      tags: 'bg-gray-200 text-gray-700 border-gray-300',
      branding: 'text-gray-500 border-gray-200'
    }
  },
  {
    id: 'light-blue',
    name: 'Sky Blue',
    theme: 'light',
    preview: 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50',
    styles: {
      container: 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50',
      background: 'bg-blue-100/30',
      profileSection: 'bg-white/90 backdrop-blur-sm border-r border-blue-200',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-blue-300',
      initials: 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white',
      name: 'text-blue-900 font-bold',
      role: 'text-blue-700',
      date: 'text-blue-600',
      content: 'text-blue-800',
      codeSnippet: 'bg-blue-50 border border-blue-200',
      tags: 'bg-blue-200 text-blue-800 border-blue-300',
      branding: 'text-blue-600 border-blue-200'
    }
  },
  {
    id: 'light-green',
    name: 'Fresh Green',
    theme: 'light',
    preview: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
    styles: {
      container: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
      background: 'bg-green-100/30',
      profileSection: 'bg-white/90 backdrop-blur-sm border-r border-green-200',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-green-300',
      initials: 'bg-gradient-to-br from-green-500 to-emerald-500 text-white',
      name: 'text-green-900 font-bold',
      role: 'text-green-700',
      date: 'text-green-600',
      content: 'text-green-800',
      codeSnippet: 'bg-green-50 border border-green-200',
      tags: 'bg-green-200 text-green-800 border-green-300',
      branding: 'text-green-600 border-green-200'
    }
  },
  {
    id: 'light-warm',
    name: 'Warm Sunset',
    theme: 'light',
    preview: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50',
    styles: {
      container: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50',
      background: 'bg-orange-100/30',
      profileSection: 'bg-white/90 backdrop-blur-sm border-r border-orange-200',
      contentSection: 'bg-transparent',
      profilePicture: 'border-2 border-orange-300',
      initials: 'bg-gradient-to-br from-orange-500 to-amber-500 text-white',
      name: 'text-orange-900 font-bold',
      role: 'text-orange-700',
      date: 'text-orange-600',
      content: 'text-orange-800',
      codeSnippet: 'bg-orange-50 border border-orange-200',
      tags: 'bg-orange-200 text-orange-800 border-orange-300',
      branding: 'text-orange-600 border-orange-200'
    }
  }
];

export const getTemplateById = (id: string): CardTemplate => {
  return cardTemplates.find(template => template.id === id) || cardTemplates[0];
};