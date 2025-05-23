import HeroSection from "./components/hero";
import NewListing from "./components/NewListing";
import OffPlan from "./components/off-plan";
export default function Home() {
  return (
    <div className="bg-white flex flex-col gap-20 md:gap-40">
      <HeroSection />
      <NewListing />
      <OffPlan />
    </div>
  );
}
