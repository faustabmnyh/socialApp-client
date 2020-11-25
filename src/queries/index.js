const { gql } = require("@apollo/client");

const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const REGISTER_USER = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const CREATE_POST = gql`
  mutation($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        createdAt
        body
        username
      }
      commentCount
    }
  }
`;

const LIKE_POST = gql`
  mutation($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

const FETCH_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      likeCount
      createdAt
      likes {
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

const DELETE_POST = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      username
      commentCount
      comments {
        body
        id
        username
        createdAt
      }
      likeCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export {
  FETCH_POSTS,
  REGISTER_USER,
  LOGIN_USER,
  CREATE_POST,
  LIKE_POST,
  FETCH_POST,
  DELETE_POST,
  DELETE_COMMENT,
  CREATE_COMMENT,
};
