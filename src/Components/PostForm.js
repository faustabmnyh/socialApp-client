import { useMutation } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { CREATE_POST, FETCH_POSTS } from "../queries";
import { useForm } from "../utils/hooks";

const PostForm = () => {
  const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
    body: "",
  });
  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      // acess the cache, fetch the post from the client data that we store in the cache (Setup in here is for maybe like a realtime but we get the data from the cache)
      const data = proxy.readQuery({
        query: FETCH_POSTS,
      });
      // presist the data
      proxy.writeQuery({
        query: FETCH_POSTS,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    onError(err) {
      return err;
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="postForm">
        <h2 className="postForm__title">Create Post</h2>
        <TextField
          placeholder="Hi Boi"
          onChange={handleChange("body")}
          value={values.body}
          variant="outlined"
          className="postForm__form"
          error={error ? true : false}
        />
        <Button variant="contained" color="secondary" className="postForm__btn">
          Submit
        </Button>
      </form>
      {error && (
        <div>
          <Alert severity="error">{error.graphQLErrors[0].message}</Alert>
        </div>
      )}
    </>
  );
};

export default PostForm;
