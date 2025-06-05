import React from 'react';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import PageHeader from '@/components/layout/Header';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import SongListItem from '@/components/SongListItem';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Heart, MoreHorizontal, ListMusic, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const placeholderPlayerSong = {
  title: "First Track",
  artist: "Playlist Creator",
  albumArtUrl: "https://source.unsplash.com/random/100x100?playlist,active"
};

const playlistDetails = {
  type: "Playlist",
  name: "Doraemon's Adventure Mix",
  description: "A collection of upbeat and adventurous tunes!",
  creator: "Doraemon",
  songCount: 5,
  totalDuration: "18 min",
  artworkUrl: "https://source.unsplash.com/random/400x400?doraemon,adventure",
};

const playlistSongs = [
  { id: 'ps1', title: 'Gadget Getaway', artist: 'The Mechanicals', album: 'Robotic Rhythms', duration: '3:30', albumArtUrl: 'https://source.unsplash.com/random/100x100?gadget' },
  { id: 'ps2', title: 'Time Travel Tempo', artist: 'Chrononauts', album: 'Epoch Beats', duration: '4:15', albumArtUrl: 'https://source.unsplash.com/random/100x100?time' },
  { id: 'ps3', title: 'Pocket Power', artist: 'Mini Marvels', album: 'Small Wonders', duration: '2:50', albumArtUrl: 'https://source.unsplash.com/random/100x100?pocket' },
  { id: 'ps4', title: 'Sky High Symphony', artist: 'Bamboo Copters', album: 'Aerial Anthems', duration: '3:55', albumArtUrl: 'https://source.unsplash.com/random/100x100?sky' },
  { id: 'ps5', title: 'Friendship Fiesta', artist: 'Nobita & Friends', album: 'Playground Pop', duration: '3:20', albumArtUrl: 'https://source.unsplash.com/random/100x100?friendship' },
];

const AlbumPlaylistViewPage = () => {
  console.log('AlbumPlaylistViewPage loaded');
  // In a real app, fetch data based on :id param

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <PageHeader title={playlistDetails.type} />
        <main className="flex-1 overflow-y-auto pb-[calc(90px+1.5rem)]">
          {/* Album/Playlist Info Section */}
          <section className="p-6 bg-gradient-to-b from-blue-700 via-blue-800 to-background/5 text-primary-foreground">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <Avatar className="w-40 h-40 md:w-48 md:h-48 rounded-md shadow-2xl border-2 border-blue-300">
                <AvatarImage src={playlistDetails.artworkUrl} alt={playlistDetails.name} />
                <AvatarFallback>{playlistDetails.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center md:text-left">
                <p className="text-sm font-medium uppercase">{playlistDetails.type}</p>
                <h1 className="text-4xl md:text-6xl font-bold">{playlistDetails.name}</h1>
                <p className="text-blue-200 text-sm">{playlistDetails.description}</p>
                <p className="text-xs text-blue-300">
                  Created by {playlistDetails.creator} • {playlistDetails.songCount} songs, {playlistDetails.totalDuration}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-base">
                <Play className="mr-2 h-5 w-5 fill-white" /> Play
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-red-300" aria-label="Like playlist">
                <Heart className="h-6 w-6" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="More options">
                    <MoreHorizontal className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem><ListMusic className="mr-2 h-4 w-4" /> Add to Queue</DropdownMenuItem>
                  <DropdownMenuItem><PlusCircle className="mr-2 h-4 w-4" /> Add to another Playlist</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </section>

          {/* Song List Section */}
          <section className="p-6">
            <ScrollArea className="max-h-[calc(100vh-450px)]"> {/* Adjust max-h dynamically */}
                <div className="space-y-1">
                {playlistSongs.map((song, index) => (
                    <SongListItem
                    key={song.id}
                    song={song}
                    trackNumber={index + 1}
                    onPlayClick={(id) => console.log('Play song:', id)}
                    // Example: Highlight currently playing song in a real app
                    // isPlaying={placeholderPlayerSong.title === song.title} 
                    // isActive={placeholderPlayerSong.title === song.title}
                    />
                ))}
                </div>
            </ScrollArea>
          </section>
        </main>
      </div>
      <MusicPlayerControls currentSong={placeholderPlayerSong} />
    </div>
  );
};

export default AlbumPlaylistViewPage;