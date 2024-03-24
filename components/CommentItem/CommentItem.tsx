import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { useCommentItemStyles } from "./CommentItem.styles";
import Link from "next/link";
import { Review } from "@/entity/Review/Review";
import React from "react";
import { useCommentItem } from "./CommentItem.hooks";
import Image from "next/image";
import { themeValues } from "@/constants/ThemeConstants";
import { FormatTextUtil } from "@/utils/formatText";

interface commentItemParams {
  review: Review;
}

export const CommentItem = ({ review }: commentItemParams) => {
  const { user } = useCommentItem({ review });
  const classes = useCommentItemStyles({ review });
  return (
    <>
      <Link
        href={`/users/${review.userID}`}
        className={classes.commentItemRoot}
      >
        {/* Book Image */}
        <Box className={classes.userImageWrap}>
          <Avatar className={classes.userImage}>
            {user?.name &&
              FormatTextUtil.formatFirstWord(user?.name.slice(0, 1))}
          </Avatar>
        </Box>
        {/* user name - comment heading - comment  */}
        <Box className={classes.commentDetails}>
          <Box className={classes.commentHeadingAndUserName}>
            <Typography
              variant="body1"
              sx={{ fontWeight: themeValues.font.fontWeightThick }}
            >
              {user && FormatTextUtil.formatFirstWord(user.name)}
            </Typography>
            {" - "}
            <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
              {FormatTextUtil.formatFirstWord(review.commentHeading).slice(
                0,
                50,
              ) + "..."}
            </Typography>
          </Box>
          <Divider sx={{ m: 1 }} />
          <Typography variant="body2">
            {FormatTextUtil.formatFirstWord(review.comment as string)}
          </Typography>
        </Box>
        {/* rating */}
        <Box className={classes.ratingWrap}>
          <Rating
            name="read-only"
            value={review.rating}
            readOnly
            precision={1}
            color={themeValues.color.color1}
          />
        </Box>
      </Link>
    </>
  );
};
