import Theme from "@/components/Theme";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Theme>
        <Box
          height="100vh"
          width="100vw"
          display="flex"
          flexDirection="column"
          overflow="hidden"
          component="body"
        >
          <Header />
          <Box
            display="flex"
            overflow="auto"
            flexDirection="column"
            component="main"
            flexGrow="1"
          >
            {children}
          </Box>
        </Box>
      </Theme>
    </html>
  );
};

export default RootLayout;