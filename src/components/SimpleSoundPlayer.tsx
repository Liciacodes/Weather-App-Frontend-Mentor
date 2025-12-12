// components/SimpleSoundPlayer.tsx - FIXED
import { useState } from 'react';

interface SimpleSoundPlayerProps {
  weatherCode: number;
  volume?: number;
}

const SimpleSoundPlayer = ({ weatherCode, volume = 0.5 }: SimpleSoundPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [debugMessage, setDebugMessage] = useState<string>('Ready');

  // Always return a valid sound URL
  const getSoundUrl = (code: number): string => {
    console.log(`Getting sound for weather code: ${code}`);
    
    // Always return a valid URL - start with just one sound to test
    const hour = new Date().getHours();
    const isDaytime = hour >= 6 && hour < 18;
    
    // FOR TESTING: Always return birds sound regardless of weather
    const birdsSound = 'https://assets.mixkit.co/sfx/preview/mixkit-birds-chirping-1485.mp3';
    
    // Make sure we return a valid URL
    if (!birdsSound || birdsSound.trim() === '') {
      console.error('Invalid sound URL generated!');
      // Fallback to a reliable URL
      return 'https://assets.mixkit.co/sfx/preview/mixkit-birds-chirping-1485.mp3';
    }
    
    return birdsSound;
  };

  // Play sound with better error handling
  const playSound = () => {
    console.log('=== PLAY SOUND STARTED ===');
    setDebugMessage('Starting...');
    
    try {
      const soundUrl = getSoundUrl(weatherCode);
      console.log('Sound URL to play:', soundUrl);
      
      if (!soundUrl || soundUrl.trim() === '') {
        console.error('No sound URL available!');
        setDebugMessage('Error: No sound URL');
        return;
      }
      
      // Create new audio element
      const audio = new Audio();
      audio.src = soundUrl;
      audio.volume = volume;
      audio.loop = true;
      
      // Set up event listeners for debugging
      audio.onerror = (e) => {
        console.error('Audio error event:', e);
        console.error('Audio error details:', audio.error);
        setDebugMessage(`Error: ${audio.error?.message || 'Unknown'}`);
      };
      
      audio.oncanplay = () => {
        console.log('Audio can play now');
        setDebugMessage('Can play');
      };
      
      audio.onloadeddata = () => {
        console.log('Audio data loaded');
        setDebugMessage('Loaded');
      };
      
      audio.onplaying = () => {
        console.log('✅ Audio is now playing!');
        setIsPlaying(true);
        setDebugMessage('Playing');
      };
      
      // Try to play
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ Play promise resolved successfully');
            setIsPlaying(true);
            setDebugMessage('Playing successfully');
          })
          .catch(error => {
            console.error('❌ Play promise rejected:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error code:', error.code);
            setDebugMessage(`Error: ${error.message}`);
            setIsPlaying(false);
          });
      }
      
    } catch (error) {
      console.error('❌ Exception in playSound:', error);
      setDebugMessage(`Exception: ${error.message}`);
    }
  };

  // Stop sound
  const stopSound = () => {
    console.log('Stopping all sounds...');
    
    // Stop all audio elements on the page
    const allAudioElements = document.querySelectorAll('audio');
    allAudioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    setIsPlaying(false);
    setDebugMessage('Stopped');
  };

  // Toggle play/stop
  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      playSound();
    }
  };

  // SIMPLE TEST - Direct audio play (should always work)
  const testDirectSound = () => {
    console.log('=== DIRECT SOUND TEST ===');
    setDebugMessage('Testing...');
    
    // Use a hardcoded URL that we know works
    const testUrl = 'https://assets.mixkit.co/sfx/preview/mixkit-birds-chirping-1485.mp3';
    
    console.log('Direct test URL:', testUrl);
    
    const audio = new Audio(testUrl);
    audio.volume = 0.7;
    audio.loop = false; // Don't loop for test
    
    audio.play()
      .then(() => {
        console.log('✅ Direct test successful!');
        setDebugMessage('Test: Playing');
        
        // Auto stop after 2 seconds
        setTimeout(() => {
          audio.pause();
          setDebugMessage('Test: Completed');
        }, 2000);
      })
      .catch(error => {
        console.error('❌ Direct test failed:', error);
        setDebugMessage(`Test failed: ${error.message}`);
      });
  };

  // SIMPLE ALTERNATIVE: Use iframe for sound (works when Audio doesn't)
  const testIframeSound = () => {
    console.log('Testing with iframe...');
    
    // Create hidden iframe with audio
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'https://assets.mixkit.co/sfx/preview/mixkit-birds-chirping-1485.mp3';
    document.body.appendChild(iframe);
    
    setTimeout(() => {
      document.body.removeChild(iframe);
      console.log('Iframe removed');
    }, 3000);
    
    setDebugMessage('Iframe test started');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
      {/* Debug panel */}
      <div className="bg-black/90 text-white text-xs p-3 rounded-lg shadow-xl max-w-[250px]">
        <div className="font-bold mb-1 border-b border-gray-700 pb-1">Sound Debug</div>
        <div>Weather Code: <span className="font-bold">{weatherCode}</span></div>
        <div>Status: <span className={`font-bold ${isPlaying ? 'text-green-400' : 'text-red-400'}`}>
          {isPlaying ? '▶ PLAYING' : '⏸ STOPPED'}
        </span></div>
        <div className="mt-1">Message: {debugMessage}</div>
        
        <div className="grid grid-cols-2 gap-1 mt-2">
          <button 
            onClick={testDirectSound}
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
          >
            Test Direct
          </button>
          <button 
            onClick={testIframeSound}
            className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs"
          >
            Test Iframe
          </button>
          <button 
            onClick={playSound}
            className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
          >
            Force Play
          </button>
          <button 
            onClick={stopSound}
            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
          >
            Force Stop
          </button>
        </div>
      </div>
      
      {/* Main toggle button */}
      <button
        onClick={toggleSound}
        className={`p-4 rounded-full shadow-lg transition-all transform hover:scale-105 ${
          isPlaying 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-green-500 hover:bg-green-600'
        }`}
        title={isPlaying ? 'Stop sounds (ESC)' : 'Play sounds (Space)'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default SimpleSoundPlayer;