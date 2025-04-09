import { ShieldOff } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className='place-items-center h-screen place-content-center'>
      <section className='bg-slate-50 p-10 rounded-lg shadow-md place-items-center space-y-6'>
        <div className='place-items-center place-content-center rounded-full bg-red-100 text-sm text-red-700 size-24' role='alert'>
          <ShieldOff size={40} />
        </div>
        <div className='text-center flex flex-col gap-2'>
          <h1 className='text-2xl font-bold m-0'>Access Denied</h1>
          <p className='text-gray-600 m-0'>You do not have permission to access this page.</p>
        </div>
        <Link href="/" className='bg-blue-600 py-3 px-4 rounded text-white'>Home Page</Link>
      </section>
    </main>
  )
}

export default page;