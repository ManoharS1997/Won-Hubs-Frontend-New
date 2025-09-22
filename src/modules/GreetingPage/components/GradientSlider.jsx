export default function GradientSlider() {
  const cards = [
    { text1: "HELLO THERE", text2: "Am Ashwin.A", gradient: "from-[#ff7e5f] to-[#feb47b]", url: "https://www.youtube.com/embed/igfzqDO_9jE?si=pQZj0u1MmKWzMZI7" },
    { text1: "Do follow on Insta", text2: "ashwin_ambar_", gradient: "from-[#6a11cb] to-[#2575fc]", url: "https://www.youtube.com/embed/igfzqDO_9jE?si=pQZj0u1MmKWzMZI7" },
    { text1: "Replace cards with images", text2: "for an image slider", gradient: "from-[#00c6ff] to-[#0072ff]", url: "https://www.youtube.com/embed/igfzqDO_9jE?si=pQZj0u1MmKWzMZI7" },
    { text1: "Html css only", text2: "Hover to stop the slides", gradient: "from-[#ff512f] to-[#dd2476]", url: "https://www.youtube.com/embed/igfzqDO_9jE?si=pQZj0u1MmKWzMZI7" },
    { text1: "Card 5", text2: "Content for card 5", gradient: "from-[#ffb6c1] to-[#ff69b4]", url: "https://www.youtube.com/embed/igfzqDO_9jE?si=pQZj0u1MmKWzMZI7" },
    { text1: "Card 6", text2: "Content for card 6", gradient: "from-[#ff9a8b] to-[#ffc3a0]", url: "https://www.youtube.com/embed/igfzqDO_9jE?si=pQZj0u1MmKWzMZI7" },
    { text1: "Card 7", text2: "Modify it and use", gradient: "from-[#a1c4fd] to-[#c2e9fb]", url: "https://www.youtube.com/embed/igfzqDO_9jE?si=pQZj0u1MmKWzMZI7" },
    { text1: "Card 8", text2: "Content for card 8", gradient: "from-[#fbc2eb] to-[#a18cd1]", url: "https://www.youtube.com/embed/igfzqDO_9jE?si=pQZj0u1MmKWzMZI7" },
    { text1: "Card 9", text2: "Content for card 9", gradient: "from-[#84fab0] to-[#8fd3f4]", url: "https://www.youtube.com/embed/igfzqDO_9jE?si=pQZj0u1MmKWzMZI7" },
  ];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "220px",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
      }}
    >
      <div className="group">
        <div className="flex animate-marquee group-hover:![animation-play-state:paused]">
          {[...cards, ...cards].map((card, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[350px] h-[200px] mx-2 rounded-lg overflow-hidden border border-gray-300 shadow bg-gradient-to-r relative"
            >
              <div className={`w-full h-full bg-gradient-to-r ${card.gradient} flex flex-col items-center justify-center`}>
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={card.url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black via-black text-white p-2">
                  <p className="text-sm">{card.text1}</p>
                  <p className="text-xs">{card.text2}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
