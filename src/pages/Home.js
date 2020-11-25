import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import PostCard from "../Components/PostCard";
import PostForm from "../Components/PostForm";
import { AuthContext } from "../context/auth";
import CircularProgress from "@material-ui/core/CircularProgress";

import { FETCH_POSTS } from "../queries";

const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS);

  const { user } = useContext(AuthContext);

  return (
    <Grid container sm={12} direction="column">
      <Grid>
        <h3 className="home__title">Recent Posts</h3>
      </Grid>
      <Grid container sm={12}>
        {user && (
          <Grid container md={4}>
            <PostForm />
          </Grid>
        )}
        {loading ? (
          <CircularProgress />
        ) : (
          posts &&
          posts.map((post) => (
            <Grid container md={4} key={post.id}>
              <PostCard post={post} />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
