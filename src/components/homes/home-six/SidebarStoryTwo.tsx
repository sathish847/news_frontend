import Link from "next/link";

import { sidebarStoryData } from "./HomeSixBannerData";

const SidebarStoryTwo = () => {
   return (
      <div className="sidebar-widget-three">
         <div className="widget-title widget-title-three mb-20">
            <div className="section-title-line"></div>
            <h2 className="title">Top Stories</h2>
         </div>
         <div className="stories-post-wrap-two">
            {sidebarStoryData.map((item) => (
               <div key={item.id} className="stories-post-two">
                  <h2 className="number">{item.id}.</h2>
                  <div className="stories-post-content">
                     <h5 className="post-title"><Link href="/blog-details">{item.title}</Link></h5>
                     <div className="blog-post-meta">
                        <ul className="list-wrap">
                           <li><i className="flaticon-calendar"></i>{item.date}</li>
                        </ul>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default SidebarStoryTwo
