import styles from "./page.module.css";
import HomeContent from "@/components/home-content/homeContent";
import AboutUs from "@/components/about-us/aboutUs";
import Pictures from "@/components/pictures/pictures";
import Header from "@/components/header/header";
import React from "react";
import Footer from "@/components/footer/footer";

export default function Main() {
  return (
    <>
        <Header />
        <HomeContent />
        <AboutUs />
        <Pictures />
        <Footer />
    </>

  );
}
