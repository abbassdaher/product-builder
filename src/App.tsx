import { Fragment } from "react/jsx-runtime";
import "./App.css";
import {
  FormInputProduts,
  productList,
  ColorInputProduct,
  Category,
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
    price: "",
    color: [],
    category: {
      name: "",
      imageUrl: "",
    },
  });
  const [colorTemp, setColorTemp] = useState<string[]>([]);
  const [productsList, setProductsList] = useState<Iproduct[]>(productList);
  const [listcategory, setListCategory] = useState<ICategory>({
    id: "",
    name: "",
    imageUrl: "",
  });
  const [editProduct, setEditProduct] = useState<Iproduct>({
    id: uuid(),
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
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState<ICategory>({
    id: "",
    name: "",
    imageUrl: "",
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
          imageUrl: listcategory.imageURL,
        },
      },
    ]);

    // clear
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

    setProductsList((prev) => [
      ...prev,
      {
        ...editProduct,
        id: uuid(),
        color: colorTemp,
        category: {
          id: categoryEdit.id,
          name: categoryEdit.name,
          imageUrl: categoryEdit.imageUrl,
        },
      },
    ]);

    // clear
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
    });
    console.log("productsList: ", productsList);
    setColorTemp([]);
    closeModal();
    console.log("send the product to server");
  }
  // get category from selector
  function categoryHandler(category: ICategory) {
    // const categoryEditprops = categoryEdit;
    setListCategory(category);
    // console.log(category.indexOf(category.id));
  }
  // function categoryEditHandler(category: ICategory) {
  //   // setCategoryEdit(category);
  //   console.log(category);
  // }

  // edit Handller
  function editHandller(valuesOfEditProduct: Iproduct) {
    // console.log(valuesOfEditProduct.color)
    setColorTemp(valuesOfEditProduct.color);
      setCategoryEdit(valuesOfEditProduct.category);
      console.log(categoryEdit)

    // setCategoryEdit(valuesOfEditProduct);
    // setEditProduct(valuesOfEditProduct);
    openEditModal();
  }
  console.log(editProduct);
  // _______Render________

  const renderProductList = productsList.map((p) => (
    <ProductCard
      product={p}
      setEditProduct={setEditProduct}
      openEditModal={() => openEditModal()}
      editHandller={editHandller}
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
          {/* form of modal */}
          <form onSubmit={submitHandler} className="space-y-2">
            {renderFormProduts}
            <SelectMenu handlerSelected={categoryHandler} />
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
            <SelectMenu handlerSelected={categoryHandler} />
            <div className="flex  ">{renderColorOFProduct}</div>
            <div className="flex text-black  flex-wrap ">
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
