import React from 'react';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import PageHeader from '@/components/layout/Header';
import ContentCard from '@/components/ContentCard';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const placeholderPlayerSong = {
  title: "Ambient Mix",
  artist: "Chill Beats Inc.",
  albumArtUrl: "https://source.unsplash.com/random/100x100?abstract,music"
};

const featuredPlaylists = [
  { id: 'fp1', title: 'Doraemon\'s Pocket Hits', description: 'Upbeat and fun!', imageUrl: 'https://source.unsplash.com/random/300x300?cartoon,music', themeAccentColor: 'blue-500' },
  { id: 'fp2', title: 'Noby\'s Study Time', description: 'Focus and concentrate.', imageUrl: 'https://source.unsplash.com/random/300x300?study,music', themeAccentColor: 'yellow-500' },
  { id: 'fp3', title: 'Sue\'s Sweet Melodies', description: 'Calm and soothing.', imageUrl: 'https://source.unsplash.com/random/300x300?nature,calm', themeAccentColor: 'pink-500' },
  { id: 'fp4', title: 'Big G\'s Power Hour', description: 'Energetic workout tunes.', imageUrl: 'https://source.unsplash.com/random/300x300?gym,power', themeAccentColor: 'red-600' },
  { id: 'fp5', title: 'Sneech\'s Smooth Grooves', description: 'Jazzy and cool.', imageUrl: 'https://source.unsplash.com/random/300x300?jazz,night', themeAccentColor: 'purple-500' },
];

const newReleases = [
  { id: 'nr1', title: 'Future Gadget Funk', description: 'By The Time Warpers', imageUrl: 'https://source.unsplash.com/random/300x300?future,electronic', themeAccentColor: 'cyan-500' },
  { id: 'nr2', title: 'Anywhere Door Acoustics', description: 'By Dora Band', imageUrl: 'https://source.unsplash.com/random/300x300?acoustic,door', themeAccentColor: 'green-500' },
];

const HomePage = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden"> {/* ml-64 for sidebar */}
        <PageHeader title="Home" />
        <main className="flex-1 overflow-y-auto p-6 pb-[calc(90px+1.5rem)] space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Featured Playlists</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {featuredPlaylists.map(playlist => (
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
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">New Releases</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {newReleases.map(release => (
                <ContentCard
                  key={release.id}
                  title={release.title}
                  description={release.description}
                  imageUrl={release.imageUrl}
                  themeAccentColor={release.themeAccentColor}
                  onClick={() => console.log(`Navigate to release ${release.id}`)}
                />
              ))}
            </div>
          </section>
          
          {/* Placeholder for other sections like 'Top Charts', 'Recently Played' */}
           <section>
            <h2 className="text-2xl font-semibold mb-4">Top Charts</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg shadow">Chart Area 1 (e.g., Top Songs)</div>
                <div className="bg-card p-4 rounded-lg shadow">Chart Area 2 (e.g., Top Artists)</div>
            </div>
          </section>
        </main>
      </div>
      <MusicPlayerControls currentSong={placeholderPlayerSong} />
    </div>
  );
};

export default HomePage;