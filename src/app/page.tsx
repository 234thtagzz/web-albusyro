import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Identity } from "@/components/home/identity";
import { ProgramsBento } from "@/components/home/programs-bento";
import { Admission } from "@/components/home/admission";
import { DepartmentsSection } from "@/components/home/stats";
import Testimoni from "@/components/home/testimoni";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <Hero />
        <DepartmentsSection />
        <Identity />
        <ProgramsBento />
        <Testimoni />
        <Admission />
      </main>
      <Footer />
    </>
  );
}
