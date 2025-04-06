import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
  
}

const ColorsProducts = ({ color,...rest }: IProps) => {
  return (
    <span
      className={` rounded-full w-5 h-5 me-1 cursor-pointer`}
      // add color in style  becouse tailwind not seeing the colors tailwind is runtime not build time
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
};
export default ColorsProducts;
