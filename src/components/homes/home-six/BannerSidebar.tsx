"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import StorySidebarOne from "./SidebarStoryOne";
import SidebarStoryTwo from "./SidebarStoryTwo";
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

const BannerSidebar = () => {
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

   // Use API data if available
   const displayData = apiData ? {
      sidebarPosts: apiData.slice(3).map((post) => ({
         id: post._id,
         slug: post.slug,
         thumb: getImageSource(post.thumb),
         title: post.title,
         author: "நிர்வாகி",
         date: post.date,
         timeAgo: post.time,
         excerpt: post.excerpt,
         tag: "செய்தி"
      }))
   } : null;

   return (
      <div className="col-xl-3 col-lg-8">
         <div className="sidebar-wrap-three">
            <div className="sidebar-widget-three">
               <div className="news-banner-small-post">
                  {displayData ? displayData.sidebarPosts.map((post) => (
                     <div key={post.id} className="banner-post-five">
                        <div className="banner-post-thumb-five">
                           {post.thumb && <Link href={`/news-details/${post.slug}`}><Image src={post.thumb} alt="" width={300} height={200} /></Link>}
                        </div>
                        <div className="banner-post-content-five">
                         {/*   <Link href="/blog" className="post-tag-four">{post.tag}</Link>  */}
                           <h2 className="post-title"><Link href={`/news-details/${post.slug}`}>{post.title}</Link>
                           </h2>
                           <div className="blog-post-meta">
                              <ul className="list-wrap">
                                {/*  <li><i className="flaticon-user"></i>by<Link href="/author">{post.author}</Link></li> */}
                                 <li><i className="flaticon-calendar"></i>{post.date}</li>
                                    <li><i className="flaticon-history"></i>{post.timeAgo}</li>
                              </ul>
                           </div>
                           {post.excerpt && (
                              <p>{post.excerpt}</p>
                           )}
                        </div>
                     </div>
                  )) : (
                     <div className="no-data-message">
                        {loading ? (
                           <div className="skeleton-loading">
                              {/* Skeleton for first post */}
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
                                    <div className="skeleton skeleton-excerpt"></div>
                                 </div>
                              </div>
                              {/* Skeleton for second post */}
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
                                    <div className="skeleton skeleton-excerpt"></div>
                                 </div>
                              </div>
                              {/* Skeleton for third post */}
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
                                    <div className="skeleton skeleton-excerpt"></div>
                                 </div>
                              </div>
                           </div>
                        ) : "No data available"}
                     </div>
                  )}
               </div>
            </div>
            {/* <SidebarStoryTwo /> */}
         </div>
      </div>
   )
}

export default BannerSidebar
