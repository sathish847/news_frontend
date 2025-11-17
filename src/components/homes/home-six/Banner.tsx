"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import AdBanner from "./AdBanner";
import PoliticsPost from "./PoliticsPost";
import TodayPost from "./TodayPost";
import BannerSidebar from "./BannerSidebar";
import { bannerData } from "./HomeSixBannerData";
import { fetchMainNews } from "./NewsApiService";

interface NewsItem {
   _id: string;
   title: string;
   excerpt: string;
   slug: string;
   date: string;
   time: string;
   thumb?: {
      filename: string;
      originalName: string;
      mimetype: string;
      size: number;
      data?: string; // Base64 buffer data
   };
   createdAt: string;
   updatedAt: string;
   isActive: boolean;
   paragraphs: string[];
   videoUrl: string;
   __v: number;
}

const Banner = () => {
   const [apiData, setApiData] = useState<NewsItem[] | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const loadData = async () => {
         const data = await fetchMainNews();
         if (data && data.success && data.data) {
            setApiData(data.data);
         }
         setLoading(false);
      };
      loadData();
   }, []);

   // Helper function to get image source as StaticImageData
   const getImageSource = (thumb?: NewsItem['thumb'] | string | any): StaticImageData | null => {
      let src: string = '';

      // Handle binary data from database (Binary.createFromBase64 creates base64 string)
      if (thumb?.data) {
         try {
            // Check if data is already base64 string (from Binary.createFromBase64)
            if (typeof thumb.data === 'string' && thumb.data.length > 0) {
               src = `data:${thumb.mimetype || 'image/jpeg'};base64,${thumb.data}`;
            } else {
               // Fallback: convert Buffer/Binary data to base64
               const base64String = Buffer.from(thumb.data).toString('base64');
               src = `data:${thumb.mimetype || 'image/jpeg'};base64,${base64String}`;
            }
         } catch (error) {
            console.error('Error converting binary data to base64:', error);
            return null;
         }
      }

      // Handle string filename
      else if (typeof thumb === 'string') {
         // Check if it's already a full URL
         if (thumb.startsWith('http://') || thumb.startsWith('https://')) {
            src = thumb;
         } else {
            // Prepend server URL for filename
            src = `https://news-backend-ashy.vercel.app/uploads/${thumb}`;
         }
      }

      // Handle object with filename property
      else if (thumb?.filename) {
         src = `https://news-backend-ashy.vercel.app/uploads/${thumb.filename}`;
      }

      // Handle object with path property
      else if (thumb?.path) {
         // Check if path is already a full URL
         if (thumb.path.startsWith('http://') || thumb.path.startsWith('https://')) {
            src = thumb.path;
         } else {
            // Prepend server URL
            src = `https://news-backend-ashy.vercel.app/uploads/${thumb.path}`;
         }
      }

      // If we have a src, return StaticImageData object
      if (src) {
         return {
            src,
            width: 400,
            height: 250,
            blurDataURL: src
         };
      }

      return null;
   };

   // Use API data if available, otherwise fallback to static data
   const displayData = apiData ? {
      mainPost: apiData[0] ? {
         id: apiData[0]._id,
         slug: apiData[0].slug,
         thumb: getImageSource(apiData[0].thumb) ?? bannerData.mainPost.thumb,
         title: apiData[0].title,
         author: "நிர்வாகி",
         date: apiData[0].date,
         timeAgo: apiData[0].time,
         excerpt: apiData[0].excerpt
      } : bannerData.mainPost,
      smallPosts: apiData.slice(1, 3).map((post, index) => ({
         id: post._id,
         slug: post.slug,
         thumb: getImageSource(post.thumb) ?? bannerData.smallPosts[index]?.thumb ?? bannerData.smallPosts[0].thumb,
         title: post.title,
         author: "நிர்வாகி",
         date: post.date,
         tag: "செய்தி"
      }))
   } : bannerData;

   return (

      <section className="banner-post-area-five pt-50">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-9">
                  <div className="news-banner-post-wrap">
                     <div className="row">
                        <div className="col-67 order-0 order-lg-2">
                           {loading ? (
                              <div className="banner-post-six">
                                 <div className="banner-post-thumb-six">
                                    <div className="skeleton skeleton-main-thumb"></div>
                                 </div>
                                 <div className="banner-post-content-six">
                                    <div className="skeleton skeleton-main-title"></div>
                                    <div className="blog-post-meta">
                                       <ul className="list-wrap">
                                          <li><div className="skeleton skeleton-main-meta"></div></li>
                                          <li><div className="skeleton skeleton-main-meta"></div></li>
                                       </ul>
                                    </div>
                                    <div className="skeleton skeleton-main-excerpt"></div>
                                    <div className="skeleton skeleton-main-excerpt skeleton-main-excerpt-short"></div>
                                 </div>
                              </div>
                           ) : (
                              <div className="banner-post-six">
                                 <div className="banner-post-thumb-six">
                                    <Link href={`/news-details/${displayData.mainPost.slug}`}><Image src={displayData.mainPost.thumb} alt="" width={600} height={400} /></Link>
                                 </div>
                                 <div className="banner-post-content-six">
                                    {/* <Link href="/blog" className="post-tag-two">{displayData.mainPost.tag}</Link> */}
                                    <h2 className="post-title bold-underline"><Link href={`/news-details/${displayData.mainPost.slug}`}>{displayData.mainPost.title}</Link>
                                    </h2>
                                    <div className="blog-post-meta">
                                       <ul className="list-wrap">
                                          {/*   <li><i className="flaticon-user"></i>by<Link href="/author">{displayData.mainPost.author}</Link></li> */}
                                          <li><i className="flaticon-calendar"></i>{displayData.mainPost.date}</li>
                                          <li><i className="flaticon-history"></i>{displayData.mainPost.timeAgo}</li>
                                       </ul>
                                    </div>
                                    <p>{displayData.mainPost.excerpt}</p>
                                 </div>
                              </div>
                           )}
                        </div>

                        <div className="col-33">
                           <div className="news-banner-small-post">
                              {loading ? (
                                 <>
                                    {/* Skeleton for first small post */}
                                    <div className="banner-post-five">
                                       <div className="banner-post-thumb-five">
                                          <div className="skeleton skeleton-thumb"></div>
                                       </div>
                                       <div className="banner-post-content-five">
                                          <div className="skeleton skeleton-title"></div>
                                          <div className="blog-post-meta">
                                             <ul className="list-wrap">
                                                <li><div className="skeleton skeleton-meta"></div></li>
                                                <li><div className="skeleton skeleton-meta"></div></li>
                                             </ul>
                                          </div>
                                       </div>
                                    </div>
                                    {/* Skeleton for second small post */}
                                    <div className="banner-post-five">
                                       <div className="banner-post-thumb-five">
                                          <div className="skeleton skeleton-thumb"></div>
                                       </div>
                                       <div className="banner-post-content-five">
                                          <div className="skeleton skeleton-title"></div>
                                          <div className="blog-post-meta">
                                             <ul className="list-wrap">
                                                <li><div className="skeleton skeleton-meta"></div></li>
                                                <li><div className="skeleton skeleton-meta"></div></li>
                                             </ul>
                                          </div>
                                       </div>
                                    </div>
                                 </>
                              ) : (
                                 displayData.smallPosts.map((post) => (
                                    <div key={post.id} className="banner-post-five">
                                       <div className="banner-post-thumb-five">
                                          <Link href={`/news-details/${post.slug}`}><Image src={post.thumb} alt="" width={300} height={200} /></Link>
                                       </div>
                                       <div className="banner-post-content-five">
                                         {/*  <Link href="/blog" className="post-tag-four">{post.tag}</Link> */}
                                          <h2 className="post-title"><Link href={`/news-details/${post.slug}`}>{post.title}</Link>
                                          </h2>
                                          <div className="blog-post-meta">
                                             <ul className="list-wrap">
                                                {/* <li><i className="flaticon-user"></i>by<Link href="/author">{post.author}</Link></li> */}
                                                <li><i className="flaticon-calendar"></i>{post.date}</li>
                                                 <li><i className="flaticon-history"></i>{displayData.mainPost.timeAgo}</li>
                                             </ul>
                                          </div>
                                       </div>
                                    </div>
                                 ))
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                 {/*  <AdBanner /> */}

                  <TodayPost />
               </div>
               <BannerSidebar />
            </div>
         </div>
      </section>
   )
}

export default Banner
