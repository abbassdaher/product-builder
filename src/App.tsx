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
import { ICategory, Iproduct } from "./componnet/interfaces";
import { productValidations } from "./validation";
import ValidationErrorMSG from "./componnet/ui/ValidationErrorMSG";
import ColorsProducts from "./componnet/ui/ColorsProducts";
import { v4 as uuid } from "uuid";
import { SelectMenu } from "./componnet/ui/SelectMenu";

function App() {
  // ________state________
  const [isOpen, setIsOpen] = useState(false);
  const [msgErrorValidation, setMsgErrorValidation] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    color: "",
  });
  const [product, setproduct] = useState<Iproduct>({
    id: uuid(),
    title: "",
    description: "",
    imageUrl: "",
    price: 0,
    color: [],
    category: {
      name: "",
      imageUrl: "",
    },
  });
  const [colorTemp, setColorTemp] = useState<string[]>([]);
  const [productsList, setProductsList] = useState<Iproduct[]>(productList);
  const [listcategory, setListCategory] = useState<ICategory>({
    id: uuid(),
    name: "shoes",
    imageUrl:
      "data:image/jpeg;base64,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",
  });
  const [editProduct, setEditProduct] = useState<Iproduct>({
    id: uuid(),
    title: "",
    description: "",
    imageUrl: "",
    price: 0,
    color: [],
    category: {
      name: "",
      imageUrl: "",
    },
  });
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState<ICategory>({
    id: "",
    name: "",
    imageUrl: "",
  });
  const [editIndex, setEditIndex] = useState(0);

  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<Iproduct>({
    id: uuid(),
    title: "",
    description: "",
    imageUrl: "",
    price: 0,
    color: [],
    category: {
      name: "",
      imageUrl: "",
    },
  });

  // ________Handler________

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeEditModal() {
    setIsOpenEdit(false);
  }
  function openEditModal() {
    setIsOpenEdit(true);
  }
  function openDeleteModal() {
    setIsOpenDeletedModal(true);
  }
  function closeDeleteModal() {
    setIsOpenDeletedModal(false);
  }
  function onChangeHandller(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setproduct({ ...product, [id]: value });
    setMsgErrorValidation({ ...msgErrorValidation, [id]: "" });
  }
  function onChangeEditHandller(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setEditProduct({ ...editProduct, [id]: value });
    setMsgErrorValidation({ ...msgErrorValidation, [id]: "" });
  }
  // submit handller
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, imageUrl, price, color } = product;
    const error = productValidations({
      title,
      description,
      imageUrl,
      price,
      color,
    });
    console.log("erorr:", error);
    console.log("colortemp: ", colorTemp);
    // error massege
    const hasErrorMSG =
      Object.values(error).some((item) => item == "") &&
      Object.values(error).every((item) => item == "");
    console.log("hasErrorMSG: ", hasErrorMSG);
    if (!hasErrorMSG) {
      setMsgErrorValidation(error);
      return;
    }

    setProductsList((prev) => [
      ...prev,
      {
        ...product,
        id: uuid(),
        color: colorTemp,
        category: {
          id: listcategory.id,
          name: listcategory.name,
          imageUrl: listcategory.imageUrl,
        },
      },
    ]);

    // clear
    setproduct({
      title: "",
      description: "",
      imageUrl: "",
      price: 0,
      color: [],
      category: {
        name: "",
        imageUrl: "",
      },
    });
    console.log("productsList: ", productsList);
    setColorTemp([]);
    closeModal();
    console.log("send the product to server");
  }
  // submit edit handler
  function submitEditHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, imageUrl, price, color } = editProduct;
    const error = productValidations({
      title,
      description,
      imageUrl,
      price,
      color,
    });
    // error massege
    const hasErrorMSG =
      Object.values(error).some((item) => item == "") &&
      Object.values(error).every((item) => item == "");
    console.log("hasErrorMSG: ", hasErrorMSG);
    if (!hasErrorMSG) {
      setMsgErrorValidation(error);
      return;
    }
    // to replace with edit product
    productList[editIndex] = editProduct;
    productList[editIndex].color = colorTemp;
    productList[editIndex].category = categoryEdit;
    console.log(productList[editIndex].category);

    // // clear
    // setproduct({
    //   title: "",
    //   description: "",
    //   imageUrl: "",
    //   price: "",
    //   color: [],
    //   category: {
    //     name: "",
    //     imageUrl: "",
    //   },
    // });

    // setProductsList((prev) => [
    //   ...prev,
    //   {
    //     ...editProduct,
    //     id: uuid(),
    //     color: colorTemp,
    //     category: {
    //       id: categoryEdit.id,
    //       name: categoryEdit.name,
    //       imageUrl: categoryEdit.imageUrl,
    //     },
    //   },
    // ]);

    // // clear
    // setproduct({
    //   title: "",
    //   description: "",
    //   imageUrl: "",
    //   price: "",
    //   color: [],
    //   category: {
    //     name: "",
    //     imageUrl: "",
    //   },
    // });
    console.log("productsList: ", productsList);
    setColorTemp([]);
    closeModal();
    console.log("send the product to server");
  }
  // edit Handller
  function editHandller(valuesOfEditProduct: Iproduct) {
    setColorTemp(valuesOfEditProduct.color);
    setCategoryEdit(valuesOfEditProduct.category);

    // setCategoryEdit(valuesOfEditProduct);
    // setEditProduct(valuesOfEditProduct);
    openEditModal();
  }
  function deleteHandler(selectedProduct: Iproduct) {
    openDeleteModal();
    setDeleteProduct(selectedProduct);

    //
  }
  // console.log(isDelete);
  // _______Render________

  const renderProductList = productsList.map((p, index) => (
    <ProductCard
      product={p}
      setEditProduct={setEditProduct}
      openEditModal={() => openEditModal()}
      editHandller={editHandller}
      index={index}
      setEditIndex={setEditIndex}
      deleteProduct={deleteHandler}
    />
  ));
  console.log("msgErrorValidation:", msgErrorValidation);
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
  // form of input edit product
  const renderFormEditProduts = FormInputProduts.map((i) => (
    <div className="mb-2 flex  flex-col ">
      <label htmlFor={i.name} className="text-black">
        {i.lable}:
      </label>
      <input
        type="`${i.type}`"
        className="border-1 text-black border-gray-300 rounded-sm"
        id={i.id}
        name={i.name}
        value={editProduct[i.name]}
        onChange={onChangeEditHandller}
      />
      {msgErrorValidation[i.name] && (
        <ValidationErrorMSG msg={msgErrorValidation[i.name]} />
      )}
    </div>
  ));
  // render tags Color
  const renderTagsOfColors =
    colorTemp.length > 0
      ? colorTemp.map((pd) => (
          <span
            className="text-white me-1 rounded-lg p-1 mb-1"
            style={{ backgroundColor: pd }}
          >
            {pd}
          </span>
        ))
      : msgErrorValidation.color && (
          <ValidationErrorMSG msg={msgErrorValidation.color} />
        );
  // render for color
  const renderColorOFProduct = ColorInputProduct.map((colors) => (
    <ColorsProducts
      color={colors}
      onClick={() => {
        const colorIsNotExist = colorTemp.every((i) => i !== colors);
        console.log("color is not exist: ", colorIsNotExist);
        if (colorIsNotExist) {
          setColorTemp((prev) => [...prev, colors]);
        } else {
          setColorTemp((prev) => prev.filter((c) => c !== colors));
        }
        console.log("color temp: ", colorTemp);
        setproduct({ ...product, color: colorTemp });
      }}
    />
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
        {/*add product modal */}
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="Add a new product"
        >
          console.log(listcategory)
          {/* form of modal */}
          <form onSubmit={submitHandler} className="space-y-2">
            {renderFormProduts}
            <SelectMenu selected={listcategory} setSelected={setListCategory} />
            <div className="flex  ">{renderColorOFProduct}</div>
            <div className="flex text-black  flex-wrap ">
              {renderTagsOfColors}
            </div>

            <Button classname="bg-emerald-300 w-full hover:bg-emerald-400">
              submit
            </Button>
          </form>
        </Modal>
        {/*edit product modal */}
        <Modal
          isOpen={isOpenEdit}
          closeModal={closeEditModal}
          title="Edit a new product"
        >
          {/* form of edit modal */}
          <form onSubmit={submitEditHandler} className="space-y-2">
            {renderFormEditProduts}
            <SelectMenu
              selected={categoryEdit}
              setSelected={(prev) => console.log(prev)}
            />
            <div className="flex  ">{renderColorOFProduct}</div>
            <div className="flex text-black  flex-wrap ">
              {renderTagsOfColors}
            </div>

            <Button classname="bg-emerald-300 w-full hover:bg-emerald-400">
              submit
            </Button>
          </form>
        </Modal>

        {/* delete modal */}
        <Modal
          isOpen={isOpenDeletedModal}
          title="Are you sure you want to remove this Product from your Store?"
          description="Deleting thiS product will remove it permanently from your
                      inventory. Any associated data sales history, and other
                      related Information will Also be deleted. Please make sure
                      this is the Intended action."
          closeModal={closeDeleteModal}
        >
          <div className="mt-2 flex space-x-1">
            <button
              type="button"
              className="w-50  rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => {
                const newProductList = productList.filter(
                  (prod) => prod.id != deleteProduct.id
                );
                setProductsList(newProductList);
                closeDeleteModal();
              }}
            >
              Yes,remove
            </button>
            <button
              type="button"
              className="w-50  rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
              onClick={() => setIsOpenDeletedModal(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </main>
    </Fragment>
  );
}

export default App;
