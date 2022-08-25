import { gql } from "@apollo/client";

export const ADD_POST = gql`
mutation MyMutation(
    $image: String!
    $body: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
){
    insertPost(
      body:$body
      image:$image
      subreddit_id:$subreddit_id
      title:$title
      username:$username
    ){
      body
      id
      image
      subreddit_id
      title
      username
      created_at
    }
}
`
export const ADD_SUBREDDIT = gql`
mutation MyMutation($topic:String!){ 
    insertSubreddit(topic:$topic){
    id
    topic
    created_at
}
}
`

export const ADD_COMMENT = gql`
mutation MyMutation($post_id:ID!,$username:String!,$text:String!){ 
   insertComment(post_id:$post_id,username:$username,text:$text){
    id
    post_id
    text
    username
    created_at
   }
}
`

export const ADD_VOTE = gql`
mutation MyMutation($post_id:ID!,$username:String!,$upvote:Boolean!){ 
   insertVote(post_id:$post_id,username:$username,upvote:$upvote){
      created_at
      id
      post_id
      upvote
      username
   }
}
`

export const DELETE_VOTE = gql`
mutation MyMutation($post_id:ID!){ 
   deleteVote(post_id:$post_id){
    created_at
    id
    post_id
    upvote
    username
   }
}
`