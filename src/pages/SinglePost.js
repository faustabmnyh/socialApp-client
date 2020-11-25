import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { CREATE_COMMENT, FETCH_POST } from "../queries";
import moment from "moment";
import LikeButton from "../Components/LikeButton";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import ForumIcon from "@material-ui/icons/Forum";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeletePost from "../Components/DeletePost";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1),
    fontSize: 14,
    background: "#F50057",
    color: "white",
    cursor: "pointer",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginRight: "10px",
  },
}));

const SinglePost = () => {
  let { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  // const commentInputRef = useRef(null);
  const { data: { getPost } = {} } = useQuery(FETCH_POST, {
    variables: { postId: id },
  });

  const [comment, setComment] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setComment("");
      // commentInputRef.current.blur();
    },
    variables: {
      postId: id,
      body: comment,
    },
  });

  const deletePostCallback = () => {
    history.push("/");
  };

  const { user } = useContext(AuthContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPop = open ? "simple-popover" : undefined;

  let postMarkup;
  if (!getPost) {
    postMarkup = <CircularProgress />;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <div className="singlePost">
        <div className="singlePost__user">
          <Grid md={3}>
            <CardMedia
              className={classes.media}
              image="/images/mencoba.jpg"
              title="Paella dish"
            />
          </Grid>
          <Grid md>
            <Card>
              <CardHeader
                title={username}
                action={
                  user &&
                  user.username === username && (
                    <IconButton aria-label="settings">
                      <MoreVertIcon
                        aria-describedby={idPop}
                        onClick={handleClick}
                      />
                    </IconButton>
                  )
                }
                subheader={<p color="default">{moment(createdAt).fromNow()}</p>}
              />
              <DeletePost
                postId={id}
                id={idPop}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                callback={deletePostCallback}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {body}
                </Typography>
              </CardContent>
              <hr />
              <CardActions disableSpacing>
                <LikeButton user={user} post={{ likes, likeCount, id }} />
                <Button
                  size="large"
                  startIcon={<ForumIcon />}
                  onClick={() => console.log("hey you comment this post")}
                >
                  {commentCount}
                </Button>
              </CardActions>
            </Card>
            {user && (
              <Card className="singlePost__createComment">
                <p>Comment</p>
                <form action="">
                  <div className="singlePost__createForm">
                    <TextField
                      variant="outlined"
                      className="singlePost__input"
                      type="text"
                      placeholder="Comment Here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      // ref={commentInputRef}
                    />
                    <Button
                      type="submit"
                      disabled={comment.trim() === ""}
                      onClick={createComment}
                      variant="contained"
                      color="primary"
                      className="singlePost__btn"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Card>
            )}
            {comments.map((comment) => {
              return (
                <Card key={comment.id} className="singlePost__commentCard">
                  <CardHeader
                    title={comment.username}
                    action={
                      user &&
                      user.username === comment.username && (
                        <IconButton aria-label="settings">
                          <MoreVertIcon
                            aria-describedby={idPop}
                            onClick={handleClick}
                          />
                        </IconButton>
                      )
                    }
                    subheader={
                      <p color="default">
                        {moment(comment.createdAt).fromNow()}
                      </p>
                    }
                  />
                  <DeletePost
                    postId={id}
                    commentId={comment.id}
                    id={idPop}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {comment.body}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }

  return postMarkup;
};

export default SinglePost;
