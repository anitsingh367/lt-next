"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  List,
  ListItem,
  ListSubheader,
  Button,
  Box,
  Container,
  ListItemText,
  Typography,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import { getEventDetails } from "../../utils/firebase"; // Ensure this import path is correct

// Assuming getEventDetails returns a promise that resolves to an array of objects with a title property
interface EventDetail {
  title: string;
}

const Footer: React.FC = () => {
  const [eventTitles, setEventTitles] = useState<string[]>([
    "GURBANI SEMINAR - GRATITUDE",
    "GURBANI DE CHANAN CH AKHAN - TIK JANA",
    "GURBANI DE CHANAN CH AKHAN - VEEH VISVAY YAKEEN HONA",
    "GURBANI DE CHANAN CH AKHAN - RETHARIA DA PARSAD",
  ]);

  useEffect(() => {
    getEventDetails().then((data: EventDetail[]) => {
      let titles = data.map((item) => item.title);
      setEventTitles(titles);
    });
  }, []);

  console.log("eventTitles", eventTitles);
  return (
    <>
      <Box
        sx={{
          width: 1,
          backgroundColor: "secondary.main",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "secondary.main",
            gap: "4rem",
            flexDirection: {
              lg: "row",
              md: "column",
              sm: "column",
              xs: "column",
            },
          }}
        >
          <List
            sx={{
              width: { lg: "33.33%", md: 1, sm: 1, xs: 1 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              alignSelf: "start",
            }}
          >
            <ListSubheader
              disableGutters
              sx={{
                textTransform: "uppercase",
                background: "transparent",
                color: "#fff",
              }}
            >
              about the living treasure
            </ListSubheader>
            <ListItemText
              sx={{
                color: "secondary.contrastText",
              }}
            >
              Promoting the doctrine of `&quot;`The Universal Truth`&quot;`,
              which stands for equal value to every human, irrespective of
              caste, creed, color or gender.
            </ListItemText>
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalise",
                borderColor: "#fff",
                color: "#fff",
                marginTop: "1rem",
              }}
            >
              <Link
                href="/about"
                passHref
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Know More
              </Link>
            </Button>
          </List>
          <List
            sx={{
              textAlign: "left",
              width: { lg: "33.33%", md: 1, sm: 1, xs: 1 },
            }}
          >
            <ListSubheader
              disableGutters
              sx={{
                textTransform: "uppercase",
                background: "transparent",
                color: "#fff",
              }}
            >
              UPCOMING EVENTS
            </ListSubheader>
            {eventTitles?.slice(0, 5)?.map((items: any, index: number) => {
              return (
                <div key={index}>
                  <ListItem
                    disableGutters
                    disablePadding
                    sx={{ color: "secondary.contrastText" }}
                  >
                    <ListItemText>{items}</ListItemText>
                  </ListItem>
                </div>
              );
            })}
          </List>
          <List
            sx={{
              width: { lg: "33.33%", md: 1, sm: 1, xs: 1 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListSubheader
              disableGutters
              sx={{
                textTransform: "uppercase",
                background: "transparent",
                color: "#fff",
              }}
            >
              CONTACT US
            </ListSubheader>
            <ListItem
              sx={{
                color: "secondary.contrastText",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              disableGutters
              disablePadding
            >
              <ListItemText primary="THE LIVING TREASURE 109," />
              <ListItemText primary="S.P Mukherji Park," />
              <ListItemText primary="Near Tilak Nagar," />
              <ListItemText primary="New Delhi-110018" />
              <ListItemText primary="India" />
            </ListItem>

            <ListItem disableGutters disablePadding sx={{ marginTop: "auto" }}>
              <ListItemText sx={{ color: "secondary.contrastText" }}>
                <span style={{ color: "#fff" }}>Phone</span>: +91-11-25981163
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText sx={{ color: "secondary.contrastText" }}>
                <span style={{ color: "#fff" }}>Email</span>:
                info@thelivingtreasure.com
              </ListItemText>
            </ListItem>
          </List>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            color: "#fff",
            padding: "1.5rem",
          }}
        >
          <a
            href="https://www.instagram.com/veerbhupindersingh_usa/"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            <InstagramIcon fontSize="large" />
          </a>
          <LinkedInIcon fontSize="large" />
          <a
            href="https://www.youtube.com/@TheLivingTreasure"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <YouTubeIcon fontSize="large" />
          </a>
          <a
            href="https://www.facebook.com/VeerBhupinderSingh/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <FacebookIcon fontSize="large" />
          </a>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            background: "#323B45",
            textAlign: "center",
          }}
          maxWidth={false}
        >
          <Typography
            sx={{
              padding: "1.5rem",
            }}
          >
            Copyright 2022.{" "}
            <Link
              href="/terms-and-conditions"
              passHref
              style={{ color: "inherit" }}
            >
              <Box component="span">Terms and Conditions</Box>
            </Link>{" "}
            All Rights Reserved by The Living Treasure.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
