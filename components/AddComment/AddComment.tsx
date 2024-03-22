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
import { Book } from "@/entity/Book/Book";
import { User } from "@/entity/User/User";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { Field, Form, Formik } from "formik";
import { themeValues } from "@/constants/ThemeConstants";

interface addCommentParams {
  book: Book;
  user: User;
  checkout: CheckoutTicket;
  handleAddComment: () => void;
}

export const AddComment = ({
  handleAddComment,
  book,
  user,
  checkout,
}: addCommentParams) => {
  const {
    initialValues,
    fullScreen,
    openDialog,
    handleCloseDialog,
    ratingValue,
    handleRatingValue,
    validationSchema,
    handleCreateReview,
  } = useAddComment({
    book,
    user,
    checkout,
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreateReview}
            style={{ width: "30vw" }}
          >
            {({ errors, touched, isValid }: any) => (
              <>
                <Form
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: themeValues.spacing(2),
                  }}
                >
                  <Field
                    as={TextField}
                    required
                    margin="dense"
                    id="heading"
                    name="commentHeading"
                    label="Heading"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputProps={{
                      maxLength: 50,
                    }}
                    error={
                      touched["commentHeading"] && !!errors["commentHeading"]
                    }
                    helperText={
                      touched["commentHeading"] && errors["commentHeading"]
                    }
                    className={classes.commentHeading}
                  />
                  <Field
                    as={TextField}
                    id="outlined-multiline-flexible"
                    label="Comment"
                    name="comment"
                    multiline
                    required
                    fullWidth
                    minRows={8}
                    inputProps={{
                      maxLength: 600,
                    }}
                    error={touched["comment"] && !!errors["comment"]}
                    helperText={touched["comment"] && errors["comment"]}
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
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.commentBtn}
                      disabled={!isValid || !ratingValue}
                    >
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
                </Form>
              </>
            )}
          </Formik>
        </Box>
      </Dialog>
    </>
  );
};
