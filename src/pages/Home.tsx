import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import PlaylistSection from '@/components/PlaylistSection';
import PlayerEmbed from '@/components/PlayerEmbed';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  source: 'youtube' | 'spotify' | 'soundcloud';
  url: string;
  embedUrl?: string;
}

const Home = () => {
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentPlaying, setCurrentPlaying] = useState<Song | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  const { toast } = useToast();

  // Mock data untuk demo
  const mockSongs: Song[] = [
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      thumbnail: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/maxresdefault.jpg',
      source: 'youtube',
      url: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
    },
    {
      id: '2',
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg',
      source: 'spotify',
      url: 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3',
    },
    {
      id: '3',
      title: 'Someone You Loved',
      artist: 'Lewis Capaldi',
      thumbnail: 'https://i.ytimg.com/vi/zABLecsR5UE/maxresdefault.jpg',
      source: 'soundcloud',
      url: 'https://soundcloud.com/lewiscapaldi/someone-you-loved',
    },
    {
      id: '4',
      title: 'Watermelon Sugar',
      artist: 'Harry Styles',
      thumbnail: 'https://i.ytimg.com/vi/E07s5ZYygMg/maxresdefault.jpg',
      source: 'youtube',
      url: 'https://www.youtube.com/watch?v=E07s5ZYygMg',
    },
    {
      id: '5',
      title: 'Bad Guy',
      artist: 'Billie Eilish',
      thumbnail: 'https://i.ytimg.com/vi/DyDfgMOUjCI/maxresdefault.jpg',
      source: 'spotify',
      url: 'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m',
    },
  ];

  const handleSearch = async (query: string, source: string) => {
    setIsSearching(true);
    setLastQuery(query);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter mock data based on query (simple demo)
      const filtered = mockSongs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
      );
      
      // If no exact matches, show all songs as demo
      setSearchResults(filtered.length > 0 ? filtered : mockSongs);
      setIsSearching(false);
      
      toast({
        title: "Pencarian selesai",
        description: `Ditemukan ${filtered.length > 0 ? filtered.length : mockSongs.length} hasil dari ${source}`,
      });
    }, 1500);
  };

  const handlePlay = (song: Song) => {
    setCurrentPlaying(song);
    toast({
      title: "Memutar lagu",
      description: `${song.title} - ${song.artist}`,
    });
  };

  const handleSave = (song: Song) => {
    if (playlist.some(p => p.id === song.id)) {
      toast({
        title: "Lagu sudah ada",
        description: "Lagu ini sudah ada di playlist Anda",
        variant: "destructive",
      });
      return;
    }

    setPlaylist(prev => [...prev, song]);
    toast({
      title: "Lagu disimpan",
      description: `${song.title} ditambahkan ke playlist`,
    });
  };

  const handleRemove = (songId: string) => {
    const song = playlist.find(p => p.id === songId);
    setPlaylist(prev => prev.filter(p => p.id !== songId));
    
    if (currentPlaying?.id === songId) {
      setCurrentPlaying(null);
    }
    
    toast({
      title: "Lagu dihapus",
      description: song ? `${song.title} dihapus dari playlist` : "Lagu dihapus dari playlist",
    });
  };

  const handleClosePlayer = () => {
    setCurrentPlaying(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
            Dengarkan Musik Favoritmu
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up">
            Cari dan simpan lagu dari YouTube, Spotify, dan SoundCloud dalam satu tempat
          </p>
        </section>

        {/* Search Form */}
        <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <SearchForm onSearch={handleSearch} isLoading={isSearching} />
        </section>

        {/* Search Results */}
        {(searchResults.length > 0 || isSearching) && (
          <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <SearchResults
              results={searchResults}
              onPlay={handlePlay}
              onSave={handleSave}
              currentPlaying={currentPlaying?.id}
              isLoading={isSearching}
              query={lastQuery}
            />
          </section>
        )}

        {/* Playlist Section */}
        <section className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <PlaylistSection
            playlist={playlist}
            onPlay={handlePlay}
            onRemove={handleRemove}
            currentPlaying={currentPlaying?.id}
          />
        </section>
      </main>

      {/* Player Embed Modal */}
      <PlayerEmbed song={currentPlaying} onClose={handleClosePlayer} />
    </div>
  );
};

export default Home;