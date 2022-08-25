declare module 'react-timeago';
type Comments = {
    created_at: string
    id: number
    post_id: number
    text: string
    username: string
  }
  
  type Post = {
    body: string
    commentList: Comments[]
    created_at: string
    id: number
    image: string
    subreddit: Subreddit
    subreddit_id: number
    title: string
    username: string
    voteList: Vote[]
  }
  
  type Subreddit = {
    created_at: string
    id: number
    topic: string
  }
  
  type Vote = {
    created_at: string
    id: number   
    post_id: number
    upvote: boolean
    username: string
  }