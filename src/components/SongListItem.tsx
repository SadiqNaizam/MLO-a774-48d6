import React from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play, MoreHorizontal, Heart, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface SongListItemProps {
  song: {
    id: string;
    title: string;
    artist: string;
    album?: string;
    duration: string; // e.g., "3:45"
    albumArtUrl?: string;
    isExplicit?: boolean;
  };
  isPlaying?: boolean; // Is this song currently playing?
  isActive?: boolean; // Is this song currently selected/active in the list?
  showAlbumArt?: boolean;
  trackNumber?: number;
  onPlayClick?: (songId: string) => void;
  onLikeClick?: (songId: string) => void;
  onAddToPlaylistClick?: (songId: string) => void;
}

const SongListItem: React.FC<SongListItemProps> = ({
  song,
  isPlaying = false,
  isActive = false,
  showAlbumArt = true,
  trackNumber,
  onPlayClick,
  // onLikeClick,
  // onAddToPlaylistClick,
}) => {
  console.log("Rendering SongListItem:", song.title);

  const baseClasses = "grid items-center gap-3 p-2 rounded-md group";
  // Doraemon theme: active item blue accent
  const activeClasses = isActive ? "bg-blue-100 dark:bg-blue-900/50" : "hover:bg-gray-100 dark:hover:bg-gray-800/50";
  const gridTemplateColumns = showAlbumArt ? "auto 40px 1fr 1fr auto auto" : "auto 1fr 1fr auto auto";


  return (
    <div
      className={`${baseClasses} ${activeClasses}`}
      style={{ gridTemplateColumns }}
      role="row"
    >
      <div className="flex items-center justify-center text-muted-foreground group-hover:hidden">
        {trackNumber !== undefined ? (
          <span className="text-xs w-5 text-center">{trackNumber}</span>
        ) : (
          <Play className="h-4 w-4" />
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 hidden group-hover:flex items-center justify-center"
        onClick={() => onPlayClick && onPlayClick(song.id)}
        aria-label={`Play ${song.title}`}
      >
        {isPlaying && isActive ? <Pause className="h-4 w-4 text-blue-500" /> : <Play className="h-4 w-4 text-blue-500" />}
      </Button>

      {showAlbumArt && (
        <div className="w-10 h-10 rounded overflow-hidden">
          <AspectRatio ratio={1 / 1}>
            <img
              src={song.albumArtUrl || '/placeholder.svg'}
              alt={song.title}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
        </div>
      )}

      <div className="truncate">
        <p className={`font-medium truncate ${isActive && isPlaying ? 'text-blue-600 dark:text-blue-400' : 'text-foreground'}`}>{song.title}</p>
        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
      </div>

      <div className="truncate text-sm text-muted-foreground hidden md:block">
        {song.album || 'Single'}
      </div>

      <div className="text-sm text-muted-foreground text-right">
        {song.duration}
      </div>

      <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Like song">
            <Heart className="h-4 w-4" />
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More options">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("Add to queue", song.id)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add to Queue
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Add to playlist", song.id)}>
                    <ListMusic className="mr-2 h-4 w-4" /> Add to Playlist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("View artist", song.artist)}>View Artist</DropdownMenuItem>
                {song.album && <DropdownMenuItem onClick={() => console.log("View album", song.album)}>View Album</DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SongListItem;