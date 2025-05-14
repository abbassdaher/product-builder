
export interface Iproduct {
  id?: string;
  imageUrl: string;
  title: string;
  description: string;
  color: string[];
  price: number;
  category: {
    id?: string;
    name: string;
    imageUrl: string;
  };
}
export interface IFormInput {
  id: string;
  name: 'title'|'description'|'imageUrl'|'price';
  lable: string;
  type: string;
}
export interface ICategory{
  id:string,
  name:string,
  imageUrl:string
}
