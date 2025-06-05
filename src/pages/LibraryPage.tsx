import React from 'react';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import PageHeader from '@/components/layout/Header';
import ContentCard from '@/components/ContentCard';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import SongListItem from '@/components/SongListItem';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle } from 'lucide-react';

const placeholderPlayerSong = {
  title: "Library Lullabies",
  artist: "The Archivists",
  albumArtUrl: "https://source.unsplash.com/random/100x100?library,music"
};

const userPlaylists = [
  { id: 'pl1', title: 'My Doraemon Favs', description: '23 songs', imageUrl: 'https://source.unsplash.com/random/300x300?doraemon,playlist', themeAccentColor: 'blue-500' },
  { id: 'pl2', title: 'Coding Marathon', description: '50 songs', imageUrl: 'https://source.unsplash.com/random/300x300?code,playlist', themeAccentColor: 'green-500' },
];
const likedSongs = [
  { id: 'ls1', title: 'Anywhere Door Hop', artist: 'Teleport Tunes', album: 'Gadget Grooves', duration: '2:55', albumArtUrl: 'https://source.unsplash.com/random/100x100?door,song' },
  { id: 'ls2', title: 'Time Kerchief Twist', artist: 'Chronos Crew', album: 'Epoch Echoes', duration: '3:10', albumArtUrl: 'https://source.unsplash.com/random/100x100?time,song' },
];

const LibraryPage = () => {
  console.log('LibraryPage loaded');

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <PageHeader title="Your Library" />
        <main className="flex-1 overflow-y-auto p-6 pb-[calc(90px+1.5rem)] space-y-6">
          <Tabs defaultValue="playlists" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
                <TabsTrigger value="songs">Liked Songs</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
              </TabsList>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Playlist
              </Button>
            </div>
            <TabsContent value="playlists">
              <ScrollArea className="h-[calc(100vh-280px)]"> {/* Adjust height as needed */}
                {userPlaylists.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {userPlaylists.map(playlist => (
                    <ContentCard
                      key={playlist.id}
                      title={playlist.title}
                      description={playlist.description}
                      imageUrl={playlist.imageUrl}
                      themeAccentColor={playlist.themeAccentColor}
                      onClick={() => console.log(`Navigate to playlist ${playlist.id}`)}
                    />
                  ))}
                </div>
                 ) : <p className="text-muted-foreground text-center py-8">You haven't created or saved any playlists yet.</p>}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="songs">
              <ScrollArea className="h-[calc(100vh-280px)]">
                {likedSongs.length > 0 ? likedSongs.map((song, index) => (
                  <SongListItem key={song.id} song={song} trackNumber={index + 1} onPlayClick={(id) => console.log('Play song:', id)} />
                )) : <p className="text-muted-foreground text-center py-8">Your liked songs will appear here.</p>}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="artists">
              <p className="text-muted-foreground text-center py-8">Followed artists will appear here.</p>
            </TabsContent>
             <TabsContent value="albums">
              <p className="text-muted-foreground text-center py-8">Saved albums will appear here.</p>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <MusicPlayerControls currentSong={placeholderPlayerSong} />
    </div>
  );
};

export default LibraryPage;