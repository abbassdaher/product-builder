import { Fragment } from "react/jsx-runtime";
import "./App.css";
import { productList } from "./componnet/data";
import ProductCard from "./componnet/ProductCard";

function App() {
  const renderProduct = productList.map((p) => <ProductCard product={p} />);
  return (
    <Fragment>
    <main className="container mx-auto flex justify-center">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {renderProduct}
      </div>
    </main>
    </Fragment>
  );
}

export default App;
