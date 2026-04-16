"use client";

import { useRef } from "react";

export default function HoverVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleMouseEnter() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
  }

  function handleMouseLeave() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      className="w-full h-auto rounded-sm object-fill"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
