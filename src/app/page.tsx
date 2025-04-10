'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import UserNavbar from '@/Components/Navbar';

const queryClient = new QueryClient();

export default function App() {

  const router = useRouter()
      const handleLogout = () => {
          deleteCookie('role')
          router.push('/login')
        }
  return (
    <QueryClientProvider client={queryClient}>
      <UserNavbar />
      <h1 className='text-center mt-24 text-2xl underline'>This is Home Page</h1>
      <div className='flex justify-center gap-2 mt-4'>
      <button onClick={handleLogout} className='bg-blue-500 text-white rounded active:scale-110 p-2'>Back to Login</button>
      <button onClick={handleLogout} className='bg-red-500 text-white rounded active:scale-110 p-2'>Logout</button>
      </div>
    </QueryClientProvider>
  );
}
