export const productValidations = (product: {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  color: string[];
}) => {
  const error = {
    title:
      product.title.length < 5 || product.title.length > 80
        ? "Title should be at least 5 characters long"
        : "",
    description:
      product.description.length < 10 || product.description.length > 80
        ? "Description should be at least 10 characters long"
        : "",
    imageUrl: product.imageUrl.startsWith("data") ? "" : "Invalid image URL",
    price: product.price
      ? ""
      : "Invalid price format",
    color: product.color.length === 0 ? "color must be not empty" : "",
  };
  return error;
};
