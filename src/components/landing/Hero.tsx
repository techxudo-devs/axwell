import { Star, Play } from "lucide-react";
import PosterSlider from "./PosterSlider";
import VideoHero from "./VideoHero";

const Hero = () => {
  return (
    <div
      id="home"
      className="relative min-h-screen lg:h-[150vh] w-full flex flex-col justify-between lg:justify-center px-4 sm:px-6 md:px-12 pt-24 pb-8 sm:pb-12 overflow-hidden"
    >
      <VideoHero />

      {/* Poster Slider */}
      <div className="relative z-10 w-full mt-2 lg:mt-0">
        <PosterSlider />
      </div>
    </div>
  );
};

export default Hero;