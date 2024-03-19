import { Box, Chip, Typography } from "@mui/material";
import { useSearchItemStyles } from "./SearchItem.styles";
import { themeValues } from "@/constants/ThemeConstants";
import Link from "next/link";
import { IBookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { SearchItem } from "@/entity/SearchItem/SearchItem";
import { EntityTypes } from "@/constants/GlobalConstants";

interface searchItemParams {
  searchItem: SearchItem;
  handleCloseDialog: () => void;
}

export const SearchItemComponent = ({
  searchItem,
  handleCloseDialog,
}: searchItemParams) => {
  const classes = useSearchItemStyles();

  if (searchItem.entityType === EntityTypes.UserEntity) {
    return (
      <>
        <Box
          className={classes.searchItemRoot}
          component={Link}
          href={`/users/${searchItem.entityID}`}
          onClick={handleCloseDialog}
        >
          <Box className={classes.bookItemDetails}>
            {/* left */}
            {/* username */}
            <Typography className={classes.username} variant="body1">
              {searchItem.username}
            </Typography>
            {/*  email*/}
            <Typography className={classes.emailID} variant="body2">
              {searchItem.emailID}
            </Typography>
          </Box>
          <Box className={classes.entityType}>
            {/* entityType (in a chip)*/}
            <Chip
              label={"User"}
              variant="outlined"
              className={classes.entityChip}
              // sx={{ borderColor: themeValues.color.color3 }}
            />
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        className={classes.searchItemRoot}
        component={Link}
        href={`/allbooks/${searchItem.entityID}`}
        onClick={handleCloseDialog}
      >
        <Box>
          {/* Left */}
          {/* Book Name */}
          <Typography className={classes.bookName} variant="body1">
            {searchItem.bookname}
          </Typography>
          {/* Book description */}
          <Typography className={classes.bookDescription} variant="body2">
            {searchItem.bookDescription}
          </Typography>
        </Box>
        <Box className={classes.entityType}>
          {/* right */}
          {/* Entity Type in chip */}
          <Chip
            label={"Book"}
            className={classes.entityChip}
            // sx={{ borderColor: themeValues.color.color3 }}
          />
        </Box>
      </Box>
    </>
  );
};
