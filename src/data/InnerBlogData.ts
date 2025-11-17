import { StaticImageData } from "next/image";

import blogThumb_1 from "@/assets/img/blog/blog_post01.jpg";
import blogThumb_2 from "@/assets/img/blog/blog_post02.jpg";
import blogThumb_3 from "@/assets/img/blog/blog_post03.jpg";
import blogThumb_4 from "@/assets/img/blog/blog_post04.jpg";
import blogThumb_5 from "@/assets/img/blog/blog_post05.jpg";
import blogThumb_6 from "@/assets/img/blog/blog_post06.jpg";

import blog2Thumb_1 from "@/assets/img/blog/author_post01.jpg";
import blog2Thumb_2 from "@/assets/img/blog/author_post02.jpg";
import blog2Thumb_3 from "@/assets/img/blog/author_post03.jpg";
import blog2Thumb_4 from "@/assets/img/blog/author_post04.jpg";

import authorThumb_1 from "@/assets/img/blog/author_post01.jpg";
import authorThumb_2 from "@/assets/img/blog/author_post02.jpg";
import authorThumb_3 from "@/assets/img/blog/author_post03.jpg";
import authorThumb_4 from "@/assets/img/blog/author_post04.jpg";
import authorThumb_5 from "@/assets/img/blog/author_post05.jpg";
import authorThumb_6 from "@/assets/img/blog/author_post06.jpg";

// Imports for banner detailed content
import bannerThumb_1 from "@/assets/img/blog/nw_banner_post03.jpg";
import bannerThumb_2 from "@/assets/img/blog/nw_banner_post01.jpg";
import bannerThumb_3 from "@/assets/img/blog/nw_banner_post02.jpg";
import todayPostThumb_1 from "@/assets/img/blog/today_post01.jpg";
import todayPostThumb_2 from "@/assets/img/blog/today_post02.jpg";

interface DataType {
   id: number;
   slug?: string;
   page: string;
   thumb: StaticImageData;
   tag: string;
   title: string;
   date: string;
   time: string;
   desc: string;
   paragraphs?: string[];
   images?: StaticImageData[];
   videoUrl?: string;
}[];

const inner_blog_data: DataType[] = [
   {
      id: 1,
      slug: "beyond-algorithms-skills-of-designers-that-ai-cant-replicate",
      page: "blog_1",
      thumb: bannerThumb_1,
      tag: "TECHNOLOGY",
      title: "Beyond Algorithms Skills Of Designers That AI Can't Replicate",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Exploring the human-centered skills that designers bring to the table, which AI algorithms simply cannot match.",
      paragraphs: [
         "Browned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey melty little puddles of chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula eget dolor Aenean massa.",
         "Growned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey meltpuddles of chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula eget doloawr Aenean massa.m Ipsum has been the industry's standard dummy.",
         "Growned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey meltpuddles offer chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula egette doloawr Aenean massa.m Ipsum has been the industry's standard dummy.should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels.",
         "Growned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey meltpuddles offer chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula egette doloawr Aenean massa.m Ipsum has been the industry's standard dummy.should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels."
      ],
      images: [blogThumb_2, blogThumb_3],
      videoUrl: "Ml4XCF-JS0k"
   },
   {
      id: 2,
      slug: "a-pragmatist-s-guide-to-theire-lean-user-research",
      page: "blog_1",
      thumb: bannerThumb_2,
      tag: "BUSINESS",
      title: "A Pragmatist's Guide To Theire Lean User Research",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Practical approaches to user research that prioritize efficiency and actionable insights for product development.",
      paragraphs: [
         "Browned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey melty little puddles of chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula eget dolor Aenean massa.",
         "Growned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey meltpuddles of chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula eget doloawr Aenean massa.m Ipsum has been the industry's standard dummy.",
         "Growned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey meltpuddles offer chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula egette doloawr Aenean massa.m Ipsum has been the industry's standard dummy.should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels.",
         "Growned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey meltpuddles offer chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula egette doloawr Aenean massa.m Ipsum has been the industry's standard dummy.should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels."
      ],
      images: [blogThumb_1, blogThumb_4],
      videoUrl: "Ml4XCF-JS0k"
   },
   {
      id: 3,
      page: "blog_1",
      thumb: blogThumb_3,
      tag: "TECHNOLOGY",
      title: "Fine-Grained Access Handling And Data Management Security",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 4,
      page: "blog_1",
      thumb: blogThumb_4,
      tag: "TRAVEL",
      title: "A Comprehensive Checklist For Running Design Workshops",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 5,
      page: "blog_1",
      thumb: blogThumb_5,
      tag: "SPORTS",
      title: "How To Design An Effective Area User Onboarding Flow",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 6,
      page: "blog_1",
      thumb: blogThumb_6,
      tag: "CRYPTO",
      title: "How To Protect Your App With A Model Based On JSONDiff",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 7,
      page: "blog_1",
      thumb: blogThumb_1,
      tag: "FIGHTER",
      title: "The Growing Need For Effective Password Management",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 8,
      page: "blog_1",
      thumb: blogThumb_2,
      tag: "APPITIZER",
      title: "Smashing Podcast Episode 58 With Debbie What Is CX Design?",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 9,
      page: "blog_1",
      thumb: blogThumb_6,
      tag: "CRYPTO",
      title: "How To Protect Your App With A Model Based On JSONDiff",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 10,
      page: "blog_1",
      thumb: blogThumb_4,
      tag: "TRAVEL",
      title: "A Comprehensive Checklist For Running Design Workshops",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 11,
      page: "blog_1",
      thumb: blogThumb_5,
      tag: "SPORTS",
      title: "How To Design An Effective Area User Onboarding Flow",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 12,
      page: "blog_1",
      thumb: blogThumb_3,
      tag: "TECHNOLOGY",
      title: "Fine-Grained Access Handling And Data Management Security",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 13,
      page: "blog_1",
      thumb: blogThumb_2,
      tag: "APPITIZER",
      title: "Smashing Podcast Episode 58 With Debbie What Is CX Design?",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 14,
      page: "blog_1",
      thumb: blogThumb_3,
      tag: "TECHNOLOGY",
      title: "Fine-Grained Access Handling And Data Management Security",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 15,
      page: "blog_1",
      thumb: blogThumb_4,
      tag: "TRAVEL",
      title: "A Comprehensive Checklist For Running Design Workshops",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },

   // blog_2

   {
      id: 1,
      page: "blog_2",
      thumb: blog2Thumb_1,
      tag: "POLITICS",
      title: "Fluid Sizing Instead Of Multiple Media Queries?",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 2,
      page: "blog_2",
      thumb: blog2Thumb_2,
      tag: "TECHNOLOGY",
      title: "Overcoming Imposter Syndrome By Developing Your Own Guiding",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 3,
      page: "blog_2",
      thumb: blog2Thumb_3,
      tag: "SPORTS",
      title: "A New Pattern For The Jamstack: Segmented Rendering",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 4,
      page: "blog_2",
      thumb: blog2Thumb_4,
      tag: "FASHION",
      title: "Resolving Conflicts Between Designers And Engineers",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 5,
      page: "blog_2",
      thumb: blogThumb_1,
      tag: "FIGHTER",
      title: "The Growing Need For Effective Password Management",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 6,
      page: "blog_2",
      thumb: blogThumb_2,
      tag: "APPITIZER",
      title: "Smashing Podcast Episode 58 With Debbie What Is CX Design?",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 7,
      page: "blog_2",
      thumb: blogThumb_3,
      tag: "TECHNOLOGY",
      title: "Fine-Grained Access Handling And Data Management Security",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 8,
      page: "blog_2",
      thumb: blogThumb_4,
      tag: "TRAVEL",
      title: "A Comprehensive Checklist For Running Design Workshops",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 9,
      page: "blog_2",
      thumb: blogThumb_5,
      tag: "SPORTS",
      title: "How To Design An Effective Area User Onboarding Flow",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 10,
      page: "blog_2",
      thumb: blogThumb_6,
      tag: "CRYPTO",
      title: "How To Protect Your App With A Model Based On JSONDiff",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 11,
      page: "blog_2",
      thumb: blogThumb_2,
      tag: "APPITIZER",
      title: "Smashing Podcast Episode 58 With Debbie What Is CX Design?",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 12,
      page: "blog_2",
      thumb: blogThumb_3,
      tag: "TECHNOLOGY",
      title: "Fine-Grained Access Handling And Data Management Security",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 13,
      page: "blog_2",
      thumb: blogThumb_4,
      tag: "TRAVEL",
      title: "A Comprehensive Checklist For Running Design Workshops",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },

   // author

   {
      id: 1,
      page: "author",
      thumb: authorThumb_1,
      tag: "POLITICS",
      title: "Fluid Sizing Instead Of Multiple Media Queries?",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 2,
      page: "author",
      thumb: authorThumb_2,
      tag: "TECHNOLOGY",
      title: "Overcoming Imposter Syndrome By Developing Your Own Guiding",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 3,
      page: "author",
      thumb: authorThumb_3,
      tag: "SPORTS",
      title: "A New Pattern For The Jamstack: Segmented Rendering",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 4,
      page: "author",
      thumb: authorThumb_4,
      tag: "FASHION",
      title: "Resolving Conflicts Between Designers And Engineers",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 5,
      page: "author",
      thumb: authorThumb_5,
      tag: "FOOD",
      title: "An Accessibility-First Approach To Chart Visual Design",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 6,
      page: "author",
      thumb: authorThumb_6,
      tag: "GADGET",
      title: "How To Build A Localized Website With Hugo And Strapi",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 7,
      page: "author",
      thumb: authorThumb_1,
      tag: "POLITICS",
      title: "Fluid Sizing Instead Of Multiple Media Queries?",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 8,
      page: "author",
      thumb: authorThumb_2,
      tag: "TECHNOLOGY",
      title: "Overcoming Imposter Syndrome By Developing Your Own Guiding",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 9,
      page: "author",
      thumb: authorThumb_3,
      tag: "SPORTS",
      title: "A New Pattern For The Jamstack: Segmented Rendering",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 10,
      page: "author",
      thumb: authorThumb_6,
      tag: "GADGET",
      title: "How To Build A Localized Website With Hugo And Strapi",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 11,
      page: "author",
      thumb: authorThumb_5,
      tag: "FOOD",
      title: "An Accessibility-First Approach To Chart Visual Design",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 12,
      page: "author",
      thumb: authorThumb_4,
      tag: "FASHION",
      title: "Resolving Conflicts Between Designers And Engineers",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 13,
      page: "author",
      thumb: authorThumb_6,
      tag: "GADGET",
      title: "How To Build A Localized Website With Hugo And Strapi",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 14,
      page: "author",
      thumb: authorThumb_5,
      tag: "FOOD",
      title: "An Accessibility-First Approach To Chart Visual Design",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 15,
      page: "author",
      thumb: authorThumb_4,
      tag: "FASHION",
      title: "Resolving Conflicts Between Designers And Engineers",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
];

export default inner_blog_data;
