"use client"
import React, { useState, useEffect, FC } from "react";
import PropTypes from "prop-types"; // Note: PropTypes are typically not used with TypeScript
import moment from "moment";
import useHashRouteToggle from "../../utils/useHashRoute";
import Link from "next/link";
// Import other packages
import { Button, Typography, Container, Box } from "@mui/material";
import { FiberManualRecord as LiveDot } from "@mui/icons-material";
// import CustomCard from '../Card/CustomCard.react';
// import EventModal from '../EventModal/EventModal.react';
// import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { getEventDetails } from "../../utils/firebase";
import EventModal from "@/components/EventModal";
import SkeletonCard from "@/components/Skeleton";
import CustomCard from "@/components/CustomCard";

// Define Props interface if needed
interface EventProps {
  content?: {
    image: string;
    heading: string;
    description: string;
  }[];
}

// Define interface for event details
interface EventDetail {
  date?: {
    startDate: string;
    endDate: string;
  };
  imageUrl?: string;
  title?: string;
  description?: string;
  type?: string;
  mapUrl?: string;
  youtubeUrl?: string;
  chipTemplate?: {
    icon?: typeof LiveDot;
    chipText?: string;
    textColor?: string;
    iconColor?: string;
  };
}

const Events: FC<EventProps> = (props) => {
  const statusColor = {
    live: "#ED0000",
    upcoming: "#388E3C",
    finished: "#999999",
  };

  const [eventDetails, setEventDetails] = useState<EventDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getEventDetails().then((data: EventDetail[]) => {
      setEventDetails(data);
      setIsLoading(false);
    });
  }, []);
  const [openEventModal, setOpenEventModal] = useHashRouteToggle("event");

  const currentDate = new Date();
  const newEventList = eventDetails
    ?.sort((a: any, b: any) => {
      let aDate = new Date(a?.date?.startDate);
      let bDate = new Date(b.date?.startDate);
      let aEndDate = new Date(a.date?.endDate);
      let bEndDate = new Date(b.date?.endDate);

      // Check for undefined values before creating Date objects
      if (aDate && aEndDate && bDate && bEndDate) {
        if (aDate < currentDate && aEndDate > currentDate) {
          return -1;
        } else if (bDate < currentDate && bEndDate > currentDate) {
          return 1;
        } else if (aDate > currentDate && bDate > currentDate) {
          return aDate.getTime() - bDate.getTime(); // Use getTime() to compare dates
        } else {
          return bEndDate.getTime() - aEndDate.getTime(); // Use getTime() to compare dates
        }
      } else {
        // Handle case where dates are undefined
        return 0; // or any other logic you may want
      }
    })
    .map((items) => {
      const startDate = items.date?.startDate;
      const endDate = items.date?.endDate;

      if (startDate && endDate) {
        // Check if startDate and endDate are defined
        if (moment().isBetween(startDate, endDate)) {
          items["chipTemplate"] = {
            icon: LiveDot,
            chipText: "Live",
            textColor: statusColor.live,
            iconColor: statusColor.live,
          };
        } else if (moment().isBefore(startDate)) {
          items["chipTemplate"] = {
            chipText: "Upcoming",
            textColor: statusColor.upcoming,
          };
        } else if (moment().isAfter(endDate)) {
          items["chipTemplate"] = {
            chipText: "Finished",
            textColor: statusColor.finished,
          };
        }
      } else {
        // Handle case where startDate or endDate is undefined
        // For example, set default chipTemplate values
        items["chipTemplate"] = {
          chipText: "Unknown",
          textColor: "#000000", // Default color
        };
      }

      return items;
    });

  const [selectedEvent, setSelectedEvent] = useState({
    heading: "",
    status: "",
    description: "",
    type: "",
    mapUrl: "",
    youtubeUrl: "",
  });

  const handleEventCard = (selectedData: any) => {
    setOpenEventModal(true);
    setSelectedEvent({
      heading: selectedData.heading,
      status: selectedData.status,
      description: selectedData.description,
      type: selectedData.type,
      mapUrl: selectedData.mapUrl,
      youtubeUrl: selectedData.youtubeUrl,
    });
  };
  //Skeleton Loader initial state
  let skeletonCards = Array(4).fill(0);

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={2}
    >
      <EventModal
        isOpen={openEventModal}
        onClose={(value) => setOpenEventModal(value)}
        heading={selectedEvent.heading}
        status={selectedEvent?.status}
        description={selectedEvent.description}
        type={selectedEvent.type}
        mapUrl={selectedEvent.mapUrl}
        youtubeUrl={selectedEvent.youtubeUrl}
      />
      <Typography
        variant="h4"
        align="center"
        mb={2}
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        <Box component="span" color="primary.main">
          events
        </Box>{" "}
        at the living treasure
      </Typography>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        {isLoading ? (
          skeletonCards.map((item, id) => {
            return (
              <div key={id}>
                <SkeletonCard />
              </div>
            );
          })
        ) : newEventList.length === 0 ? (
          <Typography>Oops! No Data found</Typography>
        ) : (
          newEventList
            ?.slice(0, 4)
            .filter((items:any) => {
              return items?.chipTemplate.chipText !== "Finished";
            })
            .map((items:any, index) => {
              const startDate = items.date?.startDate;
              const endDate = items.date?.endDate;
              const readableStartDate = moment(startDate).format("llll");
              const readbleEndDate = moment(endDate).format("h:mm A");
              const description =
                items.description +
                `. Session will be on ${readableStartDate}- ${readbleEndDate}`;
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "280px",
                  }}
                  key={index}
                >
                  <CustomCard
                    content={{
                      image: items.imageUrl,
                      heading: items.title,
                      ...items,
                      description: description,
                      type: items.type,
                      primaryBtn: {
                        btnText: "View Details",
                        onClick: () => {
                          handleEventCard({
                            heading: items.title,
                            status: items?.chipTemplate.chipText?.toLowerCase()?.toString(),
                            description: description,
                            type: items.type,
                            mapUrl: items.mapUrl,
                            youtubeUrl: items.youtubeUrl,
                          });
                        },
                      },
                    }}
                  />
                </Box>
              );
            })
        )}
      </Container>

      {newEventList && newEventList?.length > 0 && (
        <Link href="/events" className="link">
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            View All
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default Events;
