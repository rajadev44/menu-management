import { Link } from "react-router-dom";
import useSWR from 'swr';

const Footer = () => {
  return (
    <footer className='p-4 px-4 md:px-6  bg-foreground text-white'>
    <div className=' flex flex-col items-center justify-between gap-6 md:flex-row'>
      <div className='flex items-center gap-2'>
          <div className='object-contain w-12 aspect-square relative flex items-center'>
            <img src='/logo.png' alt='logo' className="mix-blend-multiply " />
            <div className="inset-0 bg-black opacity-50 absolute rounded-full"></div>
          </div>
        <span className='text-sm font-headings'> MMS</span>
      </div>
      <div className='flex flex-col items-center gap-2 md:flex-row md:gap-4'>
        <div className='flex items-center gap-2'>
          <ClockIcon className='w-5 h-5  text-primary' />
          <span className='text-sm'> 11am - 10pm</span>
        </div>
        <div className='flex items-center gap-2'>
          <PhoneIcon className='w-5 h-5  text-primary' />
          <span className='text-sm'>+44 (555) 123-4567</span>
        </div>
        <div className='flex items-center gap-2 text-center text-primary'>
          <Link
            to='#'
          >
            <FacebookIcon className='w-5 h-5' />
          </Link>
          <Link
            to='#'
          >
            <TwitterIcon className='w-5 h-5' />
          </Link>
          <Link
            to='#'
          >
            <InstagramIcon className='w-5 h-5' />
          </Link>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer



// SWR fetcher function
const fetcher = (url) => fetch(url).then((res) => res.json());

export const Footer2 = () => {
  // Fetch timings data
  const { data: timings, error } = useSWR('/api/timings', fetcher);

  // Error handling
  if (error) return <div>Failed to load timings</div>;
  if (!timings) return null;

  return (
    <footer className="bg-black/10 text-muted-foreground px-4 py-8 mt-5 md:mt-8 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <p>
            MMS is a family-owned establishment serving delicious meals made with fresh, high-quality
            ingredients.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Business Hours</h3>
          <ul>
  {timings.map((timing) => (
    <li key={timing.id} className="flex justify-between">
      <span className="w-1/3">{timing.day}:</span>
      <span className="w-2/3"> {timing.isOutOfService ? '(Out of Service)' : timing.hours}</span>
    </li>
  ))}
</ul>

        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <FacebookIcon className="w-6 h-6 text-primary" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <TwitterIcon className="w-6 h-6 text-primary" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <InstagramIcon className="w-6 h-6 text-primary" />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>
            123 Street, London, UK
            <br />
            Phone: +44 (744) 7890
            <br />
            Email: info@restaurant.com
          </p>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">Copyright &copy; 2024 Restaurant. All rights reserved.</div>
    </footer>
  );
};




function ClockIcon(props) {
    return (
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='12' cy='12' r='10' />
        <polyline points='12 6 12 12 16 14' />
      </svg>
    );
  }
  
  function FacebookIcon(props) {
    return (
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
      </svg>
    );
  }
  
  
  function InstagramIcon(props) {
    return (
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
        <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
        <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
      </svg>
    );
  }
  
  
  function PhoneIcon(props) {
    return (
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
      </svg>
    );
  }
  
  function TwitterIcon(props) {
    return (
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
      </svg>
    );
  }