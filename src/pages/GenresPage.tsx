import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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

const GenresPage = () => {
  const { onPlay, onSave, currentPlaying } = useOutletContext<OutletContext>();
  const [selectedGenre, setSelectedGenre] = useState('pop');

  const genres = [
    { id: 'pop', name: 'Pop', emoji: '🎵' },
    { id: 'rock', name: 'Rock', emoji: '🎸' },
    { id: 'hiphop', name: 'Hip Hop', emoji: '🎤' },
    { id: 'electronic', name: 'Electronic', emoji: '🎛️' },
    { id: 'jazz', name: 'Jazz', emoji: '🎺' },
    { id: 'classical', name: 'Classical', emoji: '🎼' },
  ];

  // Mock genre songs data
  const genreSongs: Record<string, Song[]> = {
    pop: [
      {
        id: 'pop-1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        thumbnail: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/maxresdefault.jpg',
        source: 'youtube',
        url: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
      },
      {
        id: 'pop-2',
        title: 'Levitating',
        artist: 'Dua Lipa',
        thumbnail: 'https://i.ytimg.com/vi/TUVcZfQe-Kw/maxresdefault.jpg',
        source: 'spotify',
        url: 'https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9',
      },
    ],
    rock: [
      {
        id: 'rock-1',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        thumbnail: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg',
        source: 'youtube',
        url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
      },
      {
        id: 'rock-2',
        title: 'Thunderstruck',
        artist: 'AC/DC',
        thumbnail: 'https://i.ytimg.com/vi/v2AC41dglnM/maxresdefault.jpg',
        source: 'spotify',
        url: 'https://open.spotify.com/track/57bgtoPSgt236HzfBOd8kj',
      },
    ],
    hiphop: [
      {
        id: 'hiphop-1',
        title: 'God\'s Plan',
        artist: 'Drake',
        thumbnail: 'https://i.ytimg.com/vi/xpVfcZ0ZcFM/maxresdefault.jpg',
        source: 'youtube',
        url: 'https://www.youtube.com/watch?v=xpVfcZ0ZcFM',
      },
      {
        id: 'hiphop-2',
        title: 'HUMBLE.',
        artist: 'Kendrick Lamar',
        thumbnail: 'https://i.ytimg.com/vi/tvTRZJ-4EyI/maxresdefault.jpg',
        source: 'soundcloud',
        url: 'https://soundcloud.com/kendrick-lamar-music/humble',
      },
    ],
    electronic: [
      {
        id: 'electronic-1',
        title: 'Titanium',
        artist: 'David Guetta ft. Sia',
        thumbnail: 'https://i.ytimg.com/vi/JRfuAukYTKg/maxresdefault.jpg',
        source: 'youtube',
        url: 'https://www.youtube.com/watch?v=JRfuAukYTKg',
      },
    ],
    jazz: [
      {
        id: 'jazz-1',
        title: 'Take Five',
        artist: 'Dave Brubeck',
        thumbnail: 'https://i.ytimg.com/vi/vmDDOFXSgAs/maxresdefault.jpg',
        source: 'spotify',
        url: 'https://open.spotify.com/track/1YQWosTIljIvxAgHWTp7KP',
      },
    ],
    classical: [
      {
        id: 'classical-1',
        title: 'Eine kleine Nachtmusik',
        artist: 'Mozart',
        thumbnail: 'https://i.ytimg.com/vi/hHaVhNe6rN4/maxresdefault.jpg',
        source: 'youtube',
        url: 'https://www.youtube.com/watch?v=hHaVhNe6rN4',
      },
    ],
  };

  const currentSongs = genreSongs[selectedGenre] || [];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          🎭 Genre Populer
        </h1>
        <p className="text-muted-foreground">
          Jelajahi musik berdasarkan genre favoritmu
        </p>
      </div>

      {/* Genre Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={selectedGenre === genre.id ? "default" : "outline"}
            onClick={() => setSelectedGenre(genre.id)}
            className={`${
              selectedGenre === genre.id 
                ? 'bg-gradient-primary text-white' 
                : 'hover:bg-accent/50'
            } transition-all duration-200`}
          >
            <span className="mr-2">{genre.emoji}</span>
            {genre.name}
          </Button>
        ))}
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentSongs.map((song, index) => (
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

      {currentSongs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">Belum ada lagu untuk genre ini</p>
          <p className="text-sm">Genre lainnya segera hadir!</p>
        </div>
      )}
    </div>
  );
};

export default GenresPage;