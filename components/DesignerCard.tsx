import Link from 'next/link';
import { Button } from './ui/button';

interface DesignerCardProps {
  id: number;
  name: string;
  bio: string;
  image: string;
}

const DesignerCard = ({ id, name, bio, image }: DesignerCardProps) => {
  return (
<div className="max-w-sm mx-auto rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
  <div className="relative">
    <img 
      src={image} 
      alt={name} 
      className="h-48 w-full object-cover object-center" // Responsive height with cover object
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-4">
      <h2 className=" text-white text-2xl font-bold">{name}</h2> {/* Bold title for emphasis */}
    </div>
  </div>

  <div className="p-6 flex flex-col">
    <p className=" text-base mb-4 italic">{bio}</p>
    
    <div className="flex justify-between items-center mt-auto space-x-3">
      <Link href={`/designers/${id}`} passHref>
        <Button > 
          View Profile
        </Button>
      </Link>
     
    </div>
  </div>
</div>



  

  
  
  
  
  );
};

export default DesignerCard;
