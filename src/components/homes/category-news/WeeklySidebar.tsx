"use client";
import { getWeeklySidebarData } from "./SpotlightData"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

interface DataType {
   id: number;
   page: string;
   category?: string;
   slug?: string;
   thumb: any;
   tag: string;
   title: string;
   excerpt?: string;
   date: string;
   time?: string;
   class_name?: string;
   paragraphs?: string[];
   images?: any[];
   videoUrl?: string;
}

const WeeklySidebar = () => {
   const searchParams = useSearchParams();
   const category = searchParams.get('category');
   const [weeklySidebarData, setWeeklySidebarData] = useState<DataType[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         const data = await getWeeklySidebarData();
         setWeeklySidebarData(data);
         setLoading(false);
      };
      fetchData();
   }, []);

   return (
      <div className="col-30">
         <div className="sidebar-wrap sidebar-wrap-two">
            <div className="sidebar-widget sidebar-widget-two">
               <div className="widget-title-two mb-30">
                  {/* <h6 className="title">Hot News
                     <span className="section-title-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 246 40" fill="none" preserveAspectRatio="none">
                           <path d="M10.1448 2.85061C10.6524 1.15867 12.2097 0 13.9761 0H241.624C244.303 0 246.225 2.58294 245.455 5.14939L235.855 37.1494C235.348 38.8413 233.79 40 232.024 40H4.37612C1.69667 40 -0.225117 37.4171 0.544817 34.8506L10.1448 2.85061Z" fill="currentcolor" />
                        </svg>
                     </span>
                  </h6> */}
                  <div className="section-title-line-three"></div>
               </div>
               <div className="hot-post-wrap">
                  {loading ? (
                     // Skeleton for hot post items
                     <>
                        <div className="hot-post-item">
                           <div className="hot-post-thumb">
                              <div className="skeleton skeleton-sidebar-thumb"></div>
                           </div>
                           <div className="hot-post-content">
                              <div className="skeleton skeleton-sidebar-title"></div>
                              <div className="blog-post-meta">
                                 <ul className="list-wrap">
                                    <li><div className="skeleton skeleton-sidebar-meta"></div></li>
                                    <li><div className="skeleton skeleton-sidebar-meta"></div></li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                        <div className="hot-post-item">
                           <div className="hot-post-thumb">
                              <div className="skeleton skeleton-sidebar-thumb"></div>
                           </div>
                           <div className="hot-post-content">
                              <div className="skeleton skeleton-sidebar-title"></div>
                              <div className="blog-post-meta">
                                 <ul className="list-wrap">
                                    <li><div className="skeleton skeleton-sidebar-meta"></div></li>
                                    <li><div className="skeleton skeleton-sidebar-meta"></div></li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </>
                  ) : (
                     weeklySidebarData.filter((item) => item.page === "home_2" && item.category === category).map((item) => (
                        <div key={item.id} className="hot-post-item">
                           <div className="hot-post-thumb">
                              <Link href={`/news-details/${item.slug}`} suppressHydrationWarning><Image src={item.thumb} alt="" /></Link>
                           </div>
                           <div className="hot-post-content">
                              <h4 className="post-title"><Link href={`/news-details/${item.slug}`} suppressHydrationWarning>{item.title}</Link></h4>
                              <div className="blog-post-meta">
                                 <ul className="list-wrap">
                                    <li><i className="flaticon-calendar"></i>{item.date}</li>
                                    <li><i className="flaticon-history"></i>{item.time || 'N/A'}</li>
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
   )
}

export default WeeklySidebar
