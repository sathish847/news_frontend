"use client"
import VideoPopup from "@/modals/VideoPopup";
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react";

interface NewsItem {
   _id: string;
   title: string;
   excerpt: string;
   slug: string;
   date: string;
   time: string;
   category: string;
   thumb?: {
      filename: string;
      originalName: string;
      mimetype: string;
      size: number;
      data?: string;
   };
   createdAt: string;
   updatedAt: string;
   isActive: boolean;
   paragraphs: string[];
   videoUrl: string;
   __v: number;
}

const fetchNewsData = async () => {
   try {
      const response = await fetch('https://news-backend-ashy.vercel.app/api/subnews/public');
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched subnews data:', data);
      return data;
   } catch (error) {
      console.error('Error fetching subnews:', error);
      return null;
   }
};

const SportArea = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);
   const [apiData, setApiData] = useState<NewsItem[] | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const loadData = async () => {
         const data = await fetchNewsData();
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

   // Filter API data for cinema category only
   const displayData = apiData ? apiData.filter(post => post.category === "சினிமா").slice(0, 4).map((post, index) => ({
      id: post._id,
      slug: post.slug,
      thumb: getImageSource(post.thumb) || { src: '/placeholder.jpg', width: 400, height: 250 },
      tag: "Cinema",
      title: post.title,
      date: post.date,
      time: post.time,
      description: post.excerpt
   })) : [];

   return (
      <>
         <div className="sports-post-wrap">
            <div className="section-title-wrap mb-30">
               <div className="section-title section-title-four">
                  <h2 className="title">சினிமா செய்திகள்</h2>
               </div>
               <div className="section-title-line"></div>
            </div>
            <div className="row">
               <div className="col-lg-8">
                  {loading ? (
                     <div className="sports-post">
                        <div className="sports-post-thumb">
                           <div className="skeleton skeleton-main-thumb"></div>
                        </div>
                        <div className="sports-post-content">
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
                  ) : displayData.length > 0 ? (
                     <div className="sports-post">
                        <div className="sports-post-thumb">
                           <Link href={`/news-details/${displayData[0].slug}`}><Image src={displayData[0].thumb} alt="" /></Link>
                           {/* <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="paly-btn popup-video"><i className="fas fa-play"></i></a> */}
                        </div>
                        <div className="sports-post-content">
                           <h4 className="post-title bold-underline"><Link href={`/news-details/${displayData[0].slug}`}>{displayData[0].title}</Link></h4>
                           <div className="blog-post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>{displayData[0].date}</li>
                                 {displayData[0].time && <li><i className="flaticon-history"></i>{displayData[0].time}</li>}
                              </ul>
                           </div>
                           <p>{displayData[0].description}</p>
                        </div>
                     </div>
                  ) : (
                     <div className="sports-post">
                        <div className="sports-post-content">
                           <p>No cinema news available</p>
                        </div>
                     </div>
                  )}
               </div>
               <div className="col-lg-4">
                  <div className="sidebar-wrap sidebar-wrap-four">
                     {loading ? (
                        <>
                           <div className="horizontal-post-four horizontal-post-five">
                              <div className="horizontal-post-thumb-four">
                                 <div className="skeleton skeleton-thumb"></div>
                              </div>
                              <div className="horizontal-post-content-four">
                                 <div className="skeleton skeleton-title"></div>
                                 <div className="blog-post-meta">
                                    <ul className="list-wrap">
                                       <li><div className="skeleton skeleton-meta"></div></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                           <div className="horizontal-post-four horizontal-post-five">
                              <div className="horizontal-post-thumb-four">
                                 <div className="skeleton skeleton-thumb"></div>
                              </div>
                              <div className="horizontal-post-content-four">
                                 <div className="skeleton skeleton-title"></div>
                                 <div className="blog-post-meta">
                                    <ul className="list-wrap">
                                       <li><div className="skeleton skeleton-meta"></div></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                           <div className="horizontal-post-four horizontal-post-five">
                              <div className="horizontal-post-thumb-four">
                                 <div className="skeleton skeleton-thumb"></div>
                              </div>
                              <div className="horizontal-post-content-four">
                                 <div className="skeleton skeleton-title"></div>
                                 <div className="blog-post-meta">
                                    <ul className="list-wrap">
                                       <li><div className="skeleton skeleton-meta"></div></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </>
                     ) : (
                        displayData.slice(1).map((item) => (
                           <div key={item.id} className="horizontal-post-four horizontal-post-five">
                              <div className="horizontal-post-thumb-four">
                                 <Link href={`/news-details/${item.slug}`}><Image src={item.thumb} alt="" /></Link>
                              </div>
                              <div className="horizontal-post-content-four">
                                 <h4 className="post-title"><Link href={`/news-details/${item.slug}`}>{item.title}</Link></h4>
                                 <div className="blog-post-meta">
                                    <ul className="list-wrap">
                                       <li><i className="flaticon-calendar"></i>{item.date}</li>
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
         {/* video modal start */}
         <VideoPopup
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            videoId="Ml4XCF-JS0k"
         />
         {/* video modal end */}
      </>
   )
}

export default SportArea
