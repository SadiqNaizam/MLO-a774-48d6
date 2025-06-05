import React, { useState } from 'react';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import PageHeader from '@/components/layout/Header';
import ContentCard from '@/components/ContentCard';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import SongListItem from '@/components/SongListItem';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const placeholderPlayerSong = {
  title: "Searching The Waves",
  artist: "DJ Query",
  albumArtUrl: "https://source.unsplash.com/random/100x100?search,music"
};

const sampleSongs = [
  { id: 's1', title: 'Doraemon\'s Bell', artist: 'Future Gadget Band', album: 'Time Machine Grooves', duration: '3:45', albumArtUrl: 'https://source.unsplash.com/random/100x100?bell,music' },
  { id: 's2', title: 'Pocket Full of Dreams', artist: 'Nobita & The Sleepers', album: 'Lazy Afternoons', duration: '4:02', albumArtUrl: 'https://source.unsplash.com/random/100x100?dream,music' },
];

const sampleArtists = [
  { id: 'ar1', title: 'The Time Warpers', description: 'Electronic Duo', imageUrl: 'https://source.unsplash.com/random/300x300?electronic,duo', themeAccentColor: 'cyan-500' },
  { id: 'ar2', title: 'Dora Band', description: 'Acoustic Sensations', imageUrl: 'https://source.unsplash.com/random/300x300?acoustic,band', themeAccentColor: 'green-500' },
];

const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered results would be based on searchTerm in a real app
  const filteredSongs = sampleSongs.filter(song => song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredArtists = sampleArtists.filter(artist => artist.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <PageHeader>
             <Input 
                type="search" 
                placeholder="Search for songs, artists, albums..." 
                className="w-full md:w-96 text-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </PageHeader>
        <main className="flex-1 overflow-y-auto p-6 pb-[calc(90px+1.5rem)] space-y-6">
          {searchTerm ? (
            <Tabs defaultValue="songs" className="w-full">
              <TabsList>
                <TabsTrigger value="songs">Songs ({filteredSongs.length})</TabsTrigger>
                <TabsTrigger value="artists">Artists ({filteredArtists.length})</TabsTrigger>
                <TabsTrigger value="albums">Albums (0)</TabsTrigger> {/* Placeholder */}
                <TabsTrigger value="playlists">Playlists (0)</TabsTrigger> {/* Placeholder */}
              </TabsList>
              <TabsContent value="songs" className="mt-4">
                <ScrollArea className="h-[calc(100vh-280px)]"> {/* Adjust height as needed */}
                  {filteredSongs.length > 0 ? filteredSongs.map((song, index) => (
                    <SongListItem key={song.id} song={song} trackNumber={index + 1} onPlayClick={(id) => console.log('Play song:', id)} />
                  )) : <p className="text-muted-foreground">No songs found for "{searchTerm}".</p>}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="artists" className="mt-4">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  {filteredArtists.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filteredArtists.map(artist => (
                        <ContentCard
                          key={artist.id}
                          title={artist.title}
                          description={artist.description}
                          imageUrl={artist.imageUrl}
                          themeAccentColor={artist.themeAccentColor}
                          onClick={() => console.log(`Navigate to artist ${artist.id}`)}
                        />
                      ))}
                    </div>
                  ) : <p className="text-muted-foreground">No artists found for "{searchTerm}".</p>}
                </ScrollArea>
              </TabsContent>
              {/* Add TabsContent for Albums and Playlists similarly */}
               <TabsContent value="albums" className="mt-4">
                <p className="text-muted-foreground">Album search results for "{searchTerm}" would appear here.</p>
              </TabsContent>
              <TabsContent value="playlists" className="mt-4">
                <p className="text-muted-foreground">Playlist search results for "{searchTerm}" would appear here.</p>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center text-muted-foreground py-10">
                <p>Start typing to search for your favorite music!</p>
                <p className="text-sm mt-2">Discover songs, artists, albums, and playlists.</p>
            </div>
          )}
        </main>
      </div>
      <MusicPlayerControls currentSong={placeholderPlayerSong} />
    </div>
  );
};

export default SearchPage;