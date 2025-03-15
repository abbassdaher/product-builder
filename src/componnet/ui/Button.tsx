import { ReactNode, } from "react";

interface IProps {
  children: ReactNode;
  classname?: string;
  onclick?:()=>void;
}

const Button = ({ children, classname,onclick, ...rest }: IProps) => {
  return (
    <button 
      {...rest}
      className={`${classname}   cursor-pointer rounded text-white font-semibold`}
      onClick={onclick}
     >
      {children}
    </button>
  );
};
export default Button;
