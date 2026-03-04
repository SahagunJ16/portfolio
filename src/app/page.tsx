import { getPortfolioData } from "@/lib/portfolio";
import { Profile, About, Skills, Experiences } from "@/components/sections";

export default async function Home() {
  const data = await getPortfolioData();
  return (
    <main className="mt-5 p-4">
      <Profile profile={data.profile} socials={data.socials} />
      <About profile={data.profile} />
      <Skills skills={data.skills} />
      <Experiences experiences={data.experiences} />
    </main>
  );
}
