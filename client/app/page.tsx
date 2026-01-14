import Product from "@/components/cards";
import HeroSection from "@/components/hero";
import Header from "@/components/navbar";
import React from "react";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Product />
    </div>
  );
};

export default Home;
