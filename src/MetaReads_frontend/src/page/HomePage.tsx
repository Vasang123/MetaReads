import { useEffect, useState } from "react";
import PageLayout from "../components/Layout/PageLayout";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { ShootingStars } from "../components/ui/background/shooting-stars";
import { StarsBackground } from "../components/ui/background/stars-background";
import { NumberTicker } from "../components/ui/number-ticker";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { motion } from "framer-motion";
import { World } from "../components/ui/globe";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const [startTicker, setStartTicker] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTicker(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      <BackgroundBeamsWithCollision>
        <div className="z-30 flex flex-col items-center justify-center gap-2">
          <h2 className="relative z-20 text-center font-sans text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl lg:text-7xl">
            <TypewriterEffectSmooth
              words={[
                { text: "Welcome" },
                { text: "To" },
                {
                  text: "Metareads",
                  className: " text-[#EFAF21] quantico-font",
                },
                { text: "!" },
              ]}
            />
          </h2>

          {/* Description With  User Count */}
          <motion.div
            className="flex max-w-[90vw] items-center justify-center text-center text-lg text-white md:max-w-[50vw]"
            initial={{ y: "2vw", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5 }}
          >
            <div>
              {/* <div className="h-[40vh] w-full flex justify-center">
                <div className="w-[400px] h-[300px]">
                  <World/>
                </div>
              </div> */}
              <div
                style={{
                  fontFamily: "Roboto, sans-serif",
                  lineHeight: "1.6",
                  fontSize: "1.125rem",
                }}
              >
                Explore a universe of stories with{" "}
                <span style={{ color: "#EFAF21" }} className="quantico-font">
                  Metareads
                </span>
                . From timeless classics to thrilling adventures, unlock a world
                of books with a simple subscription. Join our community of{" "}
                <strong>
                  {startTicker ? <NumberTicker value={12965} /> : "Loading..."}
                </strong>{" "}
                users around the world and discover your next favorite read
                today!
              </div>
            </div>
          </motion.div>

          {/* Description With No User Count */}
          {/* <motion.div
            className="mb-4 flex max-w-[90vw] items-center justify-center p-4 text-center text-lg text-white md:max-w-[50vw]"
            initial={{ y: "2vw", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5 }}
          >
            <div
              style={{
                fontFamily: "Roboto, sans-serif",
                lineHeight: "1.6",
                fontSize: "1.125rem",
              }}
            >
              Explore a universe of stories with{" "}
              <span style={{ color: "#EFAF21" }} className="quantico-font">
                Metareads
              </span>
              . From timeless classics to thrilling adventures, unlock a world
              of books with a simple subscription. Join our community and
              discover your next favorite read today!
            </div>
          </motion.div> */}

          <motion.button
            onClick={() => {
              navigate("/store");
            }}
            initial={{ y: "2vw", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="inline-flex h-12 animate-shimmer cursor-pointer items-center justify-center rounded-md border border-neutral-400 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Discover New Worlds
          </motion.button>
        </div>

        <ShootingStars />
        <StarsBackground />
      </BackgroundBeamsWithCollision>
    </PageLayout>
  );
}
