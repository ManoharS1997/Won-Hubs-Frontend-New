import { useEffect, useState } from "react";

export default function AnimatedVideoShowcase() {
  const videoList = [
    "/videos/v1.mp4",
    "/videos/v2.mp4",
    "/videos/v3.mp4",
    "/videos/v4.mp4",
    "/videos/v5.mp4",
    "/videos/v6.mp4"
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      // wait for fade duration
      setTimeout(() => {
        // update active to the one that just faded in
        setActiveIndex(nextIndex);
        // pick new nextIndex
        setNextIndex((nextIndex + 1) % videoList.length);
        setIsFading(false);
      }, 1000); // match fade duration
    }, 5000);

    return () => clearInterval(interval);
  }, [nextIndex, videoList.length]);

  return (
    <div className="relative w-1/2 flex items-center justify-center overflow-hidden h-[200px] md:h-[400px] ">
      {/* Active Video (bottom layer) */}
      <video
        key={activeIndex}
        width="450"
        className="absolute rounded-full transition-opacity duration-1000 opacity-100"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoList[activeIndex]} type="video/mp4" />
      </video>

      {/* Next Video (top layer, fades in) */}
      <video
        key={nextIndex}
        width="400"
        className={`absolute rounded-full transition-opacity duration-1000 ${isFading ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoList[nextIndex]} type="video/mp4" />
      </video>
    </div>
  );
}
