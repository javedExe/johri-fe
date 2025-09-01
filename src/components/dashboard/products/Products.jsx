import { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
// import { dummyProducts } from "../dummy";
import ProductFilters from "./ProductFilters";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";

const Products = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState(originalData);
  const [viewTogel, setViewTogel] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [reload, setReload] = useState(false);

  // console.log(showModal);

  const fetchProducts = async () => {
    const response = await axios.get("/admin/products", {
      withCredentials: true,
    });
    setOriginalData(response.data.products);
    console.log(response.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, [reload]);

  useEffect(() => {
    setFilteredData(originalData);
  }, [originalData]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4 py-6 w-full">
      {/* Filters Section */}
      <div className="w-full lg:w-[300px]">
        <ProductFilters
          data={originalData}
          setData={setFilteredData}
          setView={() => setViewTogel(!viewTogel)}
          getView={viewTogel}
          addProductModel={() => setShowModal(true)}
          setEditMode={() => setIsEditMode(false)}
          setReload={() => setReload(!reload)}
          // reload={reload}
        />
      </div>

      {/* Table Section */}
      <div className="h-[calc(100vh-100px)]">
        {/* <div className="flex-1 overflow-x-auto"> */}
        {viewTogel ? (
          <ProductCard
            data={filteredData}
            closeProductModel={() => setShowModal(false)}
            productModelVisible={showModal}
            isEditMode={isEditMode}
            setEditMode={() => setIsEditMode(true)}
            openProductModel={() => setShowModal(true)}
          />
        ) : (
          <ProductList
            data={filteredData}
            closeProductModel={() => setShowModal(false)}
            productModelVisible={showModal}
            isEditMode={isEditMode}
            setEditMode={() => setIsEditMode(true)}
            openProductModel={() => setShowModal(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
