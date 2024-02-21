// Assuming getHomePageVideo has been converted to TypeScript as shown in previous examples.
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getHomePageVideo } from "../../utils/firebase";

// Define TypeScript interface for the video state if necessary.
// If your video data structure is more complex, you may want to define a more detailed interface.
interface VideoData {
  videoUrl: string;
}

const Video: React.FC = () => {
  // Using `useState<VideoData | null>` to explicitly define the state type.
  const [video, setVideo] = useState<VideoData | null>(null);

  useEffect(() => {
    getHomePageVideo().then((res) => {
      // Assuming the response is an array of objects and we're interested in the first item's videoUrl.
      // You might need to adjust this based on your actual data structure.
      const videoData: VideoData = res[0] as VideoData; // Type assertion, assuming res is any[] from Firebase.
      setVideo(videoData);
    });
  }, []);

  return (
    <Box
      height={{ lg: "80vh", sm: "100%", xs: "100%" }}
      bgcolor="secondary.light"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={{ lg: 12, xs: 0, sm: 0 }}
    >
      {video && (
        <video width="100%" height="100%" loop autoPlay muted className="video">
          <source src={video.videoUrl} type="video/mp4" />
          Sorry, your browser doesn`&apos;`t support embedded videos.
        </video>
      )}
    </Box>
  );
};

export default Video;
