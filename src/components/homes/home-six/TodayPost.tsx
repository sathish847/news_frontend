"use client"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import VideoPopup from '@/modals/VideoPopup';
import { useState, useEffect } from "react";
import { bannerData } from "./HomeSixBannerData";
import { fetchTrendingNews } from "./NewsApiService";

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

const TodayPost = () => {
   const [apiData, setApiData] = useState<NewsItem[] | null>(null);
   const [loading, setLoading] = useState(true);
   const [isVideoOpen, setIsVideoOpen] = useState(false);

   useEffect(() => {
      const loadData = async () => {
         const data = await fetchTrendingNews();
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
         if (thumb.path.startsWith('http://') || thumb.startsWith('https://')) {
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

   // Use only API data - no static fallbacks
   const displayData = apiData ? apiData.map((post) => ({
      id: post._id,
      slug: post.slug,
      thumb: getImageSource(post.thumb),
      title: post.title,
      author: "நிர்வாகி",
      date: post.date,
      video: post.videoUrl ? true : false
   })) : [];

  return (
    <>
      <section className="today-post-area pt-50">
        <div className="section-title-wrap">
          <div className="section-title section-title-four">
            <h2 className="title">ட்ரெண்டிங் செய்தி</h2>
            <div className="section-title-line"></div>
          </div>
        </div>
        <div className="today-post-wrap">
          <div className="row gutter-40">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="banner-post-five banner-post-seven">
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
                </div>
              ))
            ) : (
              displayData.map((item, index) => (
                <div key={item.id} className="col-lg-4 col-md-6">
                  <div className={`banner-post-five banner-post-seven animate__animated animate__slideInRight`} style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="banner-post-thumb-five">
                      <Link href={`/news-details/${item.slug}`}>
                        {item.thumb ? <Image src={item.thumb} alt="" /> : <div className="no-image-placeholder"></div>}
                      </Link>
                      {item.video &&
                        <a onClick={() => setIsVideoOpen(true)} className="paly-btn popup-video"><i className="fas fa-play"></i></a>}
                    </div>
                    <div className="banner-post-content-five">
                    {/*   <Link href="blog" className="post-tag-four">{item.tag}</Link> */}
                      <h2 className="post-title"><Link href={`/news-details/${item.slug}`}>{item.title}</Link></h2>
                      <div className="blog-post-meta">
                        <ul className="list-wrap">
                        {/*   <li><i className="flaticon-user"></i>by<Link href="/author">Admin</Link></li> */}
                          <li><i className="flaticon-calendar"></i>{item.date}</li>
                                <li><i className="flaticon-history"></i>{bannerData.mainPost.timeAgo}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
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

export default TodayPost
