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
                        <li><a href={`https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="instagram"><svg enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" xmlns="https://www.w3.org/2000/svg"><path d="m12.017 0c-6.623 0-12.017 5.394-12.017 12.017s5.394 12.017 12.017 12.017 12.017-5.394 12.017-12.017-5.394-12.017-12.017-12.017zm5.073 8.207c-.182.373-.347.69-.497 1.008-.203.421-.375.841-.516 1.26-.138.418-.247.832-.328 1.242-.08.41-.12.802-.12 1.177 0 1.541.541 2.893 1.623 4.055s2.404 1.743 3.945 1.743c.276 0 .549-.03.818-.09.269-.06.52-.148.753-.264.233-.116.444-.252.633-.408.189-.156.36-.334.513-.534.153-.2.288-.418.405-.653.117-.235.213-.49.288-.765.075-.275.113-.562.113-.861 0-.802-.128-1.605-.384-2.409-.256-.804-.605-1.587-1.047-2.349-.442-.762-.96-1.499-1.554-2.211-.594-.712-1.257-1.39-2.001-2.034-.744-.644-1.573-1.193-2.486-1.647-.913-.454-1.907-.681-2.981-.681-1.058 0-2.046.223-2.964.669-.918.446-1.746.991-2.485 1.635-.739.644-1.392 1.315-1.958 2.013-.566.698-.995 1.411-1.287 2.139-.292.728-.438 1.424-.438 2.086 0 .37.04.738.12 1.104.08.366.193.723.34 1.072.147.349.32.683.52 1.002.2.319.418.616.653.891.235.275.49.52.765.735.275.215.57.397.884.546.314.149.646.258.997.327.351.069.718.104 1.1.104 1.541 0 2.893-.541 4.055-1.623s1.743-2.404 1.743-3.945c0-.276-.03-.549-.09-.818-.06-.269-.148-.52-.264-.753-.116-.233-.252-.444-.408-.633-.156-.189-.334-.36-.534-.513-.2-.153-.418-.288-.653-.405-.235-.117-.49-.213-.765-.288-.275-.075-.562-.113-.861-.113-.37 0-.738.04-1.104.12-.366.08-.723.193-1.072.34-.349.147-.683.32-1.002.52-.319.2-.616.418-.891.653-.275.235-.52.49-.735.765-.215.275-.397.57-.546.884-.149.314-.258.646-.327.997-.069.351-.104.718-.104 1.1zm-3.293 6.207c-.276 0-.549-.03-.818-.09-.269-.06-.52-.148-.753-.264-.233-.116-.444-.252-.633-.408-.189-.156-.36-.334-.513-.534-.153-.2-.288-.418-.405-.653-.117-.235-.213-.49-.288-.765-.075-.275-.113-.562-.113-.861 0-.37.04-.738.12-1.104.08-.366.193-.723.34-1.072.147-.349.32-.683.52-1.002.2-.319.418-.616.653-.891.235-.275.49-.52.765-.735.275-.215.57-.397.884-.546.314-.149.646-.258.997-.327.351-.069.718-.104 1.1-.104 1.058 0 1.928.223 2.61.669.682.446 1.21.991 1.584 1.635.374.644.561 1.315.561 2.013 0 .37-.04.738-.12 1.104-.08.366-.193.723-.34 1.072-.147.349-.32.683-.52 1.002-.2.319-.418.616-.653.891-.235.275-.49.52-.765.735-.275.215-.57.397-.884.546-.314.149-.646.258-.997.327-.351.069-.718.104-1.1.104z" fill="#000"/></svg></a></li>
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
