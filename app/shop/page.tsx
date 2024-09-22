import AboutBanner from '@/components/AboutBanner'
import ProductList from '@/components/ProductList'
import ProductsCard from '@/components/ProductsCard'
import { Metadata } from 'next'

import React from 'react'

const Shop = () => {
  return (
    <>
    <AboutBanner bannertitle = "  All Products" bannertext = "We are passionate about transforming your living spaces with exquisite home decor and fragrances. Our carefully curated collection blends elegance and quality, ensuring every piece brings joy and comfort to your home."/>
    <ProductsCard title= "All Products"/>
    <ProductList productsArrayName="products2"/>
    <ProductList productsArrayName="products"/>
    <ProductList productsArrayName="products1"/>
    </>
  )
}

export default Shop
export const metadata: Metadata = {
    title: "Shop Home Decor | DecorDreamscape",
    description: "Browse our curated collection of home decor products. From furniture to accessories, find everything you need to enhance your living space.",
  };
  