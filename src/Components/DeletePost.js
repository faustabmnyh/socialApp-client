import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Paper,
  Popover,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { DELETE_COMMENT, DELETE_POST, FETCH_POSTS } from "../queries";
import Draggable from "react-draggable";


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1),
    fontSize: 14,
    background: "#F50057",
    color: "white",
    cursor: "pointer",
  },
}));

const DeletePost = ({ callback, postId, commentId, ...restProps }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      //  we will have a confirm module, because we want this is not immediate delete if the user by mistake click this delete button

      //   if the post been deleted successfuly and we want close the module
      setConfirmOpen(false);
      // presist the data
      if (!commentId) {
        // remove post from cache
        const data = proxy.readQuery({
          query: FETCH_POSTS,
        });
        proxy.writeQuery({
          query: FETCH_POSTS,
          data: {
            getPosts: data.getPosts.filter((post) => post.id !== postId),
          },
        });
      }

      if (callback) {
        callback();
      }
    },
    onError(err) {
      return err;
    },
    variables: { postId, commentId },
  });
  const classes = useStyles();

  const handleClickOpen = () => {
    setConfirmOpen(true);
  };

  const handleClose = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Popover {...restProps}>
        <Typography className={classes.typography} onClick={handleClickOpen}>
          Delete
        </Typography>
      </Popover>
      <Dialog
        open={confirmOpen}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {commentId ? "Delete Comment" : "Delete Post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={deletePostOrMutation} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePost;
