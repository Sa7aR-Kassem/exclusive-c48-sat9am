import Categories from "@/components/home/Categories/Categories";
import MainSlider from "@/components/home/MainSlider/MainSlider";
import Products from "@/components/home/Products/Products";
import { Separator } from "@/components/ui/separator";
// import { getBrands } from "@/services/brands.service";
export default async function Home() {
  // const brands = await getBrands();
  // console.log("brands", brands);

  return (
    <main>
      <div className="container mx-auto">
        {/* Main Sidler */}

        <MainSlider />

        {/* Categories Slider */}

        <Categories />

        <Separator className={"my-6"} />

        {/* Feature Products */}

        <Products />
      </div>
    </main>
  );
}
