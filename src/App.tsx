import { Fragment } from "react/jsx-runtime";
import "./App.css";
import {
  FormInputProduts,
  productList,
  ColorInputProduct,
} from "./componnet/data";
import ProductCard from "./componnet/ProductCard";
import Modal from "./componnet/ui/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./componnet/ui/Button";
import { Iproduct } from "./componnet/interfaces";
import { productValidations } from "./validation";
import ValidationErrorMSG from "./componnet/ui/ValidationErrorMSG";
import ColorsProducts from "./componnet/ui/ColorsProducts";

function App() {
  // ________state________
  const [isOpen, setIsOpen] = useState(true);
  const [msgErrorValidation, setMsgErrorValidation] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
  });
  const [product, setproduct] = useState<Iproduct>({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    color: [],
    category: {
      name: "",
      imageUrl: "",
    },
  });
  const [colorTemp, setColorTemp] = useState([]);
  const [productsList, setProductsList] = useState<Iproduct[]>(productList);

  // ________Handler________

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function onChangeHandller(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setproduct({ ...product, [id]: value });
    // remove the error msg when verify the condition
    // setMsgErrorValidation(productValidations({ ...product, [id]: value }));
    setMsgErrorValidation({ ...msgErrorValidation, [id]: "" });
  }
  // submit handller
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, imageUrl, price } = product;
    const error = productValidations({
      title,
      description,
      imageUrl,
      price,
    });
    // error massege
    const hasErrorMSG =
      Object.values(error).some((item) => item == "") &&
      Object.values(error).every((item) => item == "");
    if (!hasErrorMSG) {
      setMsgErrorValidation(error);
      return;
    }
    
    setProductsList(prev=>[...prev,product])
    // setColorTemp([])
    setproduct({
      title: "",
      description: "",
      imageUrl: "",
      price: "",
      color: [],
      category: {
        name: "",
        imageUrl: "",
      },
    })
    console.log("productsList: ", productsList);
    console.log(product);
    
    console.log("send the product to server");
  }

  // _______Render________

  const renderProductList = productsList.map((p) => <ProductCard product={p} />);
  console.log("error:", msgErrorValidation);
  // form of input product
  const renderFormProduts = FormInputProduts.map((i) => (
    <div className="mb-2 flex  flex-col ">
      <label htmlFor={i.name} className="text-black">
        {i.lable}:
      </label>
      <input
        type="`${i.type}`"
        className="border-1 text-black border-gray-300 rounded-sm"
        id={i.id}
        name={i.name}
        onChange={onChangeHandller}
      />
      {msgErrorValidation[i.name] && (
        <ValidationErrorMSG msg={msgErrorValidation[i.name]} />
      )}
    </div>
  ));
  // render for color
  const renderColorOFProduct = ColorInputProduct.map((colors) => (
    <ColorsProducts
      color={colors}
      onClick={() => {
        const colorIsNotExist = colorTemp.every((i) => i !== colors);
        console.log("color is exist: ", colorIsNotExist);
        if (colorIsNotExist) {
          setColorTemp((prev) => [...prev, colors]);
          console.log("color temp: ", colorTemp);
        } else {
          setColorTemp((prev) => prev.filter((c) => c !== colors));
        }
        setproduct({ ...product, color: colorTemp });
        // product.color.map((p) => console.log("color:", p));
        // product.color.map((color) => <span>{color}</span>);
      }}
    />
  ));
  // render tags Color
  const renderTagsOfColors = colorTemp.map((pd) => (
    <span
      className="text-white me-1 rounded-lg p-1 mb-1"
      style={{ backgroundColor: pd }}
    >
      {pd}
    </span>
  ));

  return (
    <Fragment>
      <div className=" m-2 flex justify-between items-center ">
        <h1 className="text-3xl font-bold">
          latest<span className="text-indigo-600"> product</span>
        </h1>
        <Button classname={"bg-blue-800 w-20 h-10"} onclick={() => openModal()}>
          open
        </Button>
      </div>

      <main className="container mx-auto flex justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {renderProductList}
        </div>
        {/* modal */}
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="Add a new product"
        >
          {/* form of modal */}
          <form onSubmit={submitHandler} className="">
            {renderFormProduts}

            <div className="flex mb-1 ">{renderColorOFProduct}</div>
            <div className="flex text-black mb-3 flex-wrap ">
              {renderTagsOfColors}
            </div>
            <Button classname="bg-emerald-300 w-full hover:bg-emerald-400">
              submit
            </Button>
          </form>
        </Modal>
      </main>
    </Fragment>
  );
}

export default App;
