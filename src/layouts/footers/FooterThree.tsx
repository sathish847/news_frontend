"use client";

import getFooterData from "@/data/FooterData"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

import footerLogo from "@/assets/img/logo/logo.png";

const FooterThree = () => {
   const [footer_data, setFooterData] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      getFooterData().then((data) => {
         setFooterData(data);
         setIsLoading(false);
      });
   }, []);

   if (isLoading) {
      return (
         <footer>
            <div className="footer-area-four">
               <div className="footer-top footer-top-three">
                  <div className="container">
                     <div className="row">
                        <div className="col-lg-3 col-md-7">
                           <div className="footer-widget">
                              <div className="fw-logo">
                                 <Link href="/"><Image src={footerLogo} alt="" /></Link>
                              </div>
                              <div className="footer-content">
                                 <p>தமிழ்நாடு செய்தித்தாள் வலைத்தளம், சமீபத்திய செய்திகளை தமிழில் வழங்குகிறது.</p>
                              </div>
                           </div>
                        </div>
                        {[...Array(3)].map((_, index) => (
                           <div key={index} className="col-lg-2 col-md-5">
                              <div className="footer-widget">
                                 <h4 className="fw-title skeleton-text" style={{width: '120px', height: '24px'}}></h4>
                                 <div className="footer-link-wrap">
                                    <ul className="list-wrap">
                                       {[...Array(5)].map((_, i) => (
                                          <li key={i}><div className="skeleton-text" style={{width: '100px', height: '16px'}}></div></li>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="footer-bottom footer-bottom-three">
                  <div className="container">
                     <div className="row">
                        <div className="col-md-6">
                           <div className="footer-bottom-menu">
                              <ul className="list-wrap">
                                 <li><Link href="#">Elegantly Planned and Skillfully Crafted by 5Frames Soft Media</Link></li>
                              </ul>
                           </div>
                        </div>
                        <div className="col-md-6">
                           <div className="copyright-text">
                              <p>© 2025 news.com.  All Right Reserved.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      );
   }

   return (
      <footer>
         <div className="footer-area-four">
            <div className="footer-top footer-top-three">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-3 col-md-7">
                        <div className="footer-widget">
                           <div className="fw-logo">
                              <Link href="/"><Image src={footerLogo} alt="" /></Link>
                           </div>
                           <div className="footer-content">
                              <p>தமிழ்நாடு செய்தித்தாள் வலைத்தளம், சமீபத்திய செய்திகளை தமிழில் வழங்குகிறது.</p>
                           </div>
                        </div>
                     </div>
                     {footer_data.map((item) => (
                        <div key={item.id} className={item.class_name}>
                           <div className="footer-widget">
                              <h4 className="fw-title">{item.title}</h4>
                              <div className="footer-link-wrap">
                                 <ul className="list-wrap">
                                    {item.footer_link.map((link: any, i: number) => (
                                       <li key={i}><Link href={link.link}>{link.title}</Link></li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="footer-bottom footer-bottom-three">
               <div className="container">
                  <div className="row">
                     <div className="col-md-6">
                        <div className="footer-bottom-menu">
                           <ul className="list-wrap">
                              <li><Link href="#">Elegantly Planned and Skillfully Crafted by 5Frames Soft Media</Link></li>
                           </ul>
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="copyright-text">
                           <p>© 2025 news.com.  All Right Reserved.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterThree;
