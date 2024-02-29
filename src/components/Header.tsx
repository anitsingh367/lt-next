"use client";
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Box,
  Divider,
  IconButton,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../assets/logo.png";
// import ContributeModal from "../ContributeModal/ContributeModal.react";
// import VolunteerModal from "../VolunteerModal/VolunteerModal.react";
import useHashRouteToggle from "../../utils/useHashRoute";
import Image from "next/image";

const drawerWidth = 240;

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [openContributeModal, setOpenContributeModal] =
    useHashRouteToggle("contribute");
  const [openVolunteerModal, setOpenVolunteerModal] =
    useHashRouteToggle("volunteer");

  const handleContributeButton = () => {
    setOpenContributeModal(true);
  };
  const handleVolunteerButton = () => {
    setOpenVolunteerModal(true);
  };

  const drawer = (
    <div>
      {/* <ContributeModal
        isOpen={openContributeModal}
        onClose={(value) => setOpenContributeModal(value)}
        isNavbar={true}
      /> */}
      {/* <VolunteerModal
        isOpen={openVolunteerModal}
        onClose={(value) => setOpenVolunteerModal(value)}
        isNavbar={true}
      /> */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: {
            lg: "center",
            md: "space-between",
            sm: "space-between",
            xs: "space-between",
          },
          aligncenter: "center",
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src={logo} alt="logo" height={104}></Image>
        </Box>
      </Toolbar>
      <Divider></Divider>
      <List>
        <Link href="/" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <Link href="/about" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="About" />
          </ListItemButton>
        </Link>
        <Link href="/events" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Events" />
          </ListItemButton>
        </Link>
        <Link href="/projects" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </Link>
        <Link href="/video" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Videos" />
          </ListItemButton>
        </Link>
        <ListItemButton>
          <Button variant="contained" onClick={handleVolunteerButton}>
            Become Volunteer
          </Button>
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <AppBar component="nav" position="relative">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: {
              lg: "center",
              md: "space-between",
              sm: "space-between",
              xs: "space-between",
            },
            aligncenter: "center",
            backgroundColor: "#fff",
            color: "#000",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" }, color: "#000" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: { lg: "flex", md: "none", sm: "none", xs: "none" },
              width: "50%",
            }}
          >
            <Image src={logo} alt="logo" height={64}></Image>
          </Box>
          <Box
            sx={{
              display: { lg: "flex", xs: "none", md: "none", sm: "none" },
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              className="link"
              variant="text"
              onClick={() => router.push("/")}
            >
              Home
            </Button>

            <Button
              className="link"
              variant="text"
              onClick={() => router.push("/about")}
            >
              About
            </Button>

            <Button
              className="link"
              variant="text"
              onClick={() => router.push("/events")}
            >
              Events
            </Button>

            <Button
              className="link"
              variant="text"
              onClick={() => router.push("/projects")}
            >
              Projects
            </Button>
            <Button
              variant="text"
              className="link"
              onClick={() => router.push("/videos")}
            >
              Videos
            </Button>

            <Button variant="contained" onClick={handleVolunteerButton}>
              Become Volunteer
            </Button>
          </Box>

          <Button
            variant="outlined"
            onClick={handleContributeButton}
            sx={{ margin: "0 0.5rem" }}
          >
            Contribute Now
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "flex", md: "flex", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Header;
