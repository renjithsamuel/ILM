import { Tooltip } from "@material-ui/core";
import { Box, Button, Chip, Typography } from "@mui/material";
import { themeValues } from "@/constants/ThemeConstants";
import Link from "next/link";
import { IBookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { UserBookDetailType } from "@/constants/GlobalConstants";
import { useSettingsStyles } from "./Settings.styles";
import { useSettings } from "./Settings.hooks";
import { User } from "@/entity/User/User";
import { Role } from "@/constants/Role";

interface settingsParams {}

export const Settings = ({}: settingsParams) => {
  const { user, theme, handleTheme } = useSettings({});
  const classes = useSettingsStyles();

  return (
    <>
      <Box className={classes.settingsRoot}>
        {/* top cover and profile image */}
        <Box className={classes.userCover}>
          {/* theme button
          <Button
            type="button"
            onClick={() => {
              handleTheme();
            }}
          >
            {theme}
          </Button> */}
          {/* userimage */}
          <Box className={classes.userImage}></Box>
        </Box>
        {/* setting Item */}
        {settingsItemsArr(user)?.map((item, index) => {
          return (
            <Box className={classes.settingsItemRoot} key={index}>
              <Box className={classes.settingsItemDetails}>
                {/* Left */}
                {/* settings Name */}
                <Typography
                  className={classes.settingsItemName}
                  variant="body1"
                >
                  {item.name}
                </Typography>
                {/* settings description */}
                <Typography
                  className={classes.settingsItemDescription}
                  variant="body2"
                >
                  {item.description}
                </Typography>
              </Box>
              <Box className={classes.ButtonWrap}>
                {/* right */}
                {/* settings button */}
                <Button
                  variant="contained"
                  className={classes.ActionButton}
                  disabled={item.isButtonDisabled(user)}
                >
                  {item.getButtonName(user)}
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

const settingsItemsArr = (user: User) => {
  if (user.role === Role.Patrons) {
    return [
      {
        name: "Membership Payment",
        description: "Monthly amount 30 Rs/-",
        isButtonDisabled: (user: User) => (user.isPaymentDone ? true : false),
        getButtonName: (user: User) =>
          user.isPaymentDone ? "Paid" : "Pay now",
      },
    ];
  }
  return null;
};

// change role?
// give payment qr code with popup
// delete user
