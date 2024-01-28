import { themeValues } from "@/constants/ThemeConstants";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

const Custom404 = () => {
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
        <Typography variant="h2">404 - Page Not Found</Typography>
        <Typography variant="h5" color="textSecondary">
          The page you are looking for doesnt exist.
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

export default Custom404;
