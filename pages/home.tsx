import Carousel from "@/components/molecules/Carousel";
import Sidebar from "@/components/molecules/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Carousel />
    </div>
  );
}
