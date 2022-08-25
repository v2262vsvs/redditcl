import { useSession } from 'next-auth/react'
import React from 'react'
import Avatar from './Avatar'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';
import client from "../apolo-client"
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import toast from 'react-hot-toast';

//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

type FormData = {
    postTitle:string,
    postBody:string,
    postImage:string,
    subreddit:string,
}
type Props ={
    subreddit?:string
}
//{postTitle,postBody,postImage,subreddit}:FormData
function PostBox({subreddit}:Props) {
    const {data:session} = useSession()
    const [addPost] = useMutation(ADD_POST,{
        refetchQueries:[GET_ALL_POSTS,'getPostList']
    })
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [imageBoxState,setImageBoxState] =  useState<boolean>(false)
    const[addSubreddit] = useMutation(ADD_SUBREDDIT)



    const onSubmit = handleSubmit(async (formData)=>{
        const notification = toast.loading('Creating new post...')
        console.log(formData)
        try { 
            const {data : {getSubredditListByTopic}} = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables:{
                    topic: subreddit || formData.subreddit
                }
            })
            console.log(getSubredditListByTopic)
            const subredditExists = getSubredditListByTopic.length > 0 
            if (!subredditExists){
                console.log('creating a new subreddit')
                const {data:{insertSubreddit:newSubreddit}} = await addSubreddit({
                    variables:{
                        topic: formData.subreddit
                    },
                })

                console.log('creating the post ', formData)
                const image = formData.postImage || ''
                const {data:{insertPost:newPost}}=await addPost({
                    variables:{
                        body:formData.postBody,
                        image:image,
                        subreddit_id:newSubreddit.id,
                        title:formData.postTitle,
                        username: session?.user?.name
                    },
                })
                console.log(newPost, 'new post added')

            } else {
                console.log('using existing subreddit',getSubredditListByTopic)

                console.log('creating the post ', formData)
                const image = formData.postImage || ''
                const {data:{insertPost:newPost}}=await addPost({
                    variables:{
                        body:formData.postBody,
                        image:image,
                        subreddit_id:getSubredditListByTopic[0].id,
                        title:formData.postTitle,
                        username: session?.user?.name
                    },
                })
                console.log(newPost, 'new post added')
            }
            toast.success('new Post Created!',{id:notification})
        }catch(error){toast.error(`dam it ${error}`,{id:notification})}

    })
  return (
      <>
        <form onSubmit={onSubmit} className='sticky top-16 z-50 bg-white border rounded-ms border-gray-300 p-2 '>
            <div className='flex items-center space-x-3'>
                {/* Avatar */}
                <Avatar/>
                <input {...register('postTitle',{required:true})} disabled={!session} className="outline-none cursor-pointer p-2 pl-5 bg-gray-50 rounded-md flex-1" type="text" placeholder={session? subreddit? `Create a post in r/${subreddit}`:'Create a post by entering a title' : 'Sing in to post'}/>
                <PhotographIcon onClick={()=>setImageBoxState(!imageBoxState)} className={`h-6 text-gray-400 cursor-pointer ${imageBoxState && 'text-blue-300'}`}/>
                <LinkIcon className={`h-6 cursor-pointer text-gray-400`}/>
            </div>
            {!!watch('postTitle') &&(
                <div className='flex flex-col py-2'>
                     
                    <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>Body</p>
                        <input className='m-2 flex-1 bg-blue-50 p-2 outline-none' {...register('postBody')} type="text" placeholder="Text (optional)"></input>
                    </div>
                    
                    {!subreddit && (
                        <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>Subreddit</p>
                        <input className='m-2 flex-1 bg-blue-50 p-2 outline-none' {...register('subreddit',{required:true})} type="text" placeholder="i.e. reactjs"></input>
                        </div>
                    )}

                    {imageBoxState &&(
                         <div className='flex items-center px-2'>
                            <p className='min-w-[90px]'>Image URL</p>
                            <input className='m-2 flex-1 bg-blue-50 p-2 outline-none' {...register('postImage')} type="text" placeholder="Optional"></input>
                        </div>
                    )}

                    {Object.keys(errors).length > 0 &&(
                        <div className='space-y-2 p-2 text-red-500'>
                            {errors.postTitle?.type === 'required' &&(
                                <p>–  A Post Title required</p>
                            )}
                            {errors.subreddit?.type === 'required' &&(
                                <p>– A subreddit required</p>
                            )}
                        </div>
                        
                    )}

                    {!!watch('postTitle')&& <button type="submit" className='w-full rounded-full p-2 text-white bg-blue-400'>Create Post</button>}
                </div>
            )}

        </form>
    </>
  )
}

export default PostBox