import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query MyQuery($topic:String!){
        getSubredditListByTopic (topic:$topic){
            id
            topic
            created_at
        }
    }
`

export const GET_SUBREDDITS_WITH_LIMIT = gql`
    query MyQuery($limit:Int!){
        getSubredditListLimit (limit:$limit){
            id
            topic
            created_at
        }
    }
`
export const GET_ALL_VOTES_BY_POST_ID = gql`
    query MyQuery($id:ID!){
      getVoteUsingPost_id(id:$id){
        created_at
        id
        post_id
        upvote
        username
        }
    }
`
export const GET_ALL_POSTS = gql`
    query MyQuery{
        getPostList {
    id
    subreddit_id
    body
    created_at
    image
    title
    username
    subreddit {
      created_at
      id
      topic
    }
    voteList {
      created_at
      id
      post_id
      upvote
      username
    }
    commentList {
      id
      post_id
      text
      username
      created_at
    }
  }
    }
`







export const GET_ALL_POSTS_BY_TOPIC = gql`
    query MyQuery($topic:String!){
        getPostListByTopic(topic:$topic) {
    id
    subreddit_id
    body
    created_at
    image
    title
    username
    subreddit {
      created_at
      id
      topic
    }
    voteList {
      created_at
      id
      post_id
      upvote
      username
    }
    commentList {
      id
      post_id
      text
      username
      created_at
    }
  }
    }
`



export const GET_POST = gql`
    query MyQuery($id:ID!){
    getPost(id:$id) {
      body
      created_at
      id
      image
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      subreddit_id
      title
      username
      voteList {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`














export const GET_POST_BY_POST_ID = gql`
    query MyQuery($id:ID!){
    getPostByPostId(id:$id) {
      body
      created_at
      id
      image
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      subreddit_id
      title
      username
      voteList {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`











