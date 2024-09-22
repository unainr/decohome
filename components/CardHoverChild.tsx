import React from 'react'
import { Button } from "@/components/ui/button";
const CardHoverChild = ({cardimg,newarrivals,description}:{cardimg:string,newarrivals:string,description:string}) => {
  return (
    <div className="sm:w-1/2 mb-3 px-4">
          <div className="relative rounded-lg h-4/5 overflow-hidden group">
            <img
              alt="content"
              className="object-cover object-center h-full w-full transition-transform duration-500 ease-in-out transform group-hover:scale-105"
              src={cardimg}
            />
            <div className="absolute inset-0 flex flex-col justify-center px-8 text-left">
              <h2 className="text-xl  font-semibold mb-2">{newarrivals}</h2>
              <h1 className="text-4xl font-bold">{description}</h1>
              <Button variant="outline" className='my-3 w-fit'>
                Shop Now
              </Button>
            </div>
          </div>
        </div>
  )
}

export default CardHoverChild