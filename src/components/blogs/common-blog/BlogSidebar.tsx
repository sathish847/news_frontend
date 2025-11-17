"use client"
import Category from "@/components/common/Category"
import SocialIcon from "@/components/common/SocialIcon"
import Image, { StaticImageData } from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";

import { fetchAllNews } from "./NewsApiService";

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


const BlogSidebar = () => {
   const [apiData, setApiData] = useState<NewsItem[] | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const loadData = async () => {
         const data = await fetchAllNews();
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

   return (
      <div className="col-30">
         <div className="sidebar-wrap">
            {/* Banner Section */}
            <div className="sidebar-widget">
               <div className="widget-title mb-30">
                  <h6 className="title">சமீபத்திய செய்திகள்</h6>
                  <div className="section-title-line"></div>
               </div>
               {loading ? (
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
               ) : apiData && apiData.length > 0 ? (
                  apiData.slice(0, 6).map((post) => (
                     <div key={post._id} className="banner-post-five">
                        <div className="banner-post-thumb-five">
                           <Link href={`/news-details/${post.slug}`}>
                              <Image
                                 src={getImageSource(post.thumb) || { src: '/placeholder.jpg', width: 300, height: 200 }}
                                 alt=""
                                 width={300}
                                 height={200}
                              />
                           </Link>
                        </div>
                        <div className="banner-post-content-five">
                           <h2 className="post-title">
                              <Link href={`/news-details/${post.slug}`}>{post.title}</Link>
                           </h2>
                           <div className="blog-post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>{post.date}</li>
                                 <li><i className="flaticon-history"></i>{post.time}</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  ))
               ) : (
                  <div className="banner-post-five">
                     <div className="banner-post-content-five">
                        <p>No news data available</p>
                     </div>
                  </div>
               )}
            </div>



         </div>
      </div>
   )
}

export default BlogSidebar
