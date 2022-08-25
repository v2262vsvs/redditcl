import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post'
import { GET_POST, GET_POST_BY_POST_ID } from '../../graphql/queries'
import {SubmitHandler,useForm} from "react-hook-form"
import toast from 'react-hot-toast';
import { ADD_COMMENT } from '../../graphql/mutations'
import Avatar from '../../components/Avatar'
import TimeAgo from 'react-timeago'
type FormData ={
    comment?:string
}
function PostPage() {
    const router = useRouter()
    const {data:session} = useSession()
    const [addComment] = useMutation(ADD_COMMENT,{
        refetchQueries : [GET_POST,'getPost'],
    })
     
    const {data} = useQuery(GET_POST,{
        variables:{
            id: router.query.postId
        }
    })
    const post:Post = data?.getPost;
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = handleSubmit(async (data)=>{
        const notification = toast.loading('Posting your comment...')
        console.log(data)
        await addComment({
            variables:{
                post_id:router.query.postId,
                text:data.comment,
                username: session?.user?.name,
            },
        })

        setValue('comment','')
        toast.success('Comment Successfully Posted!',{
            id:notification, 
        })

    })
    console.log(data)


  return (
    <div className='mx-auto my-7 max-w-5xl'>
        <Post post={post}/>
        <div className='-mt-1  rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16'>
            <p className='text-sm '>Comment as <span className='text-red-500 '>{session?.user?.name}</span></p>
        <form onSubmit={onSubmit} className='flex flex-col space-y-2 -mt-1'>
            <textarea {...register('comment',{required:true})} disabled={!session} className='h-24 rounded-ms border border-gray-200 p-2 pl-4 otline-none disabled:bg-gray-50 ' placeholder={session ?'What are your thoughts?' :"Please sign in to comment"} />
            <button type="submit" className='rounded-md cursor-pointer hover:bg-red-600 bg-red-500 p-3 font-semibold text-white disabled:text-gray-200'>Comment</button>
        </form>
        </div>

        
        <div className='-my-5 rounded-b-md border border-t-0 border-gray-400 bg-white py-5 px-10 '>
        <div className='border-t-2'></div>
        {post?.commentList.map((comment)=>(
                <div className='relative flex items-center space-x-2 space-y-5' key={comment.id}>
                    <hr className=' border border-gray-7 z-0 left-7 absolute top-10 h-16'/>
                    <div className='z-50'>
                    
                        <Avatar seed={comment.username}/>
                    </div>
                    <div className='flex flex-col '>
                        <p className='py-2 text-xs text-gray-400'>
                            <span className='font-semibold text-gray-600'>{comment.username}</span> *{' '}
                            <TimeAgo date={comment.created_at} />
                        </p>
                        <p>{comment.text}</p>
                    </div>
                </div>
        ))}
        </div>

    </div>
  )
}

export default PostPage