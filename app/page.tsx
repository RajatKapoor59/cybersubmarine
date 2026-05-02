import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CyberHero } from "@/components/sections/CyberHero";
import { WhoThisIsFor } from "@/components/sections/WhoThisIsFor";
import { TopicPillars } from "@/components/sections/TopicPillars";
import { StartHere } from "@/components/sections/StartHere";
import { LatestGuides } from "@/components/sections/LatestGuides";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { getAllPosts } from "@/lib/sanity.queries";

export const revalidate = 60;

export default async function Home() {
  const posts = await getAllPosts().catch(() => []);

  return (
    <>
      <Navbar />
      <main>
        <CyberHero />
        <WhoThisIsFor />
        <TopicPillars />
        <StartHere posts={posts} />
        <LatestGuides posts={posts} />
        <TrustSignals />
      </main>
      <Footer />
    </>
  );
}
