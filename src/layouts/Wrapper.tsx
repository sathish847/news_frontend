"use client";
import { ReactNode, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "@/components/common/ScrollToTop";

if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap");
}

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
    useEffect(() => {
        // Set theme to light only
        document.documentElement.setAttribute("tg-theme", "light");
    }, []);

    return <>
        {children}
        <ScrollToTop />
        <ToastContainer position="top-center" />
    </>;
}

export default Wrapper
