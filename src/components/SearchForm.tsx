import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Youtube, Music2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SearchFormProps {
  onSearch: (query: string, source: string) => void;
  isLoading?: boolean;
}

const SearchForm = ({ onSearch, isLoading = false }: SearchFormProps) => {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('youtube');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), source);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-youtube" />;
      case 'spotify':
        return <Music2 className="w-4 h-4 text-spotify" />;
      case 'soundcloud':
        return <div className="w-4 h-4 bg-soundcloud rounded-full" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-brand-md">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-6">
              <Input
                type="text"
                placeholder="Cari lagu yang kamu suka..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 text-base border-2 focus:border-primary transition-colors"
              />
            </div>

            {/* Source Selector */}
            <div className="md:col-span-4">
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="h-12 border-2 focus:border-primary">
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(source)}
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-card border-border shadow-brand-lg">
                  <SelectItem value="youtube" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-youtube" />
                      YouTube
                    </div>
                  </SelectItem>
                  <SelectItem value="spotify" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Music2 className="w-4 h-4 text-spotify" />
                      Spotify
                    </div>
                  </SelectItem>
                  <SelectItem value="soundcloud" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-soundcloud rounded-full" />
                      SoundCloud
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <Button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="w-full h-12 bg-gradient-primary hover:opacity-90 text-white font-medium shadow-brand-md hover:shadow-brand-lg transition-all duration-200"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Cari
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;