import { Fragment } from "react/jsx-runtime";
import "./App.css";
import { productList } from "./componnet/data";
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
  return (
    <Fragment>
      <Button classname={"bg-blue-800"} onclick={() => openModal()}>
        open
      </Button>
      <main className="container mx-auto flex justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {renderProduct}
        </div>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <Button
            classname="bg-emerald-500"
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
