import FAQ from "../components/FAQ";
import HeroBanner from "../components/HeroBanner";
import NewsLetter from "../components/NewsLetter";
import TopMovies from "../components/TopMovies";
import TrendingActors from "../components/TrendingActors";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TopMovies />
      <NewsLetter />
      <TrendingActors />
      <FAQ />
    </div>
  );
}
