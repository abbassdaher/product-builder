import {ReactNode, ButtonHTMLAttributes } from "react";

interface IProps {
children:ReactNode,
classname?: string
}

const Button = ({children,classname,...rest }: IProps) => {
  return <button  {...rest} className={`${classname} w-full  cursor-pointer rounded text-white font-semibold`}>
  {children}
</button>;
};
export default Button