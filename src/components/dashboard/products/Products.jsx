import { useState } from "react";
import { dummyProducts } from "../dummy";
import ProductFilters from "./ProductFilters";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";

const Products = () => {
  const [originalData] = useState(dummyProducts); 
  const [filteredData, setFilteredData] = useState(dummyProducts); 
  const [viewTogel, setViewTogel] = useState(true);
  const [showModal, setShowModal] = useState(false);

  console.log(showModal);
  
  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4 py-6 w-full">
      
      {/* Filters Section */}
      <div className="w-full lg:w-[300px]">
        <ProductFilters data={originalData} setData={setFilteredData} setView={()=> setViewTogel(!viewTogel)} getView={viewTogel} addProductModel={() => setShowModal(true)} />
      </div>

      {/* Table Section */}
      <div className="h-[calc(100vh-100px)]">
      {/* <div className="flex-1 overflow-x-auto"> */}
        {
            viewTogel? <ProductCard data={filteredData} closeProductModel={() => setShowModal(false)} productModelVisible={showModal} /> : <ProductList data={filteredData} closeProductModel={() => setShowModal(false)} productModelVisible={showModal} />
        }

      </div>
    </div>
  );
};

export default Products;
