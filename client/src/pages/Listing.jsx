
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {FaLocationDot} from "react-icons/fa6";
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';
import { useSelector } from 'react-redux';




export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true); // set loading to true initially
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false); 
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
        } else {
          setListing(data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false); // set loading to false after fetching data, regardless of success or failure
      }
    };
    
    fetchListing();
  }, [params.listingId]);
  
  // Check if listing is null before accessing its properties
  const displayContent = () => {
    if (loading) {
      return <p className='text-center my-7 text-2xl'>Loading...</p>;
    } else if (error) {
      return <p className='text-center my-7 text-2xl'>Something went wrong!</p>;
    } else if (listing) {
      return (
        <div className='bg-[#F8F8F8]  '> 
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px] max-w-6xl mx-auto rounded-md ' 
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                    
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col p-4 gap-2 max-w-6xl mx-auto my-3">
          <p className='bg-[#4a60a1] w-full max-w-[100px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <p className="text-3xl font-semibold">
              {listing.name}
            </p>
            <p className="text-[#4A60A1] text-3xl font-semibold">
            $ {listing.regularPrice}
            </p>
            </div>
            


            <div className="flex gap-2  items-center">
            <FaLocationDot size={"25px"}/>
            <p className="text-sm text-gray-500">
              {listing.address}
            </p>
            </div>
             <div className="shadow-3xl p-7 my-3  pl-7 grid grid-cols-2 gap-2 sm:grid-cols-4 justify-center items-center">

              <div className="bedroom flex flex-col items-center">
              <FaBed className='text-3xl' />
              <p className="text-sm">
                {listing.bedrooms} beds
              </p>
              </div>
              <div className="bedroom flex flex-col items-center">
              <FaBath className='text-3xl' />
              <p className="text-sm">
                {listing.bedrooms} baths
              </p>
              </div>
              <div className="bedroom flex flex-col items-center">
              <FaParking className='text-3xl' />
              <p className="text-sm">
              {listing.parking ? 'Parking spot' : 'No Parking'}
              </p>
              </div>
              <div className="bedroom flex flex-col items-center ">
              <FaChair className='text-3xl' />
              <p className="text-sm">
              {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </p>
              </div>
              
             </div>
             <div className="shadow-3xl p-7">
              <p className="text-lg my-3 text-black font-semibold">
                Description
              </p>
              <p className="text-gray-600">
              {listing.description}
              </p>

             </div>
             <div className="max-w-6xl mx-auto my-4">
             {currentUser && listing.userRef !== currentUser._id &&  !contact && (
              <button onClick={()=>setContact(true)} className='bg-[#4a60a1] text-white rounded-lg uppercase hover:opacity-95 p-3 max-w-6xl mx-auto '>
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
             </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }; 

  return <main>{displayContent()}</main>;
}

