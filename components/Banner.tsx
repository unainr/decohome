import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
const Banner = () => {
  return (
    <div className="mx-auto overflow-hidden relative">
    <Carousel>
      <CarouselContent>
        {/* Elegant Living Room Slide */}
        <CarouselItem className="relative">
          <img src="/images/1.jpg" alt="Elegant Living Room" className="w-full h-[80vh] object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center p-6">
              <h2 className="text-white text-3xl lg:text-5xl font-semibold mb-4">Elegant Living Room</h2>
              <p className="text-white text-base lg:text-xl">
                Discover the beauty of minimalistic design with our curated selection of home decor items.
              </p>
              <Button variant="outline" className='my-3'>
                Shop Now
              </Button>
            </div>
          </div>
        </CarouselItem>
  
        {/* Stylish Bedroom Slide */}
        <CarouselItem className="relative">
          <img src="/images/2.jpg" alt="Stylish Bedroom" className="w-full h-[80vh] object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center p-6">
              <h2 className="text-white text-3xl lg:text-5xl font-semibold mb-4">Stylish Bedroom</h2>
              <p className="text-white text-base lg:text-xl">
                Transform your bedroom into a cozy retreat with our exclusive home decor collection.
              </p>
              <Button variant="outline" className='my-3'>
                Explore Bedroom Collection
              </Button>
            </div>
          </div>
        </CarouselItem>
  
        {/* Modern Kitchen Slide */}
        <CarouselItem className="relative">
          <img src="/images/3.jpg" alt="Modern Kitchen" className="w-full h-[80vh] object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center p-6">
              <h2 className="text-white text-3xl lg:text-5xl font-semibold mb-4">Modern Kitchen</h2>
              <p className="text-white text-base lg:text-xl">
                Explore modern kitchen designs with our range of stylish and functional decor items.
              </p>
              <Button variant="outline" className='my-3'>
                View Kitchen Ideas
              </Button>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
  
      {/* Carousel Navigation Buttons */}
      <CarouselPrevious className="left-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-opacity-75 rounded-full shadow-lg transition duration-300" />
      <CarouselNext className="right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-opacity-75 rounded-full shadow-lg transition duration-300" />
    </Carousel>
  </div>
  
  
  )
}

export default Banner