
export interface Iproduct {
  id?: string;
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
  name: 'title'|'description'|'imageUrl'|'price';
  lable: string;
  type: string;
}
