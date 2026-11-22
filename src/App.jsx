import AnnouncementBar from "./components/AnnouncementBar.";
import Header from "./components/Header";
import PoliciesFooter from "./components/PoliciesFooter";
import StickyCTA from "./components/StickyCTA";
import WhatsappButton from "./components/WhatsappButton";
import Section1Hero from "./sections/Section1Hero";
import Section2Carousel from "./sections/Section2Carousel";
import Section3FAQ from "./sections/Section3FAQ";
import Section4Order from "./sections/Section4Order";

export default function App() {
  return (
    <div dir="rtl" className="bg-[#FAF6F0] text-[#1E252D] min-h-screen">
      <Header />
      {/* SECTIONS */}
      <div className="h-[calc(100vh-80px)] overflow-y-auto" id="main-scroll">
        <AnnouncementBar />
        <Section1Hero />
        <Section2Carousel />
        <Section3FAQ />
        <Section4Order />
        <PoliciesFooter />
        <WhatsappButton />
      </div>
      <StickyCTA formId="order-now" />
    </div>
  );
}
