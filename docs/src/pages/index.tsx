import React from "react";
import Hero from "../components/LandingPage/Hero";
import CTA from "../components/LandingPage/Cta";
import Stats from "../components/LandingPage/Stats";
import Models from "../components/LandingPage/Models";
import FAQs from "../components/LandingPage/Faqs";
import Footer from "../components/LandingPage/Footer";
// import { Redirect } from 'react-router-dom';
// import Hero from '../components/LandingPage/Hero';
// import Hero from '../components/LandingPage/Hero';

export default function Home() {
  return (
    <>
      <head>
        <script defer data-domain="gpt-router.writesonic.com" src="https://plausible.io/js/script.js"></script>
      </head>
      <Hero />
      <CTA />
      <Models />
      <Stats />
      <FAQs />
      <Footer />
    </>
  );
}
