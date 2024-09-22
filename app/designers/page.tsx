import React from 'react'
import DesignerCard from '@/components/DesignerCard';
import AboutBanner from '@/components/AboutBanner';
const designers = [
  { id: 1, name: 'Emily Clark', bio: 'Specializing in sustainable home decor', image: '/images/H1-team-img-5.jpg' },
  { id: 2, name: 'Sophia Taylor', bio: 'Expert in modern minimalist interiors', image: '/images/H1-team-img-6.jpg' },
  { id: 3, name: 'Olivia Brown', bio: 'Focusing on vibrant and eclectic designs', image: '/images/H1-team-img-7.jpg' },
  { id: 4, name: 'Liam Johnson', bio: 'Expert in luxury residential design', image: '/images/H1-team-img-2.jpg' },
  { id: 5, name: 'Noah Davis', bio: 'Specializing in industrial style interiors', image: '/images/H1-team-img-3.jpg' },
  { id: 6, name: 'Ethan Wilson', bio: 'Focused on contemporary office spaces', image: '/images/H1-team-img-8.jpg' },
  ];
const Designers = () => {
  return (
    <>
    <AboutBanner bannertitle = "  Designer" bannertext = "We are passionate about transforming your living spaces with exquisite home decor and fragrances. Our carefully curated collection blends elegance and quality, ensuring every piece brings joy and comfort to your home."/>
    <div className="container mx-auto">
    <h1 className="text-3xl text-center font-bold my-7">Our Designers</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {designers.map((designer) => (
        <DesignerCard
          key={designer.id}
          id={designer.id}
          name={designer.name}
          bio={designer.bio}
          image={designer.image}
          />
      ))}
    </div>
  </div>
          </>
  )
}

export default Designers