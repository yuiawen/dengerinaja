import { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import SearchResults from '@/components/SearchResults';
import SongCard from '@/components/SongCard';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  source: 'youtube' | 'spotify' | 'soundcloud';
  url: string;
  embedUrl?: string;
}

interface OutletContext {
  onPlay: (song: Song) => void;
  onSave: (song: Song) => void;
  currentPlaying?: string;
  playlist: Song[];
}

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { onPlay, onSave, currentPlaying } = useOutletContext<OutletContext>();
  const { toast } = useToast();

  // Mock data
  const trendingSongs: Song[] = [
    {
      id: 'trending-1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      thumbnail: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/maxresdefault.jpg',
      source: 'youtube',
      url: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
    },
    {
      id: 'trending-2',
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg',
      source: 'spotify',
      url: 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3',
    },
    {
      id: 'trending-3',
      title: 'Someone You Loved',
      artist: 'Lewis Capaldi',
      thumbnail: 'https://i.ytimg.com/vi/zABLecsR5UE/maxresdefault.jpg',
      source: 'soundcloud',
      url: 'https://soundcloud.com/lewiscapaldi/someone-you-loved',
    },
  ];

  const recommendations: Song[] = [
    {
      id: 'rec-1',
      title: 'Watermelon Sugar',
      artist: 'Harry Styles',
      thumbnail: 'https://i.ytimg.com/vi/E07s5ZYygMg/maxresdefault.jpg',
      source: 'youtube',
      url: 'https://www.youtube.com/watch?v=E07s5ZYygMg',
    },
    {
      id: 'rec-2',
      title: 'Bad Guy',
      artist: 'Billie Eilish',
      thumbnail: 'https://i.ytimg.com/vi/DyDfgMOUjCI/maxresdefault.jpg',
      source: 'spotify',
      url: 'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m',
    },
  ];

  // Handle search from URL params
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    const searchSource = searchParams.get('source');

    if (searchQuery) {
      setIsSearching(true);
      
      // Simulate API call
      setTimeout(() => {
        const allSongs = [...trendingSongs, ...recommendations];
        const filtered = allSongs.filter(song => 
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setSearchResults(filtered.length > 0 ? filtered : allSongs);
        setIsSearching(false);
        
        toast({
          title: "Pencarian selesai",
          description: `Ditemukan ${filtered.length > 0 ? filtered.length : allSongs.length} hasil`,
        });
      }, 1500);
    }
  }, [searchParams, toast]);

  const searchQuery = searchParams.get('search');

  return (
    <div className="p-6 space-y-8">
      {/* Search Results */}
      {(searchQuery || isSearching) && (
        <SearchResults
          results={searchResults}
          onPlay={onPlay}
          onSave={onSave}
          currentPlaying={currentPlaying}
          isLoading={isSearching}
          query={searchQuery || ''}
        />
      )}

      {/* Trending Section */}
      {!searchQuery && (
        <section className="animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            🔥 Trending Hari Ini
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingSongs.map((song, index) => (
              <div
                key={song.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <SongCard
                  song={song}
                  onPlay={onPlay}
                  onSave={onSave}
                  isPlaying={currentPlaying === song.id}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations Section */}
      {!searchQuery && (
        <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            ✨ Rekomendasi Untukmu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((song, index) => (
              <div
                key={song.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <SongCard
                  song={song}
                  onPlay={onPlay}
                  onSave={onSave}
                  isPlaying={currentPlaying === song.id}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;