import Banner from "@/components/Banner";
import HoverCard from "@/components/HoverCard";
import LivingBan from "@/components/LivingBan";
import ProductsCard from "@/components/ProductsCard";
import ProductList from "@/components/ProductList";
import BlogComponents from "@/components/BlogComponents";

export default function Home() {
  return (
   <main>

<Banner/>
<LivingBan/>
<ProductsCard title= "Trending"/>


<ProductList productsArrayName="products"/>

<HoverCard/>
<ProductsCard title= "New For You"/>
<ProductList productsArrayName="products1"/>
<BlogComponents/>
   </main>
  );
}
