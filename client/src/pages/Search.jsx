import React from 'react'
import {IoIosOptions} from "react-icons/io";
import { useState } from 'react';
import {AiOutlineClose} from "react-icons/ai"


export default function Search() {
    const [isVisible, setIsVisible] = useState(false);

    const handleSidebar = () => {
      setIsVisible(!isVisible); // Toggle the visibility state
    };
  

  return (
    <main>
        {/* For Sidebar */}
        {isVisible && (
            <div className="absolute top-0 left-0 p-6 shadow-3xl  bg-white h-full transition ease-in-out  z-100 flex flex-col gap-5">
                <AiOutlineClose size={"24px"} onClick={handleSidebar} className=" position absolute top-2 mr-3 right-0 cursor-pointer "/>
            <div className="flex items-center mt-6">
            <input type="text" placeholder='Search Listing' className='border p-2 outline-none'/>
               <button className="bg-[#4a60a1] p-2 px-3 text-white" >
                 Search
               </button>
            </div>
            <div className='flex gap-2 flex-wrap items-center  '>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input type='checkbox' id='all' className='w-5' />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5' />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>

          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
          </div>

          <div className='flex items-center gap-2 '>
            <label className='font-semibold'>Sort:</label>
            <select id='sort_order' className='border rounded-lg p-3'>
              <option>Price high to low</option>
              <option>Price low to hight</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>

        
        </div>
            )}
        
{/* For bottom navigation */}
<div className="fixed sm:hidden bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
    <div class="flex items-center justify-center space-x-3 p-3">
        <button className='flex bg-[#4a60a1] text-white p-3 items-center space-x-1 cursor-pointer'>  
        <IoIosOptions/>
        <p className="text-sm"  onClick={handleSidebar}>
          OPTIONS
        </p>
        </button>
    </div>
</div>

   <div className="max-w-6xl bg-slate-300 mx-auto ">

  <div className='shadow-3xl  mt-28  px-8  py-9 bg-white'>
  <button className='hidden sm:flex bg-[#4a60a1] text-white p-3 items-center space-x-1 cursor-pointer'>  
        <IoIosOptions/>
        <p className="text-sm"  onClick={handleSidebar}>
          OPTIONS
        </p>
        </button>
  </div>

      </div>
    </main>

)
}
        
        
    

        
        


       
        

