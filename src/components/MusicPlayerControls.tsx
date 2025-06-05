import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  ListMusic
} from 'lucide-react';

interface MusicPlayerControlsProps {
  currentSong?: {
    title: string;
    artist: string;
    albumArtUrl: string;
  };
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onSkipNext?: () => void;
  onSkipPrev?: () => void;
  onSeek?: (value: number[]) => void;
  onVolumeChange?: (value: number[]) => void;
  progress?: number; // 0-100
  volume?: number; // 0-100
  duration?: number; // in seconds
  currentTime?: number; // in seconds
}

const formatTime = (timeInSeconds: number = 0): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};


const MusicPlayerControls: React.FC<MusicPlayerControlsProps> = ({
  currentSong,
  isPlaying = false,
  onPlayPause,
  onSkipNext,
  onSkipPrev,
  onSeek,
  onVolumeChange,
  progress = 0,
  volume = 50,
  duration = 0,
  currentTime = 0,
}) => {
  console.log("Rendering MusicPlayerControls. Current song:", currentSong?.title, "Playing:", isPlaying);
  const [currentVolume, setCurrentVolume] = useState([volume]);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (newVolume: number[]) => {
    setCurrentVolume(newVolume);
    setIsMuted(newVolume[0] === 0);
    if (onVolumeChange) onVolumeChange(newVolume);
  };

  const toggleMute = () => {
    if (isMuted) {
        handleVolumeChange([volume > 0 ? volume : 50]); // Unmute to previous or default volume
    } else {
        handleVolumeChange([0]); // Mute
    }
    setIsMuted(!isMuted);
  };

  // Placeholder for Doraemon theme colors
  const playButtonColor = "bg-red-500 hover:bg-red-600"; // Doraemon red for play button
  const iconColor = "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white";

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border h-20 md:h-[90px] px-4 py-2 z-50">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between">
        {/* Song Info (Left) */}
        <div className="flex items-center gap-3 w-1/4 md:w-1/3 min-w-0">
          {currentSong ? (
            <>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded overflow-hidden flex-shrink-0">
                <AspectRatio ratio={1/1}>
                    <img
                        src={currentSong.albumArtUrl || '/placeholder.svg'}
                        alt={currentSong.title}
                        className="object-cover w-full h-full"
                        onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                    />
                </AspectRatio>
              </div>
              <div className="truncate">
                <p className="text-sm font-medium truncate">{currentSong.title}</p>
                <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
              </div>
              <Button variant="ghost" size="icon" className={`ml-2 ${iconColor}`}>
                <Heart className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">No song playing</div>
          )}
        </div>

        {/* Player Controls (Center) */}
        <div className="flex flex-col items-center justify-center w-1/2 md:w-1/3">
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" size="icon" onClick={onSkipPrev} className={iconColor} aria-label="Previous song">
              <Shuffle className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onSkipPrev} className={iconColor} aria-label="Previous song">
              <SkipBack className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={onPlayPause}
              className={`rounded-full h-9 w-9 md:h-10 md:w-10 ${playButtonColor} text-white`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-5 w-5 md:h-6 md:w-6" /> : <Play className="h-5 w-5 md:h-6 md:w-6" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onSkipNext} className={iconColor} aria-label="Next song">
              <SkipForward className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onSkipPrev} className={iconColor} aria-label="Previous song">
              <Repeat className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
          <div className="w-full max-w-xs md:max-w-md flex items-center gap-2 mt-1 md:mt-2">
            <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
            <Slider
              defaultValue={[progress]}
              value={[progress]}
              max={100}
              step={1}
              onValueChange={onSeek}
              className="flex-1"
              aria-label="Song progress"
            />
            <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume and Other Controls (Right) */}
        <div className="flex items-center justify-end gap-2 md:gap-3 w-1/4 md:w-1/3">
           <Button variant="ghost" size="icon" className={iconColor}>
                <ListMusic className="h-4 w-4 md:h-5 md:w-5" /> {/* Queue button */}
            </Button>
          <Button variant="ghost" size="icon" onClick={toggleMute} className={iconColor} aria-label={isMuted ? "Unmute" : "Mute"}>
            {currentVolume[0] === 0 || isMuted ? <VolumeX className="h-4 w-4 md:h-5 md:w-5" /> : <Volume2 className="h-4 w-4 md:h-5 md:w-5" />}
          </Button>
          <Slider
            defaultValue={[volume]}
            value={currentVolume}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-16 md:w-24"
            aria-label="Volume control"
          />
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayerControls;