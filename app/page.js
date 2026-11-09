import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Stories from "@/components/Stories";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import RevealObserver from "@/components/RevealObserver";
import { getStories, getProjects, getTestimonials } from "@/lib/data";

export const revalidate = 30; // DB content refreshes at most every 30s

export default async function Home() {
  const [stories, projects, testimonials] = await Promise.all([getStories(), getProjects(), getTestimonials()]);

  return (
    <>
      <Header />
      <main className="page">
        <div className="frame">
          <Hero />
          <About />
        </div>
        <Marquee />
        <Stats />
        <Stories items={stories} />
        <Skills />
        <Projects items={projects} />
        <Services />
        <Testimonials items={testimonials} />
        <Contact />
        <Newsletter />
        <Footer />
      </main>
      <WhatsAppFab />
      <RevealObserver />
    </>
  );
}
