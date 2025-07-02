import { useOutletContext } from 'react-router-dom';
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

const TrendingPage = () => {
  const { onPlay, onSave, currentPlaying } = useOutletContext<OutletContext>();

  // Mock trending data
  const trendingSongs: Song[] = [
    {
      id: 'trend-1',
      title: 'Anti-Hero',
      artist: 'Taylor Swift',
      thumbnail: 'https://i.ytimg.com/vi/b1kbLWvqugk/maxresdefault.jpg',
      source: 'youtube',
      url: 'https://www.youtube.com/watch?v=b1kbLWvqugk',
    },
    {
      id: 'trend-2',
      title: 'As It Was',
      artist: 'Harry Styles',
      thumbnail: 'https://i.ytimg.com/vi/H5v3kku4y6Q/maxresdefault.jpg',
      source: 'spotify',
      url: 'https://open.spotify.com/track/4Dvkj6JhhA12EX05fT7y2e',
    },
    {
      id: 'trend-3',
      title: 'Heat Waves',
      artist: 'Glass Animals',
      thumbnail: 'https://i.ytimg.com/vi/mRD0-GxqHVo/maxresdefault.jpg',
      source: 'soundcloud',
      url: 'https://soundcloud.com/glassanimals/heat-waves',
    },
    {
      id: 'trend-4',
      title: 'Unholy',
      artist: 'Sam Smith ft. Kim Petras',
      thumbnail: 'https://i.ytimg.com/vi/Uq9gPaIzbe8/maxresdefault.jpg',
      source: 'youtube',
      url: 'https://www.youtube.com/watch?v=Uq9gPaIzbe8',
    },
    {
      id: 'trend-5',
      title: 'Flowers',
      artist: 'Miley Cyrus',
      thumbnail: 'https://i.ytimg.com/vi/G7KNmW9a75Y/maxresdefault.jpg',
      source: 'spotify',
      url: 'https://open.spotify.com/track/0yLdNVWF3Srea0uzk55zFn',
    },
    {
      id: 'trend-6',
      title: 'Shakira: Bzrp Music Sessions, Vol. 53',
      artist: 'Bizarrap, Shakira',
      thumbnail: 'https://i.ytimg.com/vi/KCO-SBPTF5E/maxresdefault.jpg',
      source: 'youtube',
      url: 'https://www.youtube.com/watch?v=KCO-SBPTF5E',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          🔥 Lagu Trending
        </h1>
        <p className="text-muted-foreground">
          Lagu-lagu yang sedang populer saat ini
        </p>
      </div>

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
    </div>
  );
};

export default TrendingPage;