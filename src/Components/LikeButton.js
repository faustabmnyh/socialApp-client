import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../queries";
import { Link } from "react-router-dom";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);
  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
    onError(err) {
      return err;
    },
  });

  useEffect(() => {
    if (user && likes?.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  //   const likeButton = user ? (
  //     liked ? (
  //       <FavoriteIcon />
  //     ) : (
  //       <FavoriteBorderOutlinedIcon />
  //     )
  //   ) : (
  //     <Link to="/login" style={{ textDecoration: "none" }}>
  //       <FavoriteBorderOutlinedIcon color="secondary" />
  //     </Link>
  //   );

  return (
    <>
      {user ? (
        liked ? (
          <Button
            size="large"
            color="secondary"
            startIcon={<FavoriteIcon />}
            onClick={likePost}
          >
            {likeCount}
          </Button>
        ) : (
          <Button
            size="large"
            color="secondary"
            startIcon={<FavoriteBorderOutlinedIcon />}
            onClick={likePost}
          >
            {likeCount}
          </Button>
        )
      ) : (
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            size="large"
            color="secondary"
            startIcon={<FavoriteBorderOutlinedIcon />}
            onClick={likePost}
          >
            {likeCount}
          </Button>
        </Link>
      )}
      {/* <Button
        size="large"
        color="secondary"
        startIcon={likeButton}
        onClick={likePost}
      >
        {likeCount}
      </Button> */}
    </>
  );
};

export default LikeButton;
