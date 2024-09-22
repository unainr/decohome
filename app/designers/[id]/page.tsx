import BookingForm from '@/components/BookingForm';
import PortfolioProjects from '@/components/PortfolioProjects';

// Sample designer data (replace with actual data fetching logic)
const designers = {
  1: {
    id: 1,
    name: 'Emily Clark',
    bio: 'A passionate designer specializing in sustainable home decor, Emily combines eco-friendly practices with modern aesthetics to create beautiful living spaces.',
    portfolio: [
      { projectName: 'Project 1', description: 'A serene living room designed with reclaimed wood and natural fibers, promoting a warm and inviting atmosphere.', image: '/images/port-4-img-3.jpg' },
      { projectName: 'Project 2', description: 'An innovative kitchen featuring energy-efficient appliances and sustainable materials for a stylish yet responsible culinary space.', image: '/images/port-4-img-8.jpg' },
      { projectName: 'Project 3', description: 'A cozy bedroom that emphasizes organic materials and minimalism, creating a peaceful retreat from the outside world.', image: '/images/port-4-img-7.jpg' },
      { projectName: 'Project 4', description: 'An outdoor space that blends seamlessly with nature, using native plants and eco-friendly furnishings.', image: '/images/port-4-img-6.jpg' },
      { projectName: 'Project 5', description: 'A multifunctional room that balances style and sustainability, perfect for modern living.', image: '/images/port-4-img-5.jpg' },
    ],
    image: '/images/H1-team-img-5.jpg',
  },
  2: {
    id: 2,
    name: 'Sophia Taylor',
    bio: 'An expert in modern minimalist interiors, Sophia creates spaces that emphasize simplicity and functionality, without compromising on elegance.',
    portfolio: [
      { projectName: 'Project 1', description: 'A minimalist bedroom characterized by clean lines and a neutral palette, fostering tranquility and relaxation.', image: '/images/port-4-img-9.jpg' },
      { projectName: 'Project 2', description: 'A stylish dining area that embodies modern design principles, with sleek furniture and a focus on light and space.', image: '/images/port-4-img-1.jpg' },
     
      { projectName: 'Project B55', description: 'An office space that promotes productivity through a minimalist approach, combining form and function seamlessly.', image: '/images/b55.jpg' },
    ],
    image: '/images/H1-team-img-6.jpg',
  },
  3: {
    id: 3,
    name: 'Olivia Brown',
    bio: 'Focusing on vibrant and eclectic designs, Olivia infuses personality into her projects, creating spaces that tell a story.',
    portfolio: [
      { projectName: 'Gallery Project 1', description: 'A colorful living room filled with bold art pieces and unique decor that reflects the owner’s personality.', image: '/images/port-s-img-16.jpg' },
      { projectName: 'Gallery Project 2', description: 'An office space adorned with eclectic furnishings and lively colors, designed to inspire creativity and collaboration.', image: '/images/port-s-img-17.jpg' },
      { projectName: 'Gallery Project 3', description: 'A playful children’s room featuring whimsical decor and vibrant colors, designed for both fun and functionality.', image: '/images/port-s-img-14.jpg' },
    ],
    image: '/images/H1-team-img-7.jpg',
  },
  4: {
    id: 4,
    name: 'Liam Johnson',
    bio: 'An expert in luxury residential design, Liam crafts sophisticated spaces that exude elegance and refinement, tailored to the discerning client.',
    portfolio: [
      { projectName: 'Luxury Project 1', description: 'A grand living room featuring exquisite furnishings and high-end finishes, ideal for entertaining guests.', image: '/images/port-s-img-20.jpg' },
      { projectName: 'Luxury Project 2', description: 'An elegant dining area that blends classic design elements with modern comfort for unforgettable dining experiences.', image: '/images/port-s-img-11.jpg' },
      { projectName: 'Luxury Project 3', description: 'A luxurious master suite that combines comfort and style, with breathtaking views and plush amenities.', image: '/images/port-img-5.jpg' },
    ],
    image: '/images/H1-team-img-2.jpg',
  },
  5: {
    id: 5,
    name: 'Noah Davis',
    bio: 'Specializing in industrial style interiors, Noah creates spaces that embrace raw materials and an urban aesthetic, resulting in striking and functional designs.',
    portfolio: [
      { projectName: 'Gallery Project 2', description: 'An industrial loft that showcases exposed brick and metal accents, blending rustic charm with modern living.', image: '/images/port-s-img-17.jpg' },
      { projectName: 'Gallery Project 3', description: 'A creative workspace that balances industrial elements with comfort, fostering an inspiring environment.', image: '/images/port-s-img-14.jpg' },
    ],
    image: '/images/H1-team-img-3.jpg',
  },
  6: {
    id: 6,
    name: 'Ethan Wilson',
    bio: 'Focused on contemporary office spaces, Ethan designs functional and aesthetically pleasing work environments that enhance productivity and collaboration.',
    portfolio: [
      { projectName: 'Luxury Project 1', description: 'A modern office layout featuring collaborative spaces and cutting-edge design.', image: '/images/port-s-img-20.jpg' },
      { projectName: 'Luxury Project 2', description: 'A stylish meeting room equipped with the latest technology, designed to impress clients.', image: '/images/port-s-img-11.jpg' },
      { projectName: 'Luxury Project 3', description: 'An ergonomic workspace that prioritizes employee comfort while maintaining a sleek appearance.', image: '/images/port-img-5.jpg' },
    ],
    image: '/images/H1-team-img-8.jpg',
  },
};


interface DesignerProfileProps {
  params: { id: string };
}

const DesignerProfilePage = ({ params }: DesignerProfileProps) => {
  const designer = designers[params.id as unknown as keyof typeof designers];

  if (!designer) return <p>Designer not found.</p>;

  return (
    <div className="container mx-auto p-6">
    {/* Designer Profile */}
    <div className="flex flex-col items-center  rounded-lg p-6 border transition-transform duration-200">
      <img 
        src={designer.image} 
        alt={designer.name} 
        className="h-64 w-64 object-cover rounded-full border-4 border-blue-300 mb-4" 
      />
      <h1 className="text-5xl font-extrabold  mb-2 text-center">{designer.name}</h1>
      <p className="text-gray-600 text-lg mb-4 text-center">{designer.bio}</p>
      <div className="flex items-center space-x-4 mb-4">
        <button className="bg-blue-600 py-2 px-6 rounded-lg transition-colors duration-200 font-semibold hover:bg-blue-700">
          Message
        </button>
        <button className=" py-2 px-6 rounded-lg transition-colors duration-200 font-semibold ">
          Follow
        </button>
      </div>
    </div>
  
    {/* Portfolio Projects */}
    <div className="mt-8  rounded-lg border  p-6 transition-transform duration-200">
      <h3 className="text-4xl font-bold  mb-4 border-b-2 border-blue-600 pb-2">Portfolio Projects</h3>
      <PortfolioProjects projects={designer.portfolio} />
    </div>
  
    {/* Booking Form */}
    <div className="mt-8  rounded-lg border  p-6 transition-transform duration-200">
      <h3 className="text-4xl font-bold  mb-4 border-b-2 border-blue-600 pb-2">Book a Consultation</h3>
      <BookingForm designerId={designer.id.toString()} />
    </div>
  </div>
  
  
  
  );
};

export default DesignerProfilePage;
