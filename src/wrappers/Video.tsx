"use client"
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getHomePageVideo } from "../../utils/firebase";

interface VideoData {
  videoUrl: string;
}

const Video: React.FC = () => {
  const [video, setVideo] = useState<VideoData | null>(null);

  useEffect(() => {
    getHomePageVideo().then((res) => {
       const videoData: VideoData = res[0] as VideoData;
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
