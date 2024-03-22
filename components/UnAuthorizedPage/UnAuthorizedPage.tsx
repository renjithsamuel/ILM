import { Button, Typography, Box } from "@mui/material";
import Link from "next/link";
import { themeValues } from "@/constants/ThemeConstants";

interface UnAuthorizedPageProps {}

export const UnAuthorizedPage = ({}: UnAuthorizedPageProps) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        gap={4}
      >
        <Typography variant="h2">403 Un-Authorized</Typography>
        <Typography variant="h5" color="textSecondary">
          You Are Not Allowed To Access This Page.
        </Typography>
        <Link href="/">
          <Button
            variant="contained"
            sx={{
              color: themeValues.color.textColor,
              backgroundColor: themeValues.color.color1,
              "&:hover": {
                backgroundColor: themeValues.color.color3,
              },
            }}
          >
            Go to Home
          </Button>
        </Link>
      </Box>
    </>
  );
};
