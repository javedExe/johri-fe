import { useState } from "react";
import { dummyInvoice } from "../dummy";
import InvoiceFilters from "./InvoiceFilters";
import InvoiceList from "./InvoiceList";


const Invoice = () => {
  const [originalData] = useState(dummyInvoice); 
  const [filteredData, setFilteredData] = useState(dummyInvoice); 
  const [showInvoice, setShowInvoice] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [isEditMode, setIsEditMode] = useState(false);
  
  
  return (

    <div className="flex flex-col lg:flex-row gap-4 px-4 py-6 w-full">
      {/* Filters Section */}
      <div className="w-full lg:w-[300px]">
        <InvoiceFilters data={originalData} setData={setFilteredData} />
      </div>

      {/* Table Section */}
      <div className="h-[calc(100vh-100px)]">
      {/* <div className="flex-1 overflow-x-auto"> */}

            <InvoiceList data={filteredData} setShowInvoice={setShowInvoice} showInvoice={showInvoice} />

      </div>
    </div>
  );
};

export default Invoice;
