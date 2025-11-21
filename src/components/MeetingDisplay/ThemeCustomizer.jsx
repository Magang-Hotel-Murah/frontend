import React, { useState, useEffect } from 'react';

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const clampColor = (value) => Math.min(225, Math.max(30, value)); // anti putih & anti hitam

const generateThemeColors = (primaryColor) => {
  const rgb = hexToRgb(primaryColor);
  if (!rgb) return null;

  // clamp warna utama supaya tidak terlalu gelap/terang
  const R = clampColor(rgb.r);
  const G = clampColor(rgb.g);
  const B = clampColor(rgb.b);

  return {
    primary: `#${R.toString(16).padStart(2,'0')}${G.toString(16).padStart(2,'0')}${B.toString(16).padStart(2,'0')}`,

    primaryLight: `rgba(${R}, ${G}, ${B}, 0.35)`, // opacity aman
    primaryMedium: `rgba(${R}, ${G}, ${B}, 0.55)`,

    primaryDark: `#${
      clampColor(R - 20).toString(16).padStart(2,'0')
    }${
      clampColor(G - 20).toString(16).padStart(2,'0')
    }${
      clampColor(B - 20).toString(16).padStart(2,'0')
    }`,

    primaryRgb: `${R}, ${G}, ${B}`,
  };
};

const PRESET_THEMES = [
  { name: 'Ocean Blue', color: '#3B82F6', icon: '🌊' },
  { name: 'Sunset Orange', color: '#F59E0B', icon: '🌅' },
  { name: 'Forest Green', color: '#10B981', icon: '🌲' },
  { name: 'Royal Purple', color: '#8B5CF6', icon: '👑' },
  { name: 'Rose Pink', color: '#EC4899', icon: '🌹' },
  { name: 'Crimson Red', color: '#EF4444', icon: '❤️' },
  { name: 'Teal', color: '#14B8A6', icon: '💎' },
  { name: 'Indigo', color: '#6366F1', icon: '🔮' },
];

const ThemeCustomizer = ({ onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState('#ff751a');
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
      const theme = JSON.parse(savedTheme);
      setCustomColor(theme.primary);
      applyTheme(theme);
    }
  }, [applyTheme]);


  const applyTheme = React.useCallback((colors) => {
    document.documentElement.style.setProperty('--color-primary', colors.primary);
    document.documentElement.style.setProperty('--color-primary-light', colors.primaryLight);
    document.documentElement.style.setProperty('--color-primary-medium', colors.primaryMedium);
    document.documentElement.style.setProperty('--color-primary-dark', colors.primaryDark);
    document.documentElement.style.setProperty('--color-primary-rgb', colors.primaryRgb);

    localStorage.setItem('appTheme', JSON.stringify(colors));

    if (onThemeChange) {
      onThemeChange(colors);
    }
  }, [onThemeChange]);

  const handlePresetClick = (theme) => {
    const colors = generateThemeColors(theme.color);
    setCustomColor(theme.color);
    setSelectedTheme(theme.name);
    applyTheme(colors);
  };

  const handleCustomColorChange = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    const colors = generateThemeColors(color);
    setSelectedTheme('Custom');
    applyTheme(colors);
  };

  const resetToDefault = () => {
    const defaultColors = generateThemeColors('#ff751a');
    setCustomColor('#ff751a');
    setSelectedTheme(null);
    applyTheme(defaultColors);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-white hover:bg-slate-50 p-4 rounded-full shadow-lg border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:scale-110 z-40 group"
        aria-label="Customize theme"
      >
        <svg 
          className="w-6 h-6 text-slate-700 group-hover:text-current transition-colors" 
          style={{ color: 'var(--color-primary, #ff751a)' }}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto animate-slideIn">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h2 className="text-xl font-bold text-slate-900">Tema Aplikasi</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Warna Kustom</h3>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="relative">
                    <input
                      type="color"
                      value={customColor}
                      onChange={handleCustomColorChange}
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-white shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-600 mb-1">Warna yang dipilih:</p>
                    <p className="font-mono font-semibold text-slate-900">{customColor.toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Tema Preset</h3>
                <div className="grid grid-cols-2 gap-3">
                  {PRESET_THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => handlePresetClick(theme)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        selectedTheme === theme.name
                          ? 'border-slate-900 bg-slate-50 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div
                        className="w-full h-12 rounded-md mb-2 shadow-sm"
                        style={{ backgroundColor: theme.color }}
                      />
                      <p className="text-xs font-medium text-slate-900 flex items-center gap-1 justify-center">
                        <span>{theme.icon}</span>
                        <span>{theme.name}</span>
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Preview</h3>
                <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div 
                    className="p-3 rounded-lg text-white font-medium text-sm shadow-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: customColor }}
                  >
                    Button Primary
                  </div>
                  <div 
                    className="p-3 rounded-lg border-l-4 font-medium text-sm text-slate-900"
                    style={{ 
                      backgroundColor: generateThemeColors(customColor)?.primaryLight,
                      borderLeftColor: customColor 
                    }}
                  >
                    Meeting Card Preview
                  </div>
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: customColor,
                      color: 'white'
                    }}
                  >
                    Badge Example
                  </div>
                </div>
              </div>

              <button
                onClick={resetToDefault}
                className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors border border-slate-300"
              >
                Reset ke Default
              </button>

              <div 
                className="mt-6 p-3 rounded-lg border"
                style={{ 
                  backgroundColor: generateThemeColors(customColor)?.primaryLight,
                  borderColor: generateThemeColors(customColor)?.primaryMedium
                }}
              >
                <p className="text-xs text-slate-900">
                  💡 <strong>Tips:</strong> Pilih warna yang sesuai dengan brand atau preferensi Anda. Tema akan tersimpan otomatis.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    
    </>
  );
};

export default ThemeCustomizer;