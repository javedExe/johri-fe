import React from 'react'
import { BsPeople } from "react-icons/bs";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoMdTrendingUp } from "react-icons/io";
import { TfiMedallAlt } from "react-icons/tfi";

function KpiData({className}) {
  return (
      <div className={`w-full flex justify-around gap-6 px-4 ${className}`}>

        <div className="w-full bg-white border border-[#D4E0ED] px-4 py-2 rounded-lg">
          <div>Active This month</div>
          <div className="flex items-center justify-between my-1 h-10">
            <p className="text-xl font-bold">32,891</p>
            <div className='h-full w-10 bg-[#EEF0F7] flex justify-center items-center rounded-lg'><BsPeople className="w-6 h-6 text-[#5065A4]" /></div>
          </div>
          <div className="text-sm text-[#00A63E]">+24.5% from last month</div>
        </div>
        
        <div className="w-full bg-white border border-[#D4E0ED] px-4 py-2 rounded-lg">
          <div>Active This month</div>
          <div className="flex items-center justify-between my-1 h-10">
            <p className="text-xl font-bold">32,891</p>
            <div className='h-full w-10 bg-[#DFF7E5] flex justify-center items-center rounded-lg'><IoMdTrendingUp className="w-6 h-6 text-[#00A63E]" /></div>
          </div>
          <div className="text-sm text-[#00A63E]">+24.5% from last month</div>
        </div>

        <div className="w-full bg-white border border-[#D4E0ED] px-4 py-2 rounded-lg">
          <div>Active This month</div>
          <div className="flex items-center justify-between my-1 h-10">
            <p className="text-xl font-bold">32,891</p>
            <div className='h-full w-10 bg-[#FFF8D1] flex justify-center items-center rounded-lg'><TfiMedallAlt className="w-6 h-6 text-[#FFD700]" /></div>
          </div>
          <div className="text-sm text-[#00A63E]">+24.5% from last month</div>
        </div>

        <div className="w-full bg-white border border-[#D4E0ED] px-4 py-2 rounded-lg">
          <div>Active This month</div>
          <div className="flex items-center justify-between my-1 h-10">
            <p className="text-xl font-bold">32,891</p>
            <div className='h-full w-10 bg-[#EEF0F7] flex justify-center items-center rounded-lg'><LiaRupeeSignSolid className="w-6 h-6 text-[#495C9C]" /></div>
          </div>
          <div className="text-sm text-[#00A63E]">+24.5% from last month</div>
        </div>

      </div>
  )
}

export default KpiData
