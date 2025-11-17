import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogDetailsArea from "@/components/blogs/blog-details/BlogDetailsArea";
import inner_blog_data from "@/data/InnerBlogData";
import { bannerData, todayPostData, sidebarBannerData, recentPostsData } from "@/components/homes/home-six/HomeSixBannerData";
import topNewsData from "@/components/homes/home-six/TopNewsData";
import sportAreaData from "@/components/homes/home-six/SportAreaData";
import { getSpotlightData, getWeeklyData, getWeeklySidebarData } from "@/components/homes/category-news/SpotlightData";
import Wrapper from "@/layouts/Wrapper";
import FooterThree from "@/layouts/footers/FooterThree";
import HeaderThree from "@/layouts/headers/HeaderThree";

export const metadata: Metadata = {
   title: "news",
};

export async function generateStaticParams() {
   const slugs = new Set<string>();

   // Add static slugs from data sources
   const staticSlugs = [
      // From InnerBlogData
      "beyond-algorithms-skills-of-designers-that-ai-cant-replicate",
      "a-pragmatist-s-guide-to-theire-lean-user-research",

      // From TopNewsData
      "india-australia-t20-series-start",
      "pro-kabaddi-league-2025-telugu-titans-vs-patna-pirates",
      "indian-wrestling-gold-medal-victory-2025",
      "national-sports-awards-application-extension",

      // From SportAreaData
      "idli-kadai-ott-release-2025",
      "baahubali-the-epic-re-release-2025",
      "aaryan-movie-vishnu-vishal-thriller-2025",
      "aan-paavam-pollathathu-movie-rio-raj-comedy",
      "anniversary-movie-thriller-2025",

      // From SpotlightData (weekly data)
      "stalin-inaugurates-new-highway-project",
      "bjps-tamil-nadu-strategy-reveal",
      "admk-internal-meeting-outcomes",
      "tamil-nadu-opposition-unity-talks",
      "india-pakistan-t20-clash",
      "england-australia-ashes-test",
      "tennis-atp-finals-preview",
      "olympics-2028-bid-updates",
      "suriya-next-film-teaser-release",
      "vijay-sethupathi-multi-starrer-announce",
      "nayanthara-biopic-plans",
      "kollywood-box-office-hits-oct-2025",
      "tn-board-exam-dates-announced",
      "scholarship-portal-launch",
      "teacher-recruitment-drive-2025",
      "digital-learning-initiative-tn",
      "thiruvannamalai-girivalam-festival",
      "daily-astrology-november-1-preview",
      "sri-lanka-temple-renovation",
      "yoga-day-global-events",

      // Add common dynamic slugs that might be used
      "rain-chennai",
      "heavy-rainfall-chennai",
      "chennai-weather-update",
      "tamil-nadu-rain-alert",
      "chennai-floods-2025",
      "south-india-rainfall",
      "kerala-floods-update",
      "maharashtra-rains",
      "karnataka-weather",
      "andhra-pradesh-rain",
      "telangana-weather-forecast",
      "odisha-cyclone",
      "west-bengal-rains",
      "bihar-floods",
      "uttar-pradesh-weather",
      "madhya-pradesh-rain",
      "rajasthan-heatwave",
      "gujarat-weather",
      "haryana-weather-update",
      "punjab-rains",
      "himachal-pradesh-weather",
      "uttarakhand-floods",
      "jharkhand-rain-alert",
      "chhattisgarh-weather",
      "goa-weather-forecast",
      "kerala-weather-update",
      "tamil-nadu-weather",
      "karnataka-rains",
      "andhra-weather",
      "telangana-rains"
   ];

   staticSlugs.forEach(slug => slugs.add(slug));

   // Fetch slugs from APIs during build time
   const apiEndpoints = [
      'https://news-vercel-ten.vercel.app/api/news/public',
      'https://news-vercel-ten.vercel.app/api/subnews/public',
      'https://news-vercel-ten.vercel.app/api/mini_news/public',
      'https://news-vercel-ten.vercel.app/api/trending_news/public',
      'https://news-vercel-ten.vercel.app/api/main_news/public'
   ];

   for (const endpoint of apiEndpoints) {
      try {
         const response = await fetch(endpoint, { next: { revalidate: 3600 } }); // Cache for 1 hour
         if (response.ok) {
            const data = await response.json();
            if (data.data && Array.isArray(data.data)) {
               data.data.forEach((item: any) => {
                  if (item.slug) {
                     slugs.add(item.slug);
                  }
               });
            }
         }
      } catch (error) {
         console.warn(`Failed to fetch slugs from ${endpoint}:`, error);
         // Continue with other endpoints
      }
   }

   return Array.from(slugs).map((slug) => ({
      id: [slug]
   }));
}



type Props = {
   params: Promise<{ id: string[] }>;
};

export default async function Page({ params }: Props) {

   const { id } = await params;
   const blogId = id.join('/');

   // Fetch dynamic data
   const spotlight_data = await getSpotlightData();
   const weeklyData = await getWeeklyData();
   const weeklySidebarData = await getWeeklySidebarData();

   // First check in bannerData and todayPostData
   let single_blog: any;

   if (bannerData.mainPost.slug === blogId) {
      single_blog = bannerData.mainPost;
   } else {
      single_blog = bannerData.smallPosts.find((item) => item.slug === blogId);
   }

   if (!single_blog) {
      single_blog = todayPostData.find((item) => item.slug === blogId);
   }

   if (!single_blog) {
      single_blog = sidebarBannerData.find((item) => item.slug === blogId);
   }

   if (!single_blog) {
      single_blog = recentPostsData.find((item) => item.slug === blogId);
   }

   // If not found in HomeSixBannerData, check InnerBlogData
   if (!single_blog) {
      const blog_data = inner_blog_data.filter(items => items.page === "blog_1");
      single_blog = blog_data.find((item) => item.slug === blogId || String(item.id) === blogId);
   }

   // If not found in InnerBlogData, check TopNewsData
   if (!single_blog) {
      single_blog = topNewsData.find((item) => item.slug === blogId);
   }

   // If not found in TopNewsData, check SportAreaData
   if (!single_blog) {
      single_blog = sportAreaData.find((item) => item.slug === blogId);
   }

   // If not found in SportAreaData, check SpotlightData
   if (!single_blog) {
      single_blog = spotlight_data.find((item) => item.slug === blogId);
   }

   // If not found in SpotlightData, check WeeklyData
   if (!single_blog) {
      single_blog = weeklyData.find((item) => item.slug === blogId);
   }

   // If not found in WeeklyData, check WeeklySidebarData
   if (!single_blog) {
      single_blog = weeklySidebarData.find((item) => item.slug === blogId);
   }

   // If not found in static data, try to fetch from news API
   if (!single_blog) {
      try {
         const response = await fetch('https://news-vercel-ten.vercel.app/api/news/public');

         if (response.ok) {
            const data = await response.json();
            const apiBlog = data.data.find((item: any) => item.slug === blogId);
            if (apiBlog) {
               // Transform API data to match the expected format
               single_blog = {
                  id: apiBlog._id || apiBlog.id,
                  page: apiBlog.page || "home_2",
                  category: apiBlog.category || "General",
                  slug: apiBlog.slug,
                  thumb: apiBlog.thumb?.data ? {
                     src: `data:${apiBlog.thumb.mimetype};base64,${Buffer.from(apiBlog.thumb.data).toString('base64')}`,
                     width: 400,
                     height: 250,
                     blurDataURL: `data:${apiBlog.thumb.mimetype};base64,${Buffer.from(apiBlog.thumb.data).toString('base64')}`
                  } : undefined,
                  tag: apiBlog.tag || apiBlog.category || "News",
                  title: apiBlog.title || "News Title",
                  excerpt: apiBlog.excerpt || apiBlog.description || "",
                  date: apiBlog.date || (apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Recent"),
                  time: apiBlog.time || (apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "12:00pm"),
                  paragraphs: Array.isArray(apiBlog.paragraphs) ? apiBlog.paragraphs : [apiBlog.paragraphs || ""],
                  images: apiBlog.images?.map((img: any) => ({
                     src: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`,
                     width: 400,
                     height: 250,
                     blurDataURL: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`
                  })) || [],
                  videoUrl: apiBlog.videoUrl || ""
               };
            }
         }
      } catch (error) {
         console.error('Error fetching blog from news API:', error);
      }
   }

   // If still not found, try to fetch from subnews API
   if (!single_blog) {
      try {
         const response = await fetch('https://news-vercel-ten.vercel.app/api/subnews/public');
         if (response.ok) {
            const data = await response.json();
            const apiBlog = data.data.find((item: any) => item.slug === blogId);
            if (apiBlog) {
               // Transform API data to match the expected format
               single_blog = {
                  id: apiBlog._id || apiBlog.id,
                  page: apiBlog.page || "home_2",
                  category: apiBlog.category || "General",
                  slug: apiBlog.slug,
                  thumb: apiBlog.thumb?.data ? {
                     src: `data:${apiBlog.thumb.mimetype};base64,${Buffer.from(apiBlog.thumb.data).toString('base64')}`,
                     width: 400,
                     height: 250,
                     blurDataURL: `data:${apiBlog.thumb.mimetype};base64,${Buffer.from(apiBlog.thumb.data).toString('base64')}`
                  } : undefined,
                  tag: apiBlog.tag || apiBlog.category || "News",
                  title: apiBlog.title || "News Title",
                  excerpt: apiBlog.excerpt || apiBlog.description || "",
                  date: apiBlog.date || (apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Recent"),
                  time: apiBlog.time || (apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "12:00pm"),
                  paragraphs: Array.isArray(apiBlog.paragraphs) ? apiBlog.paragraphs : [apiBlog.paragraphs || ""],
                  images: apiBlog.images?.map((img: any) => ({
                     src: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`,
                     width: 400,
                     height: 250,
                     blurDataURL: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`
                  })) || [],
                  videoUrl: apiBlog.videoUrl || ""
               };
            }
         }
      } catch (error) {
         console.error('Error fetching blog from subnews API:', error);
      }
   }

   // If still not found, try to fetch from mini_news API
   if (!single_blog) {
      try {
         const response = await fetch('https://news-vercel-ten.vercel.app/api/mini_news/public');
         if (response.ok) {
            const data = await response.json();
            const apiBlog = data.data.find((item: any) => item.slug === blogId);
            if (apiBlog) {
               // Transform API data to match the expected format
               single_blog = {
                  id: apiBlog._id || apiBlog.id,
                  page: apiBlog.page || "home_2",
                  category: apiBlog.category || "General",
                  slug: apiBlog.slug,
                  thumb: apiBlog.thumb?.data ? {
                     src: `data:${apiBlog.thumb.mimetype};base64,${Buffer.from(apiBlog.thumb.data).toString('base64')}`,
                     width: 400,
                     height: 250,
                     blurDataURL: `data:${apiBlog.thumb.mimetype};base64,${Buffer.from(apiBlog.thumb.data).toString('base64')}`
                  } : undefined,
                  tag: apiBlog.tag || apiBlog.category || "News",
                  title: apiBlog.title || "News Title",
                  excerpt: apiBlog.excerpt || apiBlog.description || "",
                  date: apiBlog.date || (apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Recent"),
                  time: apiBlog.time || (apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "12:00pm"),
                  paragraphs: Array.isArray(apiBlog.paragraphs) ? apiBlog.paragraphs : [apiBlog.paragraphs || ""],
                  images: apiBlog.images?.map((img: any) => ({
                     src: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`,
                     width: 400,
                     height: 250,
                     blurDataURL: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`
                  })) || [],
                  videoUrl: apiBlog.videoUrl || ""
               };
            }
         }
      } catch (error) {
         console.error('Error fetching blog from mini_news API:', error);
      }
   }

   // If still not found, try to fetch from trending_news API
   if (!single_blog) {
      try {
         const response = await fetch('https://news-vercel-ten.vercel.app/api/trending_news/public');
         if (response.ok) {
            const data = await response.json();
            const apiBlog = data.data.find((item: any) => item.slug === blogId);
            if (apiBlog) {
               // Transform API data to match the expected format
               single_blog = {
                  id: apiBlog._id || apiBlog.id,
                  page: apiBlog.page || "home_2",
                  category: apiBlog.category || "General",
                  slug: apiBlog.slug,
                  thumb: apiBlog.thumb?.data ? {
                     src: `data:${apiBlog.thumb.mimetype};base64,${Buffer.from(apiBlog.thumb.data).toString('base64')}`,
                     width: 400,
                     height: 250,
                     blurDataURL: `data:${apiBlog.thumb.mimetype};base64,${Buffer.from(apiBlog.thumb.data).toString('base64')}`
                  } : undefined,
                  tag: apiBlog.tag || apiBlog.category || "News",
                  title: apiBlog.title || "News Title",
                  excerpt: apiBlog.excerpt || apiBlog.description || "",
                  date: apiBlog.date || (apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Recent"),
                  time: apiBlog.time || (apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "12:00pm"),
                  paragraphs: Array.isArray(apiBlog.paragraphs) ? apiBlog.paragraphs : [apiBlog.paragraphs || ""],
                  images: apiBlog.images?.map((img: any) => ({
                     src: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`,
                     width: 400,
                     height: 250,
                     blurDataURL: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`
                  })) || [],
                  videoUrl: apiBlog.videoUrl || ""
               };
            }
         }
      } catch (error) {
         console.error('Error fetching blog from trending_news API:', error);
      }
   }

   // If still not found, try to fetch from main_news API
   if (!single_blog) {
      try {
         const response = await fetch('https://news-vercel-ten.vercel.app/api/main_news/public');
         if (response.ok) {
            const data = await response.json();
            const apiBlog = data.data.find((item: any) => item.slug === blogId);
            if (apiBlog) {
               // Transform API data to match the expected format
               single_blog = {
                  id: apiBlog._id || apiBlog.id,
                  page: apiBlog.page || "home_2",
                  category: apiBlog.category || "General",
                  slug: apiBlog.slug,
                  thumb: apiBlog.thumb?.data ? {
                     src: `data:${apiBlog.thumb.mimetype};base64,${Buffer.from(apiBlog.thumb.data).toString('base64')}`,
                     width: 400,
                     height: 250,
                     blurDataURL: `data:${apiBlog.thumb.mimetype};base64,${Buffer.from(apiBlog.thumb.data).toString('base64')}`
                  } : undefined,
                  tag: apiBlog.tag || apiBlog.category || "News",
                  title: apiBlog.title || "News Title",
                  excerpt: apiBlog.excerpt || apiBlog.description || "",
                  date: apiBlog.date || (apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Recent"),
                  time: apiBlog.time || (apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "12:00pm"),
                  paragraphs: Array.isArray(apiBlog.paragraphs) ? apiBlog.paragraphs : [apiBlog.paragraphs || ""],
                  images: apiBlog.images?.map((img: any) => ({
                     src: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`,
                     width: 400,
                     height: 250,
                     blurDataURL: `data:${img.mimetype};base64,${Buffer.from(img.data).toString('base64')}`
                  })) || [],
                  videoUrl: apiBlog.videoUrl || ""
               };
            }
         }
      } catch (error) {
         console.error('Error fetching blog from main_news API:', error);
      }
   }

   if (!single_blog) {
      notFound();
   }
   
   return (
      <Wrapper>
         <>
            <HeaderThree />
            <main className="fix">
               <BlogDetailsArea style={false} single_blog={single_blog} key={single_blog?.id} />
            </main>
            <FooterThree />
         </>
      </Wrapper>
   )
}
