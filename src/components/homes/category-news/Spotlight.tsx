"use client";
import { getSpotlightData, categoryTitles } from "./SpotlightData"
import Image from "next/image"
import Link from "next/link"
import PopularArea from "./PopularArea"
import SpotlightSidebar from "./SpotlightSidebar"
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

const Spotlight = () => {
   const searchParams = useSearchParams();
   const category = searchParams.get('category');
   const [spotlight_data, setSpotlightData] = useState<DataType[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         const data = await getSpotlightData();
         setSpotlightData(data);
         setLoading(false);
      };
      fetchData();
   }, []);

   const getTitle = () => {
      return categoryTitles[category || ''] || 'Today’s Spotlight';
   };

   return (

      <section className="spotlight-post-area pt-70 pb-30">
         <div className="spotlight-post-inner-wrap">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-100">
                     <div className="spotlight-post-item-wrap">
                        <div className="section-title-wrap-three mb-30">
                           <div className="section-title-three">
                              <h6 className="title">{getTitle()}
                                 <span className="section-title-svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 246 40" fill="none" preserveAspectRatio="none">
                                       <path d="M10.1448 2.85061C10.6524 1.15867 12.2097 0 13.9761 0H241.624C244.303 0 246.225 2.58294 245.455 5.14939L235.855 37.1494C235.348 38.8413 233.79 40 232.024 40H4.37612C1.69667 40 -0.225117 37.4171 0.544817 34.8506L10.1448 2.85061Z" fill="currentcolor" />
                                    </svg>
                                 </span>
                              </h6>
                              <div className="section-title-line-three"></div>
                           </div>
                        </div>

                        <div className="row">
                           <div className="col-12">
                              {loading ? (
                                 <div className="spotlight-post big-post">
                                    <div className="row align-items-center">
                                       <div className="col-lg-6">
                                          <div className="spotlight-post-thumb">
                                             <div className="skeleton skeleton-spotlight-thumb"></div>
                                          </div>
                                       </div>
                                       <div className="col-lg-6">
                                          <div className="spotlight-post-content">
                                             <div className="skeleton skeleton-spotlight-title"></div>
                                             <div className="blog-post-meta" style={{ marginBottom: '12px' }}>
                                                <ul className="list-wrap">
                                                   <li><div className="skeleton skeleton-spotlight-meta"></div></li>
                                                   <li><div className="skeleton skeleton-spotlight-meta"></div></li>
                                                </ul>
                                             </div>
                                             <div className="skeleton skeleton-spotlight-excerpt"></div>
                                             <div className="skeleton skeleton-spotlight-excerpt skeleton-spotlight-excerpt-short"></div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              ) : (
                                 spotlight_data.filter((items) => items.page === "home_2" && items.category === category).slice(0,1).map((item) => (
                                    <div key={item.id} className="spotlight-post big-post">
                                       <div className="row align-items-center">
                                          <div className="col-lg-6">
                                             <div className="spotlight-post-thumb">
                                                <Link href={`/news-details/${item.slug}`} suppressHydrationWarning><Image src={item.thumb} alt="" width={500} height={400} style={{objectFit: 'contain'}} /></Link>
                                             </div>
                                          </div>
                                          <div className="col-lg-6">
                                             <div className="spotlight-post-content">
                                                <h2 className="post-title bold-underline"><Link href={`/news-details/${item.slug}`} suppressHydrationWarning>{item.title}</Link></h2>
                                                <div className="blog-post-meta" style={{ marginBottom: '12px' }}>
                                                   <ul className="list-wrap">
                                                      <li><i className="flaticon-calendar"></i>{item.date}</li>
                                                      <li><i className="flaticon-history"></i>{item.time}</li>
                                                   </ul>
                                                </div>
                                                {item.excerpt && <p className="post-excerpt">{item.excerpt}</p>}
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 ))
                              )}
                           </div>
                        </div>
                     </div>

                   
                  </div>

                 
               </div>
            </div>
         </div>
      </section>
   )
}

export default Spotlight
