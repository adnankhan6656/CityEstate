import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {IoIosOptions} from "react-icons/io";
import {AiOutlineClose} from "react-icons/ai";
import ListingItem from '../components/ListingItem';




export default function Search() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
      searchTerm: '',
      type: 'all',
      parking: false,
      furnished: false,
      offer: false,
      sort: 'created_at',
      order: 'desc',
    });
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      const typeFromUrl = urlParams.get('type');
      const parkingFromUrl = urlParams.get('parking');
      const furnishedFromUrl = urlParams.get('furnished');
      const offerFromUrl = urlParams.get('offer');
      const sortFromUrl = urlParams.get('sort');
      const orderFromUrl = urlParams.get('order');
  
      if (
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
      ) {
        setSidebardata({
          searchTerm: searchTermFromUrl || '',
          type: typeFromUrl || 'all',
          parking: parkingFromUrl === 'true' ? true : false,
          furnished: furnishedFromUrl === 'true' ? true : false,
          offer: offerFromUrl === 'true' ? true : false,
          sort: sortFromUrl || 'created_at',
          order: orderFromUrl || 'desc',
        });
      }
  
      const fetchListings = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListings(data);
        setLoading(false);
      };
  
      fetchListings();
    }, [location.search]);
  

    const handleChange = (e) => {
      if (
        e.target.id === 'all' ||
        e.target.id === 'rent' ||
        e.target.id === 'sale'
      ) {
        setSidebardata({ ...sidebardata, type: e.target.id });
      }
  
      if (e.target.id === 'searchTerm') {
        setSidebardata({ ...sidebardata, searchTerm: e.target.value });
      }
  
      if (
        e.target.id === 'parking' ||
        e.target.id === 'furnished' ||
        e.target.id === 'offer'
      ) {
        setSidebardata({
          ...sidebardata,
          [e.target.id]:
            e.target.checked || e.target.checked === 'true' ? true : false,
        });
      }
  
      if (e.target.id === 'sort_order') {
        const sort = e.target.value.split('_')[0] || 'created_at';
  
        const order = e.target.value.split('_')[1] || 'desc';
  
        setSidebardata({ ...sidebardata, sort, order });
      }
    };
    

    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams();
      urlParams.set('searchTerm', sidebardata.searchTerm);
      urlParams.set('type', sidebardata.type);
      urlParams.set('parking', sidebardata.parking);
      urlParams.set('furnished', sidebardata.furnished);
      urlParams.set('offer', sidebardata.offer);
      urlParams.set('sort', sidebardata.sort);
      urlParams.set('order', sidebardata.order);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings);

    const handleSidebar = () => {
      setIsVisible(!isVisible); // Toggle the visibility state
    };
  

  return (
    <main>
        {/* For Sidebar */}
        {isVisible && (
            <div className="fixed top-0 left-0  z-50 w-full md:h-full md:w-1/4 left-0 p-6 shadow-3xl  bg-white  transition ease-in-out  z-100 flex flex-col gap-5">
                <AiOutlineClose size={"24px"} onClick={handleSidebar} className=" position absolute top-2 mr-3 right-0 cursor-pointer "/>
            <div className=" flex items-center space-x-1 mt-6">
              <p className="text-md font-semibold">Search:</p>
            <input type="text" placeholder='Search Listing' className='border p-2 outline-none' id='searchTerm' 
             value={sidebardata.searchTerm}
             onChange={handleChange}/>
              
            </div>
            <div className='flex gap-2 flex-wrap items-center  '>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input type='checkbox' id='all' className='w-5'
               onChange={handleChange}
               checked={sidebardata.type === 'all'} />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5'
              onChange={handleChange}
              checked={sidebardata.type === 'rent'} />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5'
              onChange={handleChange}
              checked={sidebardata.type === 'sale'} />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5'
              onChange={handleChange}
              checked={sidebardata.offer} />
              <span>Offer</span>
            </div>

          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' 
              onChange={handleChange}
              checked={sidebardata.parking}/>
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5'
              onChange={handleChange}
              checked={sidebardata.furnished} />
              <span>Furnished</span>
            </div>
          </div>

          <div className='flex items-center gap-2 '>
            <label className='font-semibold'>Sort:</label>
            <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg p-3'>
              <option value='regularPrice_desc'> Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className="bg-[#4a60a1] p-2 px-3 text-white" onClick={handleSubmit} >
                 Search
               </button>
          
        
        </div>
            )}
        
{/* For bottom navigation */}
<div className="fixed sm:hidden bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
    <div className="flex items-center justify-center space-x-3 p-3">
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

 <div className="grid grid-cols-1 gap-7 mt-6 md-custom:grid-cols-2  lg:grid-cols-3">
        {!loading && listings.length === 0 && (
          <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
              ))}
              </div>
  </div>

      </div>
    </main>

)
}
        
        
    

        
        


       
        

