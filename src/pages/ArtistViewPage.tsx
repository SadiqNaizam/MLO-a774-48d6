import React from 'react';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import PageHeader from '@/components/layout/Header';
import ContentCard from '@/components/ContentCard';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import SongListItem from '@/components/SongListItem';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MoreHorizontal, UserPlus, CheckCircle } from 'lucide-react'; // UserPlus for Follow, CheckCircle for Followed

const placeholderPlayerSong = {
  title: "Artist's Anthem",
  artist: "The Headliner",
  albumArtUrl: "https://source.unsplash.com/random/100x100?artist,stage"
};

const artistDetails = {
  name: "The Gadgeteers",
  monthlyListeners: "2.5M",
  bio: "Known for their futuristic soundscapes and catchy melodies, The Gadgeteers blend electronic beats with heartfelt lyrics about friendship and adventure.",
  bannerUrl: "https://source.unsplash.com/random/1200x400?future,band,stage",
  avatarUrl: "https://source.unsplash.com/random/200x200?robot,band",
  isFollowed: false, // Example state
};

const popularTracks = [
  { id: 'pt1', title: 'Robo Boogie', artist: artistDetails.name, album: 'Circuit City', duration: '3:12', albumArtUrl: 'https://source.unsplash.com/random/100x100?robot,dance' },
  { id: 'pt2', title: 'Future Friends', artist: artistDetails.name, album: 'Time Travelers', duration: '4:05', albumArtUrl: 'https://source.unsplash.com/random/100x100?future,friends' },
  { id: 'pt3', title: 'Blue Portal Hop', artist: artistDetails.name, album: 'Dimension Drift', duration: '2:58', albumArtUrl: 'https://source.unsplash.com/random/100x100?portal,blue' },
];

const artistAlbums = [
  { id: 'aa1', title: 'Circuit City', description: 'Debut Album - 2022', imageUrl: 'https://source.unsplash.com/random/300x300?circuit,album', themeAccentColor: 'blue-500' },
  { id: 'aa2', title: 'Time Travelers', description: 'Sophomore LP - 2023', imageUrl: 'https://source.unsplash.com/random/300x300?time,album', themeAccentColor: 'purple-500' },
];

const ArtistViewPage = () => {
  console.log('ArtistViewPage loaded');
  // const [isFollowed, setIsFollowed] = React.useState(artistDetails.isFollowed); // For real follow logic

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <PageHeader title={artistDetails.name} /> {/* Or keep it generic like "Artist Profile" */}
        <main className="flex-1 overflow-y-auto pb-[calc(90px+1.5rem)] space-y-8">
          {/* Artist Banner & Info Section */}
          <section className="relative rounded-lg overflow-hidden mx-6 mt-6"> {/* Apply margin to match p-6 of other sections */}
            <img src={artistDetails.bannerUrl} alt={`${artistDetails.name} Banner`} className="w-full h-48 md:h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background shadow-lg flex-shrink-0 -mb-10 sm:mb-0">
                  <AvatarImage src={artistDetails.avatarUrl} alt={artistDetails.name} />
                  <AvatarFallback>{artistDetails.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="mt-12 sm:mt-0 text-white">
                  <p className="text-xs font-semibold uppercase">Artist</p>
                  <h1 className="text-3xl md:text-5xl font-bold">{artistDetails.name}</h1>
                  <p className="text-sm opacity-80 mt-1">{artistDetails.monthlyListeners} monthly listeners</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <Button 
                  size="lg" 
                  className={`${artistDetails.isFollowed ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white px-6`}
                  // onClick={() => setIsFollowed(!isFollowed)}
                >
                  {artistDetails.isFollowed ? <CheckCircle className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />}
                  {artistDetails.isFollowed ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" className="bg-black/30 border-white/50 text-white hover:bg-white/20" size="icon"><MoreHorizontal className="h-5 w-5" /></Button>
              </div>
            </div>
          </section>
          
          {artistDetails.bio && (
            <section className="px-6">
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{artistDetails.bio}</p>
            </section>
          )}

          <section className="px-6">
            <h2 className="text-2xl font-semibold mb-4">Popular Tracks</h2>
            <div className="space-y-1">
              {popularTracks.map((song, index) => (
                <SongListItem
                  key={song.id}
                  song={song}
                  trackNumber={index + 1}
                  showAlbumArt={false} // Example: less detail for popular list
                  onPlayClick={(id) => console.log('Play song:', id)}
                />
              ))}
            </div>
          </section>

          <section className="px-6">
            <h2 className="text-2xl font-semibold mb-4">Albums</h2>
            <ScrollArea className="w-full whitespace-nowrap">
                 <div className="flex space-x-4 pb-4">
                    {artistAlbums.map(album => (
                        <ContentCard
                        key={album.id}
                        title={album.title}
                        description={album.description}
                        imageUrl={album.imageUrl}
                        themeAccentColor={album.themeAccentColor}
                        onClick={() => console.log(`Navigate to album ${album.id}`)}
                        />
                    ))}
                 </div>
                 <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        </main>
      </div>
      <MusicPlayerControls currentSong={placeholderPlayerSong} />
    </div>
  );
};

export default ArtistViewPage;