"use client"
import Image from "next/image"
import NavMenu from "./menu/NavMenu"
import Link from "next/link"
import UseSticky from "@/hooks/UseSticky"
import MobileMenu from "./menu/MobileMenu"
import { useState } from "react"

import logo_1 from "@/assets/img/logo/w_logo.png";
import logo_2 from "@/assets/img/logo/logo.png";

const HeaderThree = () => {

   const { sticky } = UseSticky();
   const [mobileMenu, setMobileMenu] = useState<boolean>(false);
   const [searchOpen, setSearchOpen] = useState<boolean>(false);

   return (
      <>
         <header className="header-style-three">
            <div id="header-fixed-height" className={sticky ? "active-height" : ""}></div>

            <div id="sticky-header" className={`menu-area menu-style-three ${sticky ? "sticky-menu" : ""}`}>
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <div className="menu-wrap">
                           <nav className="menu-nav">
                              <div className="logo">
                                 <Link href="/"><Image src={logo_2} alt="" /></Link>
                              </div>
                              <div className="logo d-none">
                                 <Link href="/"><Image src={logo_1} alt="" /></Link>
                              </div>
                              <div className="navbar-wrap main-menu d-none d-lg-flex">
                                 <NavMenu />
                              </div>
                              <div className="header-search-wrap d-none d-lg-block">
                                 <form onSubmit={(e) => e.preventDefault()}>
                                    <input type="text" placeholder="Search here..." />
                                    <button type="submit"><i className="flaticon-search"></i></button>
                                 </form>
                              </div>
                              <div className="header-top-social d-none d-md-block" style={{marginLeft: '10px'}}>
                                 <ul className="list-wrap" style={{gap: '15px'}}>
                                    <li><Link href="#"><i className="fab fa-facebook-f" style={{color: 'black', fontSize: '24px'}}></i></Link></li>
                                    <li><Link href="#"><i className="fab fa-twitter" style={{color: 'black', fontSize: '24px'}}></i></Link></li>
                                    <li><Link href="#"><i className="fab fa-instagram" style={{color: 'black', fontSize: '24px'}}></i></Link></li>
                                    <li><Link href="#"><i className="fab fa-linkedin-in" style={{color: 'black', fontSize: '24px'}}></i></Link></li>
                                 </ul>
                              </div>
                              <div onClick={() => setMobileMenu(true)} className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
                           </nav>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header >
         <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      </>
   )
}

export default HeaderThree
