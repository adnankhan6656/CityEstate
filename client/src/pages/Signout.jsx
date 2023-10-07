import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Signout() {
  const [loading, setLoading] = useState(false);
  const [formdata,setFormdata]=useState({});
  const[error,setError]=useState(null);
  const navigate=useNavigate();
  const handleChange=(e)=>{
   setFormdata({...formdata,[e.target.id]:e.target.value})
  };
  const handleSubmit=async(e)=>{
    
    e.preventDefault();
    
    try{
      setLoading(true);
      const res=await fetch('/api/auth/signup',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data=await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      else{
        setLoading(false);
        setError(null);
        navigate('/sign-in');

      }

    }
    catch{
      setLoading(false);
      setError(error.message);
    }

  }
  return (
   <div className=" max-w-lg p-3 mx-auto">
    <h1 className="text-3xl text-center font-semibold my-7">
      Sign Up
    </h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder='Username' id='username' className=" border rounded-lg p-3" onChange={handleChange}/>
      <input type="email" placeholder='Email' id='email' className=" border rounded-lg p-3" onChange={handleChange}/>
      <input type="password" placeholder='Password'id='password' className=" border rounded-lg p-3" onChange={handleChange} />
      
      <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
      {loading ? 'Loading...' : 'Sign Up'}
      </button>
    </form>
    <div className="flex my-7">
      <p>Have an Account? </p>
      <Link to="/sign-in">
      <span className="ml-1 text-[#3B82F6] cursor-pointer">Sign in</span>
      </Link>
        
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
   </div>
  )
}
