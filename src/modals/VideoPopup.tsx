"use client";
import React from "react";
import { Modal } from "react-responsive-modal";
import ReactPlayer from "react-player";

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ isOpen, onClose, videoId }) => {
  // Extract video ID from various YouTube URL formats
  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;

    // Handle youtu.be URLs
    const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)(\?|$)/);
    if (youtuBeMatch) return youtuBeMatch[1];

    // Handle youtube.com URLs
    const youtubeMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)(?:&|$)/);
    if (youtubeMatch) return youtubeMatch[1];

    // Handle embed URLs
    const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)(?:\?|$)/);
    if (embedMatch) return embedMatch[1];

    // If it's already just an ID, return it
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

    return null;
  };

  const videoIdExtracted = getYouTubeVideoId(videoId);
  const videoUrl = videoIdExtracted ? `https://www.youtube.com/watch?v=${videoIdExtracted}` : videoId;

  return (
    <Modal open={isOpen} onClose={onClose} center classNames={{ modal: "video-modal" }} styles={{ modal: { width: '60%', height: '60%', maxWidth: 'none', maxHeight: 'none' } }}>
      <div style={{ width: "100%", height: "100%", aspectRatio: "16/9" }}>
        <ReactPlayer
          src={videoUrl}
          playing
          controls
          muted
          width="100%"
          height="100%"
          onError={(e) => {
            console.error("Error playing video:", e);
          }}
        />
      </div>
    </Modal>
  );
};

export default VideoPopup;
