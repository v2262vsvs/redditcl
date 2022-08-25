import Image from 'next/image'
import React from 'react'
import { BeakerIcon, ChevronDownIcon, HomeIcon } from '@heroicons/react/solid'
import { StarIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'


function Header() {
    const {data:session} = useSession()

    const singin = async ()=>{
        signIn()
    }
    const singout = async ()=>{
        signOut()
    }
  return (
    <div className='flex sticky top-0 z-50 bg-white px-4 py-1 shadow-md items-center'>
        <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer '>
            <Link href="/">
                <Image objectFit="contain"  src="https://links.papareact.com/fqy" layout="fill" />
            </Link>
        </div>
        <div className='flex items-center mx-7 xl:min-w-[300px]'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <p className='ml-2 flex-1 hidden lg:inline'>Home</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </div>
        <form className='flex flex-1 items-center space-x-2 rounded-sm border border-gray-200  bg-gray-100 px-3 py-1'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
        <input className='bg-transparent flex-1 outline-none' type="text" placeholder='Search Reddit'/>
        <button type="submit" hidden={true}/>
        </form>

        <div className=' space-x-2 items-center mx-5 hidden lg:inline-flex'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-6 lg:w-9 cursor-pointer rounded-sm lg:p-1 lg:hover:bg-gray-100 text-gray-500 hover:scale-105 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-6 lg:w-9 cursor-pointer rounded-sm lg:p-1 lg:hover:bg-gray-100 text-gray-500 hover:scale-105 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-6 lg:w-9 cursor-pointer rounded-sm lg:p-1 lg:hover:bg-gray-100 text-gray-500 hover:scale-105 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <hr className='h-10 obrder border-gray-100'/>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-6 lg:w-9 cursor-pointer rounded-sm lg:p-1 lg:hover:bg-gray-100 text-gray-500 hover:scale-105 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-6 lg:w-9 cursor-pointer rounded-sm lg:p-1 lg:hover:bg-gray-100 text-gray-500 hover:scale-105 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-6 lg:w-9 cursor-pointer rounded-sm lg:p-1 lg:hover:bg-gray-100 text-gray-500 hover:scale-105 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-6 lg:w-9 cursor-pointer rounded-sm lg:p-1 lg:hover:bg-gray-100 text-gray-500 hover:scale-105 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        </div>
        <div className='ml-5 flex items-center lg:hidden'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-6 lg:w-9 cursor-pointer rounded-sm lg:p-1 lg:hover:bg-gray-100  text-gray-500 hover:scale-105 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        </div>

        {/* sing in btn */}
        {session? (
            <div>
                <div onClick={()=> singout()} className='hidden lg:flex items-center space-x-2 p-2 cursor-pointer border border-gray-100' >
                    <div className='relative h-5 w-5 flex-shrink-0'>
                        <Image objectFit='contain' src="https://links.papareact.com/23l" layout="fill" className='' alt=""/>
                    </div>
                    <div className='felx flex-1 text-sm'>
                    <p className='truncate'>{session?.user?.name}</p>
                    <p className='text-gray-400'>Sing Out</p>
                    </div>

                    <ChevronDownIcon className='w-5 h-5 flex-shrink-0  text-gray-400'/>
                </div>
            </div>
        ):(
            <div>
                <div onClick={()=> signIn()} className='hidden lg:flex items-center space-x-2 p-2 cursor-pointer border border-gray-100' >
                    <div className='relative h-5 w-5 flex-shrink-0'>
                        <Image objectFit='contain' src="https://links.papareact.com/23l" layout="fill" className='' alt=""/>
                    </div>
                    <p className='text-gray-400'>Sing In</p>
                </div>
            </div>
        )}
         
        
       
    </div>
  )
}

export default Header