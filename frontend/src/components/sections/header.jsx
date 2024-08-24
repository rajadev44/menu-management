import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Link as ReactLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Link from "../ui/Link";
import { Button } from "../ui/button";
import {
  HomeIcon,
  MenuIcon,
  MicIcon,
  Package,
  SearchIcon,
  ShoppingCart
} from "lucide-react";
import DarkModeBtn from "../ui/dark-mode-btn";
import { useEffect, useState, useRef } from "react";

const routes = [
  { to: "/", name: "Home", icon: <HomeIcon className='w-5 h-5' /> },
  { to: "/categories", name: "Categories", icon: <MenuIcon className='w-5 h-5' /> },
  { to: "/items", name: "Items", icon: <Package className='w-5 h-5' /> },
  // { to: "/cart", name: "Cart", icon: <ShoppingBag className='w-5 h-5' /> },
];

const Header = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchParams({ search: value });
    if (!value || value === '') {
      setSearchParams((params) => {
        params.delete('search');
        return params;
      });
    }
  };

  useEffect(() => {
    if ((!search || search === '') && searchParams.get('search')) {
      setSearchParams((params) => {
        params.delete('search');
        return params;
      });
    }
  }, [search, location.pathname,  setSearchParams]);

  const notItemsPath = location.pathname !== '/items';
  
  useEffect(() => {
    if (isListening) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionRef.current = recognition;
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setSearch(interimTranscript || finalTranscript);
        if (finalTranscript) {
          setSearchParams({ search: finalTranscript });
          setIsListening(false);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [isListening, setSearchParams]);

  const handleMicClick = () => {
    setIsListening((prevState) => !prevState);
  };

  return (
    <>
      <header className='flex items-center justify-between px-4 py-3 shadow-sm bg-background md:px-6 md:py-4'>
        <ReactLink
          to='/'
          className='flex items-center invisible gap-2 font-semibold md:visible'
        >
          <div className='object-contain w-12 aspect-square'>
            <img src='/logo.png' alt='logo' />
          </div>
          <span className='font-headings'>MMS </span>
        </ReactLink>
        <nav className='items-center hidden gap-2 md:flex'>
          {routes.map((route, key) => (
            <Link key={key} to={route.to} className='font-headings'>
              {route.name}
            </Link>
          ))}
        </nav>
        <div className='flex items-center gap-2'>
          <div>
            <Button
              variant='ghost'
              onClick={() => { navigate('/cart') }}
              size='icon'
              className='text-primary'
            >
              <ShoppingCart className='w-5 h-5' />
            </Button>
          </div>
          <div className='relative '>
            <SearchIcon className='absolute inset-y-0 left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search menu...'
              value={search}
              onChange={handleSearchChange}
              className='pl-8 pr-8 rounded-md bg-muted text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none'
            />
            <Button
              variant='ghost'
              size='icon'
              className={`absolute right-0 inset-y-0 text-primary ${isListening ? 'bg-gray-200' : ''}`}
              onClick={handleMicClick}
            >
              { <MicIcon className={`w-5 h-5 ${isListening && 'animate-pulse'}`} />}
            </Button>
            {notItemsPath && <ReactLink to='/items' className="absolute inset-0" ></ReactLink>}
          </div>
          <DarkModeBtn />
        </div>
      </header>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='absolute top-4 left-4 md:hidden'
          >
            <MenuIcon className='w-6 h-6' />
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='sm:max-w-xs'>
          <nav className='grid gap-2 text-lg font-medium'>
            <Link to='#' className='flex items-center gap-2'>
              <MenuIcon className='w-6 h-6' />
              <span>MMS</span>
            </Link>
            {routes.map((route, key) => (
              <Link
                key={key}
                to={route.to}
                className='flex items-center gap-2 '
              >
                {route.icon}
                <span>{route.name}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
