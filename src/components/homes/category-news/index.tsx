import Spotlight from "./Spotlight";
import WeeklyPost from "./WeeklyPost";
import FooterThree from "@/layouts/footers/FooterThree"
import HeaderThree from "@/layouts/headers/HeaderThree"

const HomeTwo = () => {
  return (
    <>
       <HeaderThree />
      <main className="fix">
       {/*  <Banner />
        <Category />
        <AdBannerOne />
         <AdBannerTwo /> 
         <VideoPost /> */}
        <Spotlight />
        <WeeklyPost />
      </main>
       <FooterThree />
    </>
  )
}

export default HomeTwo;
