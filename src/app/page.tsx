import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Identity } from "@/components/home/identity";
import { ProgramsBento } from "@/components/home/programs-bento";
import { Admission } from "@/components/home/admission";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <Hero />
        <Identity />
        <ProgramsBento />
        <Admission />
      </main>
      <Footer />
    </>
  );
}
