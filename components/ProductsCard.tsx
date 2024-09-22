import React from 'react'

const ProductsCard = ({title}:{title:string}) => {
  return (
<div className="text-center mb-8 px-4">
  <h5 className="text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h5>
</div>

  )
}

export default ProductsCard