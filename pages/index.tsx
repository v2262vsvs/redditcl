
import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Avatar from '../components/Avatar'
import Feed from '../components/Feed'
import Header from '../components/Header'
import PostBox from '../components/PostBox'
import SubredditRow from '../components/SubredditRow'
import { GET_ALL_VOTES_BY_POST_ID, GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'


const Home: NextPage = () => {
  const {data} = useQuery(GET_SUBREDDITS_WITH_LIMIT,{
    variables:{
      limit : 10
    }
  })
  const subreddits : Subreddit[] = data?.getSubredditListLimit

  return (
    <div className="max-w-5xl mx-auto">

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Posts */}
      <PostBox/>
      <div className='flex mt-5'><Feed/>
        <div className='sticky top-36 mx-5  hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline'>
          <p className='text-md mb-1 p-4 pb-3 font-bold'>Top Communities</p>
          <div>
            {/* list sub */}
            {subreddits && subreddits?.map((subreddit,i) => (
              <div key={i}>
                <SubredditRow key={subreddit.id} id={subreddit.id} topic={subreddit.topic} created_at={subreddit.created_at}/>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home
