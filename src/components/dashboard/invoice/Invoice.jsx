import React, { useState, useEffect } from "react";
// import { dummyInvoice } from "../dummy";
import InvoiceFilters from "./InvoiceFilters";
import InvoiceList from "./InvoiceList";
import axios from "../../../utils/axiosInstance";
import ExportToCSV from "../../../utils/ExportToCSV";
import KpiData from "./utils/KpiData";
import useFeatureStore from "../../../store/useFeatureStore"; // update value
import { LiaFileExportSolid } from "react-icons/lia";

const Invoice = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState(originalData);
  const [showInvoice, setShowInvoice] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedInvoice } = useFeatureStore(); // update value
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
    // <div className="flex flex-col lg:flex-row gap-4 px-4 py-6 w-full">
    //   {/* Filters Section */}
    //   <div className="w-full lg:w-[300px]">
    //     <InvoiceFilters
    //       data={originalData}
    //       setData={setFilteredData}
    //       isFilterActive={setIsFilterActive}
    //     />
    //   </div>

    //   {/* Table Section */}
    //   <div className="h-[calc(100vh-100px)]">
    //     {/* <div className="flex-1 overflow-x-auto"> */}

    //     <InvoiceList
    //       data={filteredData}
    //       setShowInvoice={setShowInvoice}
    //       showInvoice={showInvoice}
    //       isFilterActive={isFilterActive}
    //       loading={loading}
    //     />
    //   </div>
    // </div>

    <div className="flex flex-col items-end">
      <div className="w-full px-4 ps-5 flex justify-between">
        <div>
          <p className="font-bold text-lg md:text-2xl">Invoice</p>
          <p className="text-xs md:text-sm text-gray-500">
            Manage and Monitor your all Invoices.
          </p>
        </div>

        <div className="flex gap-3 py-2">
          {/* Export Buttons */}
          <ExportToCSV data={selectedInvoice} filename="User_List.csv">
            <LiaFileExportSolid className="text-lg" /> Export
          </ExportToCSV>
        </div>
      </div>

      <KpiData className={"mb-4 mt-2"} />

      <div className="flex flex-col w-full">
        <InvoiceFilters
          data={originalData}
          setData={setFilteredData}
          isFilterActive={setIsFilterActive}
          selectedInvoice={selectedInvoice}
        />
      </div>

      <div className=" w-full">
        {/* <UserList
          data={filteredData}
          userFormVisible={showForm}
          closeForm={() => setShowForm(false)}
          openForm={() => setShowForm(true)}
          loading={loading}
          setLoading={(value) => setLoading(value)}
          reload={reload}
          setReload={() => setReload(!reload)}
          formData={formData}
          setFormData={(row) => setFormData(row)}
        /> */}

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
