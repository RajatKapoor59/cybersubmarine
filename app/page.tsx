import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { HeroBento } from "@/components/sections/HeroBento";
import { TabsSection } from "@/components/sections/TabsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { PostSlider } from "@/components/sections/PostSlider";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { getAllPosts, getAllCategories } from "@/lib/sanity.queries";

export const revalidate = 60;

export default async function Home() {
  const [posts, categories] = await Promise.all([
    getAllPosts().catch(() => []),
    getAllCategories().catch(() => []),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection posts={posts} categories={categories} />
        <MarqueeSection posts={posts} categories={categories} />
        <HeroBento posts={posts} categories={categories} />
        <TabsSection posts={posts} categories={categories} />
        <GallerySection posts={posts} categories={categories} />
        <PostSlider posts={posts} categories={categories} />
        <FAQSection />
        <CTASection />
        <TestimonialSection />
      </main>
      <Footer />
    </>
  );
}
