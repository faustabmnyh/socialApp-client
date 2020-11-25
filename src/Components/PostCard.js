import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ForumIcon from "@material-ui/icons/Forum";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeletePost from "./DeletePost";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 390,
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPop = open ? "simple-popover" : undefined;

  const handleCommentPost = () => {
    console.log("comment");
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src="/images/mencoba.jpg" className={classes.avatar}></Avatar>
        }
        action={
          user &&
          user.username === username && (
            <IconButton aria-label="settings">
              <MoreVertIcon aria-describedby={idPop} onClick={handleClick} />
            </IconButton>
          )
        }
        title={username}
        subheader={
          <Link className="card__link" color="default" to={`/posts/${id}`}>
            {moment(createdAt).fromNow()}
          </Link>
        }
      />
      <DeletePost
        postId={id}
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
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LikeButton user={user} post={{ likes, likeCount, id }} />
        <Link to={`/posts/${id}`} style={{ textDecoration: "none" }}>
          <Button
            size="large"
            startIcon={<ForumIcon />}
            onClick={handleCommentPost}
          >
            {commentCount}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PostCard;
