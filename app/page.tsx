
import HomeSection from "@/app/components/HomeSection";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-12 bg-purple-300">
      <HomeSection />
      <Categories />
    </main>
  );
}
