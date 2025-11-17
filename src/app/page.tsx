import { Suspense } from "react";
import Home from "@/components/homes/home-six";
import Wrapper from "@/layouts/Wrapper";


export const metadata = {
  title: "news - News Magazine React Next Js Template",
};
const index = () => {
  return (
    <Wrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </Wrapper>
  )
}

export default index
