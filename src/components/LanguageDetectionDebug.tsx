import { useTranslation } from '@/hooks/useTranslation';

export function LanguageDetectionDebug() {
  const { language, isLanguageDetected } = useTranslation();

  // Ne s'affiche qu'en mode développement
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white text-xs p-2 rounded-lg backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isLanguageDetected ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
        <span>
          Lang: <strong>{language.toUpperCase()}</strong> 
          {!isLanguageDetected && <span className="text-yellow-400 ml-1">(detecting...)</span>}
        </span>
      </div>
      <div className="text-[10px] text-gray-400 mt-1">
        {isLanguageDetected ? '✅ Auto-detected' : '⏳ Loading...'}
      </div>
    </div>
  );
}