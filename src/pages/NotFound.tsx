import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-4'>
      <div className='text-center max-w-md'>
        <h1 className='text-6xl font-extrabold text-yellow-500 mb-4'>404</h1>
        <p className='text-xl text-neutral-800 mb-6'>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to='/'
          className='inline-block px-5 py-3 rounded-full bg-yellow-400 text-neutral-900 font-medium hover:bg-yellow-500 transition'
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
