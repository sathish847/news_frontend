"use client";
import { getWeeklyData, categoryTitles } from "./SpotlightData"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import WeeklySidebar from "./WeeklySidebar"
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

const WeeklyPost = () => {
   const searchParams = useSearchParams();
   const category = searchParams.get('category');
   const [weeklyData, setWeeklyData] = useState<DataType[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         const data = await getWeeklyData();
         setWeeklyData(data);
         setLoading(false);
      };
      fetchData();
   }, []);

   const getTitle = () => {
      return categoryTitles[category || ''] || 'Weekly Best News';
   };
   return (
      <section className="weekly-post-area pt-0 pb-80">
         <div className="container">
            <div className="weekly-post-inner-wrap">
               <div className="row justify-content-center">
                  <div className="col-70">
                     <div className="section-title-wrap-three mb-40">
                        <div className="section-title-three">
                           {/* <h6 className="title">{getTitle()}
                              <span className="section-title-svg">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 246 40" fill="none" preserveAspectRatio="none">
                                    <path d="M10.1448 2.85061C10.6524 1.15867 12.2097 0 13.9761 0H241.624C244.303 0 246.225 2.58294 245.455 5.14939L235.855 37.1494C235.348 38.8413 233.79 40 232.024 40H4.37612C1.69667 40 -0.225117 37.4171 0.544817 34.8506L10.1448 2.85061Z" fill="currentcolor" />
                                 </svg>
                              </span>
                           </h6> */}
                           <div className="section-title-line-three"></div>
                        </div>
                     </div>

                     <div className="weekly-post-item-wrap">
                        {loading ? (
                           // Skeleton for weekly post
                           <div className="weekly-post-item">
                              <div className="weekly-post-thumb">
                                 <div className="skeleton skeleton-weekly-thumb"></div>
                              </div>
                              <div className="weekly-post-content">
                                 <div className="skeleton skeleton-weekly-title"></div>
                                 <div className="blog-post-meta">
                                    <ul className="list-wrap">
                                       <li><div className="skeleton skeleton-weekly-meta"></div></li>
                                       <li><div className="skeleton skeleton-weekly-meta"></div></li>
                                    </ul>
                                 </div>
                                 <div className="skeleton skeleton-weekly-excerpt"></div>
                                 <div className="skeleton skeleton-weekly-excerpt skeleton-weekly-excerpt-short"></div>
                              </div>
                           </div>
                        ) : (
                           weeklyData.filter((items) => items.page === "home_2" && items.category === category).map((item) => (
                              <div key={item.id} className="weekly-post-item">
                                 <div className="weekly-post-thumb">
                                    <Link href={`/news-details/${item.slug}`} suppressHydrationWarning><Image src={item.thumb} alt="" style={{objectFit: 'contain'}} /></Link>
                                 </div>
                                 <div className="weekly-post-content">
                                    <h2 className="post-title"><Link href={`/news-details/${item.slug}`} suppressHydrationWarning>{item.title}</Link></h2>
                                    <div className="blog-post-meta">
                                       <ul className="list-wrap">
                                          <li><i className="flaticon-calendar"></i>{item.date}</li>
                                          <li><i className="flaticon-history"></i>{item.time}</li>
                                       </ul>
                                    </div>
                                    <p>{item.excerpt}</p>
                                 </div>
                              </div>
                           ))
                        )}
                     </div>
                  </div>

                  <WeeklySidebar />
               </div>
            </div>
         </div>
      </section>
   )
}

export default WeeklyPost
