import { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
// import { dummyProducts } from "../dummy";
import ExportToCSV from "../../../utils/ExportToCSV";
import ProductFilters from "./ProductFilters";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";
// import KpiData from "/utils/KpiData";
import KpiData from "./utils/KpiData"
import { LiaFileExportSolid } from "react-icons/lia";
import { AiOutlineLayout } from "react-icons/ai";
import { AiOutlineAppstore } from "react-icons/ai";


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
    // <div className="flex flex-col lg:flex-row gap-4 px-4 py-6 w-full">
    //   {/* Filters Section */}
    //   <div className="w-full lg:w-[300px]">
    //     <ProductFilters
    //       data={originalData}
    //       setData={setFilteredData}
    //       setView={() => setViewTogel(!viewTogel)}
    //       getView={viewTogel}
    //       addProductModel={() => setShowModal(true)}
    //       setEditMode={() => setIsEditMode(false)}
    //       setReload={() => setReload(!reload)}
    //       // reload={reload}
    //     />
    //   </div>

    //   {/* Table Section */}
    //   <div className="h-[calc(100vh-100px)]">
    //     {/* <div className="flex-1 overflow-x-auto"> */}
    // {viewTogel ? (
    //   <ProductCard
    //     data={filteredData}
    //     closeProductModel={() => setShowModal(false)}
    //     productModelVisible={showModal}
    //     isEditMode={isEditMode}
    //     setEditMode={() => setIsEditMode(true)}
    //     openProductModel={() => setShowModal(true)}
    //   />
    // ) : (
    //   <ProductList
    //     data={filteredData}
    //     closeProductModel={() => setShowModal(false)}
    //     productModelVisible={showModal}
    //     isEditMode={isEditMode}
    //     setEditMode={() => setIsEditMode(true)}
    //     openProductModel={() => setShowModal(true)}
    //   />
    // )}
    //   </div>
    // </div>

    <div className="flex flex-col items-end">
      <div className="w-full px-4 ps-5 flex justify-between">
        <div>
          <p className="font-bold text-lg md:text-2xl">Products</p>
          <p className="text-xs md:text-sm text-gray-500">
            Manage and Monitor all the platfrom Products.
          </p>
        </div>

        <div className="flex gap-3 py-2">
          {/* Export Buttons */}
          <ExportToCSV data={""} filename="User_List.csv">
            <LiaFileExportSolid className="text-xl" /> Export
          </ExportToCSV>

          {/* Add Product Button */}
            <button
              className="py-4 group flex items-center justify-around gap-1 w-full sm:w-[92px] h-[32px] rounded-[6px] px-[12px] bg-white border border-[#D9D9D9]"
              onClick={() => setViewTogel(!viewTogel)}
            >
              {/* <CiExport className="w-[16px] h-[16px] rotate-90 " />
              <span className="text-[14px] text-black/70 ">Export</span> */}
              <AiOutlineLayout
                className={`w-[22px] h-[22px] ${viewTogel ? "" : "text-[#C2ADEB]"}`}
              />
              <AiOutlineAppstore
                className={`w-[22px] h-[22px] ${viewTogel ? "text-[#C2ADEB]" : ""}`}
              />
            </button>
        </div>
      </div>

      <KpiData className={"mb-4 mt-2"} />

      <div className="flex flex-col w-full">
        {/* <UserFilters
          data={originalData}
          setData={setFilteredData}
          // formVisible={() => setShowForm(true)}
        /> */}


        <ProductFilters
          data={originalData}
          setData={setFilteredData}
          // setView={() => setViewTogel(!viewTogel)}
          getView={viewTogel}
          filteredData={filteredData}
          // addProductModel={() => setShowModal(true)}
          // setEditMode={() => setIsEditMode(false)}
          // setReload={() => setReload(!reload)}
          // reload={reload}
        />

      </div>

      <div className=" w-full">
        {/* {viewTogel ? (
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
        )} */}




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
