import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formdata, setFormdata] = useState({});
   const {loading,error}=useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value })
  };
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      dispatch(signInStart);
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      
      dispatch(signInSuccess(data));
        navigate('/');
    

      

    }
    catch {
      dispatch(signInFailure(error.message));
    }

  }
  return (
    <div className=" max-w-lg p-3 mx-auto mt-16">
      <h1 className="text-3xl text-center font-semibold my-7">
        Sign IN
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input type="email" placeholder='Email' id='email' className=" border rounded-lg p-3" onChange={handleChange} />
        <input type="password" placeholder='Password' id='password' className=" border rounded-lg p-3" onChange={handleChange} />

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className="flex my-7">

        <p>Have an Account? </p>
        <Link to="/sign-up">
          <span className="ml-1 text-[#3B82F6] cursor-pointer">Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
