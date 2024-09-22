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
   <div className="max-w-sm mx-auto bg-gradient-to-br rounded-lg shadow-lg overflow-hidden border transition-shadow duration-300 ease-in-out hover:shadow-2xl">
  <img 
    src={image} 
    alt={name} 
    className="h-48 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
  />
  <div className="p-6 flex flex-col">
    <h2 className="text-2xl font-bold mb-1 hover:text-red-600 transition-colors duration-200">{name}</h2>
    <p className=" text-sm mb-4 italic">{bio}</p>
    <div className="mt-auto">
    

    <Button asChild>
  <Link  href={`/designers/${id}`} >View Profile</Link>
</Button>
    </div>
  </div>
</div>

  

  
  
  
  
  );
};

export default DesignerCard;
