import { Suspense } from "react";
import HomeTwo from "@/components/homes/category-news";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Category News - news News Magazine",
};

const CategoryNewsPage = () => {
  return (
    <Wrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeTwo />
      </Suspense>
    </Wrapper>
  )
}

export default CategoryNewsPage
