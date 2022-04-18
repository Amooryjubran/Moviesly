import HeroBanner from "../components/HeroBanner";
import NewsLetter from "../components/NewsLetter";
import TopMovies from "../components/TopMovies";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TopMovies />
      <NewsLetter />
    </div>
  );
}
