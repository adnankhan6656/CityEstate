import React from 'react'

export default function Signout() {
  return (
   <div className=" max-w-lg p-3 mx-auto">
    <h1 className="text-3xl text-center font-semibold my-7">
      Sign Up
    </h1>
    <form className="flex flex-col gap-4">
      <input type="text" placeholder='Username'  className=" border rounded-lg p-3"/>
      <input type="text" placeholder='Email' className=" border rounded-lg p-3"/>
      <input type="text" placeholder='Password' className=" border rounded-lg p-3" />
      <button className='bg-[#334155] border my-2 p-3 text-white text-lg hover:bg-[#6a81a2] rounded-md'>Sign Up</button>
    </form>
    <div className="flex my-7">
      <p>Have an Account? </p>
      <span className="ml-1 text-[#3B82F6] cursor-pointer">Sign in</span>
    </div>

   </div>
  )
}
