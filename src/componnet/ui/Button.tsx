import {ReactNode } from "react";

interface IProps {
children:ReactNode,
classname?: string
}

const Button = ({children,classname}: IProps) => {
  return <button className={`${classname} w-full  cursor-pointer rounded text-white font-semibold`}>
  {children}
</button>;
};
export default Button