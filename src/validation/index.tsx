export const productValidations = (product: {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
}) => {
  const error = {
    title:
      product.title.length < 5 || product.title.length > 80
        ? "Title should be at least 5 characters long"
        : "",
    description:
      (product.description.length < 10 || product.description.length > 80)
        ? "Description should be at least 10 characters long"
        : "",
    imageUrl: product.imageUrl.startsWith("data") ? "" : "Invalid image URL",
    price: product.price.match(/^[0-9]+(\.[0-9]{1,2})?$/)
      ? ""
      : "Invalid price format",
  };
  return error;
};
