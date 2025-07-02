import { useOutletContext } from 'react-router-dom';
import { Music } from 'lucide-react';
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

const PlaylistPage = () => {
  const { playlist, onPlay, currentPlaying } = useOutletContext<OutletContext>();

  if (playlist.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center text-muted-foreground">
          <Music className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Playlist masih kosong</h2>
          <p className="text-lg">Cari dan simpan lagu favoritmu untuk mulai membangun playlist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          🎵 Playlist Saya
        </h1>
        <p className="text-muted-foreground">
          {playlist.length} lagu tersimpan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlist.map((song, index) => (
          <div
            key={song.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <SongCard
              song={song}
              onPlay={onPlay}
              showRemove={true}
              isPlaying={currentPlaying === song.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;