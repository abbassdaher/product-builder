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

function App() {
  const renderProduct = productList.map((p) => <ProductCard product={p} />);
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
  console.log("error:", msgErrorValidation);
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
    setMsgErrorValidation(productValidations({ ...product, [id]: value }));
  }
  // console.log(product);
  // form of input product
  const renderFormProduts = FormInputProduts.map((i) => (
    <div className="mb-1 flex  flex-col ">
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
  const renderColorOFProduct = ColorInputProduct.map((i) => (
    // add color in style  becouse tailwind not seeing the colors tailwind is runtime not build time
    <span
      className={` rounded-full w-5 h-5 me-1 cursor-pointer`}
      style={{ backgroundColor: i }}
    />
  ));
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

    console.log("send the product to server");
  }

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
          {renderProduct}
        </div>
        {/* modal */}
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="Add a new product"
        >
          {/* form of modal */}
          <form onSubmit={submitHandler}>
            {renderFormProduts}
            <div className="flex m-1 ">{renderColorOFProduct}</div>

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
