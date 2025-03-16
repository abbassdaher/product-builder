import { ReactNode } from "react";

export interface Iproduct {
  id?: number;
  imageUrl: string;
  title: string;
  description: string;
  color: string[];
  price: string;
  category: {
    id?: number;
    name: string;
    imageUrl: string;
  };
}
export interface IFormInput {
  id: string;
  name: string;
  lable: string;
  type: string;
}
