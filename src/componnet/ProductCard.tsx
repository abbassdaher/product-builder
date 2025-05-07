import Image from "./Image";
import Button from "./ui/Button";
import { Iproduct } from "./interfaces";
// import { productList } from "./data";

interface IProps {
  product: Iproduct;
  // getEditProduct: (valuesOfEditProduct: Iproduct) => void;
  setEditProduct:(product:Iproduct)=>void;
  openEditModal:()=>void
}

const ProductCard = ({ product,setEditProduct,openEditModal }: IProps) => {
  const renderColor = product.color.map((c) => (
    <span
      className="rounded-full w-5 h-5 me-1 cursor-pointer"
      style={{ backgroundColor: c }}
    />
  ));
  return (
    <div className=" border-1 p-2 my-1  rounded-lg flex flex-col max-w-sm  md:mx-1 ">
      <Image
        imageUrl={product.imageUrl}
        alt="product image"
        className="rounded-sm h-60"
      />
      <h2 className="">{product.title}</h2>
      <p className="truncate">{product.description}</p>
      <span className="flex justify-between items-center ">
        <div>{product.price}</div>
        <Image
          imageUrl={product.category.imageUrl}
          alt="product profile"
          className="rounded-full w-10 h-10 me-1 cursor-pointer"
        />
      </span>

      <div className="flex m-1 ">{renderColor}</div>

      <div className="flex flex-row justify-between space-x-2 ">
        <Button
          classname={"bg-amber-500 w-full"}
          onclick={() => {
            // getEditProduct(product);
            setEditProduct(product)
            openEditModal()
          }}
        >
          edit
        </Button>
        <Button classname={"bg-red-400 w-full"}>delte</Button>
      </div>
    </div>
  );
};
export default ProductCard;
