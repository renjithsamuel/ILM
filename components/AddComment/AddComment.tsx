import {
  Box,
  Button,
  Dialog,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useAddCommentStyles } from "./AddComment.styles";
import { useAddComment } from "./AddComment.hooks";
import { Dispatch, SetStateAction } from "react";

interface addCommentParams {
  handleAddComment: () => void;
}

export const AddComment = ({ handleAddComment }: addCommentParams) => {
  const {
    fullScreen,
    openDialog,
    handleCloseDialog,
    ratingValue,
    handleRatingValue,
  } = useAddComment({
    handleAddComment,
  });
  const classes = useAddCommentStyles();
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box className={classes.addCommentRoot}>
          <Box className={classes.commentLabel}>{"Add Your Comment"}</Box>
          <TextField
            autoFocus
            required
            margin="dense"
            id="heading"
            name="heading"
            label="heading"
            type="text"
            fullWidth
            variant="standard"
            className={classes.commentHeading}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Comment"
            multiline
            fullWidth
            minRows={8}
            className={classes.comment}
          />
          <Rating
            sx={{ mt: 0 }}
            name="simple-controlled"
            value={ratingValue}
            precision={0.5}
            onChange={(event, newValue) => {
              handleRatingValue(newValue);
            }}
          />
          <Box className={classes.commentBtns}>
            <Button variant="contained" className={classes.commentBtn}>
              Comment
            </Button>
            <Button
              variant="contained"
              className={classes.commentBtn}
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
