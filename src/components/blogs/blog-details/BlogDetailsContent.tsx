"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import VideoPopup from "@/modals/VideoPopup"

import blogThumb_1 from "@/assets/img/blog/blog_details01.jpg"
import blogThumb_2 from "@/assets/img/blog/blog_details02.jpg"
import blogThumb_3 from "@/assets/img/blog/blog_details03.jpg"

const BlogDetailsContent = ({ single_blog }: any) => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);
   const [currentUrl, setCurrentUrl] = useState('');

   const title = single_blog?.title || "Emerging Global Trends in Leather and Fashion";

   useEffect(() => {
      if (typeof window !== 'undefined') {
         setCurrentUrl(window.location.href);
      }
   }, []);

   // Show skeleton loading if no blog data
   if (!single_blog) {
      return (
         <div className="blog-details-content">
            <div className="blog-details-content-top">
               <div className="skeleton skeleton-title"></div>
               <div className="bd-content-inner">
                  <div className="blog-post-meta">
                     <ul className="list-wrap">
                        <li><div className="skeleton skeleton-meta"></div></li>
                        <li><div className="skeleton skeleton-meta"></div></li>
                     </ul>
                  </div>
                  <div className="blog-details-social">
                     <div className="skeleton skeleton-share"></div>
                  </div>
               </div>
            </div>
            <div className="blog-details-thumb">
               <div className="skeleton skeleton-image"></div>
            </div>
            <div className="skeleton skeleton-paragraph"></div>
            <div className="skeleton skeleton-paragraph"></div>
            <div className="skeleton skeleton-paragraph skeleton-paragraph-short"></div>
         </div>
      );
   }

   return (
      <>
         <div className="blog-details-content">
            <div className="blog-details-content-top">
               <h2 className="title">{single_blog?.title ? single_blog.title : "Emerging Global Trends in Leather and Fashion Nicely Photo Area Shooting With Hand Classic Style"}</h2>
               <div className="bd-content-inner">
                  <div className="blog-post-meta">
                     <ul className="list-wrap">
                        <li><i className="flaticon-calendar"></i>{single_blog?.date || "29 October, 2024"}</li>
                        <li><i className="flaticon-history"></i>{single_blog?.time || "2:00pm"}</li>
                     </ul>
                  </div>
                  <div className="blog-details-social">
                     <ul className="list-wrap">
                        <li><a href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}`} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a></li>
                        <li><a href={`https://www.facebook.com/share.php?u=${encodeURIComponent(currentUrl)}`} rel="nofollow" target="_blank" aria-label="facebook"><svg id="Bold" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" xmlns="https://www.w3.org/2000/svg"><path fill="#000" d="m15.997 3.985h2.191v-3.816c-.378-.052-1.678-.169-3.192-.169-3.159 0-5.323 1.987-5.323 5.639v3.361h-3.486v4.266h3.486v10.734h4.274v-10.733h3.345l.531-4.266h-3.877v-2.939c.001-1.233.333-2.077 2.051-2.077z"></path></svg></a></li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="blog-details-thumb">
               {single_blog?.thumb ? <Image src={single_blog.thumb} alt="image" /> : <Image src={blogThumb_1} alt="image" />}
            </div>
            {single_blog?.paragraphs && single_blog.paragraphs.filter((para: string) => para.trim() !== "").map((para: string, index: number) => {
               // Clean the paragraph by removing quotes from start and end
               const cleanedPara = para.replace(/^["\[]+|["\]]+$/g, '');
               return (
                  <p key={index} className={index === 0 ? "first-info" : ""}>{cleanedPara}</p>
               );
            })}
            {single_blog?.videoUrl ? (
               <div className="blog-details-video">
                  <Image src={single_blog.thumb} alt="" />
                  <a style={{ cursor: "pointer" }} onClick={() => setIsVideoOpen(true)} className="paly-btn popup-video"><i className="fas fa-play"></i></a>
               </div>
            ) : null}
            <div className="blog-details-bottom">
               <div className="row align-items-center">


               </div>
            </div>
         </div>
         {/* video modal start */}
         <VideoPopup
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            videoId={single_blog?.videoUrl || "Ml4XCF-JS0k"}
         />
         {/* video modal end */}
      </>
   )
}

export default BlogDetailsContent
