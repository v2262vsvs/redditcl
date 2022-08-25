import { ArrowDownIcon, ArrowUpIcon, BookmarkAltIcon, ChatAltIcon, GiftIcon, ShareIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import Image from 'next/image'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { Jelly } from '@uiball/loaders'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE, DELETE_VOTE } from '../graphql/mutations'
import { GET_ALL_VOTES_BY_POST_ID } from '../graphql/queries'
type Props= {
    post: Post
}

function Post({post}:Props) {
    if (!post){
        return(
        <div className='w-full items-center flex justify-center p-10 text-xl '>
            <Jelly size={35} color="#231F20" />
        </div>
        )
    }
    const {data:session} = useSession()
    const [vote, setVote] = useState<boolean | undefined>()
    const {data} = useQuery(GET_ALL_VOTES_BY_POST_ID,{
        variables:{
            id: post?.id
        }
    })
    const [addVote] = useMutation(ADD_VOTE,{
        refetchQueries:[GET_ALL_VOTES_BY_POST_ID,'getVoteUsingPost_id']
    })
    
    const upVote = async(isUpvote:boolean)=>{
         if(!session){
             toast("You will need to sign in yo Vote!")
             return
         }
         //if(vote && isUpvote)return;
         //if( vote === false && isUpvote) return;
         //if (vote === false || vote ===true)return;

           {/* console.log('deleting vote',!isUpvote)
            await deleteVote({
            variables:{
                post_id:post.id,
            }
            })
        */}
         console.log('voting',isUpvote)
         await addVote({
             variables:{
                 post_id:post.id,
                 username:session?.user?.name,
                 upvote : isUpvote
             }
         })
        
    }

    const displayVotes = (data:any)=>{
        const votes: Vote[] = data?.getVoteUsingPost_id
        if (votes!= undefined){
        if (votes.length === 0 )return 0;
        const displayNumber = votes?.reduce((total,vote)=> (vote.upvote ? (total +=1) : (total -=1)),0)
        if(displayNumber === 0){
            return votes[0]?.upvote ? 1 : -1
        }
        return displayNumber
        } else {
            return 0
        }
    }

    

    useEffect(() => {
        const votes: Vote[] = data?.getVoteUsingPost_id;
        const vote2:boolean | undefined =  votes?.find(vote=>vote.username == session?.user?.name)?.upvote
        console.log(vote2)
        setVote(vote2)
    }, [data])

  return (
  <div>
    <Link href={`/post/${post.id}`}>
    <div className='  flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600 '>
        <div className='flex flex-col items-center justify-start  space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
            <ArrowUpIcon onClick={()=>upVote(true)} className={`voteButtons hover:text-blue-400 ${vote && 'text-blue-400 '}`} />
            <p className='text-xs font-bold text-black '>{displayVotes(data)}</p>
            <ArrowDownIcon onClick={()=>upVote(false)} className={`voteButtons hover:text-red-400 ${vote === false && 'text-red-400 '}`}/>
            

        </div>

        <div className='p-3 pb-1 '>
            <div className='flex items-center space-x-2 '>
                <Avatar seed={post.subreddit.topic}/>

                <p className='text-xs text-gray-400'>
                        <Link href={`/subreddit/${post.subreddit.topic}`}><span className='font-bold text-black hover:text-blue-400 hover:underline'>r/{post.subreddit.topic} </span></Link>{' '} * Posted by u/{post.username} <TimeAgo date={post.created_at} /></p>
            </div>
            <div className='py-4 '>
                <h2 className='text-xl font-semibold'>{post.title}</h2>
                <p className='mt-2 text-sm font-light '>{post.body}</p>
            </div>
            {post.image && (
                <div className=''>
                <Image
                    src={post.image}
                    alt=""
                    layout="intrinsic"
                    width={500}
                    height={400}
                />
               </div>
            )}
            

            <div className='flex space-x-4 text-gray-400'>
                <div className='postButtons '>
                    <ChatAltIcon className='h-6 w-6 '/>
                    <p className=''>{post.commentList.length} Comments</p>
                </div>
                <div className='postButtons'>
                    <GiftIcon className='h-6 w-6'/>
                    <p className='hidden md:inline'> Award</p>
                </div>
                <div className='postButtons'>
                    <ShareIcon className='h-6 w-6'/>
                    <p className='hidden md:inline'> Share</p>
                </div>
                <div className='postButtons'>
                    <BookmarkAltIcon className='h-6 w-6'/>
                    <p className='hidden md:inline'> Save</p>
                </div>
                <div className='postButtons'>
                    <DotsHorizontalIcon className='h-6 w-6'/>
                    <p className=''> </p>
                </div>
            </div>
        </div>

        <div>

        </div>
    </div>
    </Link>
  </div>
  )
}

export default Post