import { ReactNode } from "react";
import Image from "./Image";
import Button from "./ui/Button";
import { Iproduct } from "./interfaces";

interface IProps {
  product: Iproduct;
}

const ProductCard = ({ product }: IProps) => {
  const rederColor = product.color.map(color => color)
  console.log(rederColor);
  return (
    <div className="border-1 p-2 m-1 rounded-lg flex flex-col ">
      {/* {console.log(color.map((c) => {
            `<span className="bg-${c}-800 rounded-full w-5 h-5 me-1 cursor-pointer"/>`;
          }))} */}
      <Image
        imageUrl={product.imageUrl}
        alt="product image"
        className="rounded-sm h-40"
      />
      <h2 className="">{product.title}</h2>
      <p className="flex-3">{product.description}</p>
      <span className="flex justify-between items-center ">
        <div>{product.price}</div>
        <Image
          imageUrl={product.category.imageUrl}
          alt="product profile"
          className="rounded-full w-10 h-10 me-1 cursor-pointer"
        />
      </span>

      <div className="flex m-1 ">
        <span className="bg-blue-800 rounded-full w-5 h-5 me-1 cursor-pointer" />
        <span className="bg-amber-600 rounded-full w-5 h-5 me-1 cursor-pointer" />
        <span className="bg-amber-700 rounded-full w-5 h-5 cursor-pointer" />
      </div>

      <div className="flex flex-row justify-between space-x-2 ">
        <Button
          classname={"bg-amber-500"}
          onClick={() => {
            console.log("clicked");
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
