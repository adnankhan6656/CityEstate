import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl p-3 mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">City</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="flex items-center bg-slate-100 p-3 rounded-lg ">
          <input type="text" placeholder='Search....' className="bg-transparent w-24 sm:w-64 focus:outline-none" />
          <FaSearch />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">Home</li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">About</li>
          </Link>
          <Link to="/sign-in">
            <li className=" text-slate-700 hover:underline cursor-pointer">SignIn</li>
          </Link>
        </ul>

      </div>

    </header>
  )
}
