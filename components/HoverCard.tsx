import React from 'react'
import CardHoverChild from './CardHoverChild';
const HoverCard = () => {
  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-5 mx-auto">
      <div className="flex flex-wrap -mx-4 -mb-5 text-left">
    
        <CardHoverChild cardimg = "/images/hovercard1.jpg" newarrivals = "NEW ARRIVALS" description = "Tiny Plant Pots"/>
        <CardHoverChild cardimg = "/images/hovercard.jpg" newarrivals = "NEW COLLECTION" description = "Sofa Collection"/>
      </div>
    </div>
  </section>
  

  )
}

export default HoverCard