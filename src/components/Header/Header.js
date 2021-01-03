import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";

import { useStyles } from "./HeaderStyle";
import { UserContext } from "../UserContext/UserContext";
import DrawerMenu from "./DrawerMenu";

const Header = () => {
  const [drawer, setDrawer] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    Cookie.remove("token");
    setUser(null);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <Drawer anchor={"left"} open={drawer} onClose={() => setDrawer(false)}>
        <DrawerMenu />
      </Drawer>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => setDrawer(true)}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/")}
          >
            Strapi Movie Collection
          </Typography>

          {user ? (
            <Box>
              <Button onClick={() => history.push("/watchlist")}>
                Watch list
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </Box>
          ) : (
            <Box>
              <Button onClick={() => history.push("/registration")}>
                Registration
              </Button>
              <Button onClick={() => history.push("/login")}>Login</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
