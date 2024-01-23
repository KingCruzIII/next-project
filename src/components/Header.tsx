import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import { Home } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          href="/"
        >
          <Home />
        </IconButton>
        <Button href="/search/anime">Search</Button>
        <Typography variant="h6" component="div">
          {/* <Button href="/seasons">Seasons</Button> */}
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
