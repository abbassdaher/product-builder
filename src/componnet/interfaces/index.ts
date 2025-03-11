export interface Iproduct {
  id?: number;
  imageUrl: string;
  title: string;
  description: string;
  color:string[]
  price: string;
  category: {
    id?: number;
    name: string;
    imageUrl: string;
  };
}
