'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Search, Check, ChevronsUpDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Post } from '@/sanity/schemaTypes/post';

interface BlogSearchProps {
  posts: Post[];
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [open, setOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Extract unique categories and authors from posts
  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.flatMap((post) => post.categories || []));
    return Array.from(uniqueCategories);
  }, [posts]);

  const authors = useMemo(() => {
    const uniqueAuthors = new Set(posts.map((post) => post.author?.name).filter(Boolean));
    return Array.from(uniqueAuthors);
  }, [posts]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedAuthor('all');
    setOpen(false);
  }, []);

  // Debounced search query update
  const handleSearchChange = useCallback((value: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 150);
  }, []);

  // Create search suggestions based on post titles and excerpts
  const searchSuggestions = useMemo(() => {
    const suggestions = new Set<string>();
    const processedTitles = new Set<string>();
    const processedExcerpts = new Set<string>();

    posts.forEach((post) => {
      // Process title
      if (!processedTitles.has(post.title)) {
        processedTitles.add(post.title);
        // Add individual words
        post.title.split(' ').forEach((word) => {
          if (word.length > 2) {
            suggestions.add(word.toLowerCase());
          }
        });
        // Add full title
        suggestions.add(post.title.toLowerCase());
      }

      // Process excerpt
      if (post.excerpt && !processedExcerpts.has(post.excerpt)) {
        processedExcerpts.add(post.excerpt);
        // Add individual words
        post.excerpt.split(' ').forEach((word) => {
          if (word.length > 2) {
            suggestions.add(word.toLowerCase());
          }
        });
        // Add full excerpt
        suggestions.add(post.excerpt.toLowerCase());
      }
    });

    return Array.from(suggestions);
  }, [posts]);

  // Filter suggestions based on current search query
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();

    // Use a more efficient filtering approach
    const matches = searchSuggestions.filter((suggestion) => suggestion.includes(query));

    // Sort matches
    return matches
      .sort((a, b) => {
        const aStartsWith = a.startsWith(query);
        const bStartsWith = b.startsWith(query);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return a.length - b.length;
      })
      .slice(0, 8); // Reduced to 8 suggestions for better performance
  }, [searchQuery, searchSuggestions]);

  // Filter posts based on search query and selected filters
  const filteredPosts = useMemo(() => {
    if (!searchQuery && selectedCategory === 'all' && selectedAuthor === 'all') {
      return posts;
    }

    const query = searchQuery.toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === 'all' || post.categories?.includes(selectedCategory);

      const matchesAuthor = selectedAuthor === 'all' || post.author?.name === selectedAuthor;

      return matchesSearch && matchesCategory && matchesAuthor;
    });
  }, [posts, searchQuery, selectedCategory, selectedAuthor]);

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'all' || selectedAuthor !== 'all';

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-white dark:bg-[#232b3b] border-indigo-100 dark:border-[#232b3b]"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  {searchQuery || 'Search posts...'}
                </div>
                <div className="flex items-center gap-2">
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery('');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search posts..."
                  value={searchQuery}
                  onValueChange={handleSearchChange}
                  className="h-9"
                />
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {filteredSuggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion}
                      value={suggestion}
                      onSelect={(currentValue) => {
                        setSearchQuery(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          searchQuery === suggestion ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {suggestion}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-[#232b3b] border-indigo-100 dark:border-[#232b3b]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-[#232b3b] border-indigo-100 dark:border-[#232b3b]">
            <SelectValue placeholder="Author" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            {authors.map((author) => (
              <SelectItem key={author} value={author}>
                {author}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredPosts.length} of {posts.length} posts
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Reset filters
          </Button>
        )}
      </div>
    </div>
  );
}
