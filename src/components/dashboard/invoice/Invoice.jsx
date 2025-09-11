import React, { useState, useEffect } from "react";
// import { dummyInvoice } from "../dummy";
import InvoiceFilters from "./InvoiceFilters";
import InvoiceList from "./InvoiceList";
import axios from "../../../utils/axiosInstance";

const Invoice = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState(originalData);
  const [showInvoice, setShowInvoice] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [isEditMode, setIsEditMode] = useState(false);

  const fetchInvoiceList = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/invoices");

      setOriginalData(response.data.invoices.data);
    } catch (err) {
      console.log("Error occured", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoiceList();
  }, []);

  useEffect(() => {
    setFilteredData(originalData);
  }, [originalData]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4 py-6 w-full">
      {/* Filters Section */}
      <div className="w-full lg:w-[300px]">
        <InvoiceFilters
          data={originalData}
          setData={setFilteredData}
          isFilterActive={setIsFilterActive}
        />
      </div>

      {/* Table Section */}
      <div className="h-[calc(100vh-100px)]">
        {/* <div className="flex-1 overflow-x-auto"> */}

        <InvoiceList
          data={filteredData}
          setShowInvoice={setShowInvoice}
          showInvoice={showInvoice}
          isFilterActive={isFilterActive}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Invoice;
