import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { SearchIcon } from 'lucide-react';
import Loader from '../ui/loader';
import { Link } from 'react-router-dom';

// SWR fetcher function
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserCategorySection() {
  // Fetch categories data
  const { data: menuCategories, error, isLoading } = useSWR('/api/categories', fetcher);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    if (!menuCategories) return [];

    return menuCategories.filter((category) => {
      const matchesSearchTerm = category.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearchTerm ;
    });
  }, [searchTerm, menuCategories]);


  if(isLoading) return  isLoading && <div className='w-full flex justify-center items-center my-2'><Loader className='w-20 h-20'/></div>
  if(error) return  isLoading && <div className='w-full flex justify-center items-center my-2 text-destructive'><p>Failed to load categories</p></div>


  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Menu Categories</h1>
        <p className="text-gray-500">Explore our delicious menu offerings.</p>
      </div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
         <Link to={`/items?category=${category.name}`} key={category.id}>
          <Card  className="overflow-hidden shadow-lg rounded-lg">
            <img
              src={category.image}
              alt={category.name}
              width={400}
              height={225}
              className="w-full h-48 object-cover"
              />
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-2">{category.name}</h3>
              <p className="text-gray-500">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
        ))}
      </div>
    </div>
  );
}
