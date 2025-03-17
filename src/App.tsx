import { Fragment } from "react/jsx-runtime";
import "./App.css";
import { FormInputProduts, productList } from "./componnet/data";
import ProductCard from "./componnet/ProductCard";
import Modal from "./componnet/ui/Modal";
import { useState } from "react";
import Button from "./componnet/ui/Button";

function App() {
  const renderProduct = productList.map((p) => <ProductCard product={p} />);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const renderFormProduts = FormInputProduts.map((i) => (
    <div className="mb-1 flex  flex-col ">
      <label htmlFor={i.name} className="text-black">{i.lable}:</label>
      <input
        type="`${i.type}`"
        className="border-1 text-gray-300"
        id={i.id}
      />
    </div>
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
          {renderProduct}
        </div>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="Add a new product"
        >
          {renderFormProduts}
          <Button
            classname="bg-emerald-500 w-full"
            onclick={() => {
              closeModal();
            }}
          >
            submit
          </Button>
        </Modal>
      </main>
    </Fragment>
  );
}

export default App;
