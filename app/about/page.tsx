import AboutBanner from '@/components/AboutBanner';
import AboutCard from '@/components/AboutCard';
import BlogComponents from '@/components/BlogComponents';
import LivingBan from '@/components/LivingBan';
import { Metadata } from 'next';
import React from 'react'

const About = () => {
  return (
    <><AboutBanner bannertitle = "  About Us" bannertext = "We are passionate about transforming your living spaces with exquisite home decor and fragrances. Our carefully curated collection blends elegance and quality, ensuring every piece brings joy and comfort to your home."/>
    <LivingBan/>
    <AboutCard/>
    <BlogComponents/>
    </>
  )
}

export default About
export const metadata: Metadata = {
  title: "About Us | DecorDreamscape",
  description: "Learn more about DecorDreamscape, your go-to source for home decor inspiration and quality products. Our mission is to help you create a beautiful home.",
};
