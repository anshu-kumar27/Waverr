import React from 'react';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

function Signup({ formData, handleChange, handleSubmit, switchToLogin }) {
  const handleLoginWithGoogle = () => {
    window.location.href = "http://localhost:8080/google";
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg  rounded-xl p-6 md:p-10  overflow-auto"
    >
      <h2 className="text-2xl font-bold mb-3 text-left text-[#F8F8F8]">Create your account</h2>
      <span className="block mb-6 text-[#F8F8F8] text-sm">
        Already have an account?{' '}
        <span
          className="font-bold cursor-pointer underline"
          onClick={switchToLogin}
        >
          Log in
        </span>
      </span>
      <div className="flex gap-4 mb-4">
  <input
    id="firstname"
    type="text"
    value={formData.firstname}
    onChange={handleChange}
    className="w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="First Name"
  />
  
  <input
    id="lastname"
    type="text"
    value={formData.lastname}
    onChange={handleChange}
    className="w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Last Name"
  />
</div>


      <div className="mb-4">
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
        />
      </div>

      <div className="mb-4">
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
        />
      </div>

      <div className="mb-6 flex items-center space-x-2">
        <input
          id="termsAccepted"
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="form-checkbox rounded"
        />
        <label htmlFor="termsAccepted" className="text-sm text-[#F8F8F8]">
          I agree to the terms and conditions
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-[#F8F8F8] hover:bg-[#74D4FF] text-[#374957] py-1 rounded-2xl transition duration-200"
      >
        Sign Up
      </button>

            {/* Divider + OAuth */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-white/40" />
              <span className="mx-3 text-sm text-[#F8F8F8]">or register with</span>
              <div className="flex-grow h-px bg-white/40" />
            </div>
      
      <div className="flex items-center justify-center space-x-6">
  <div className="bg-white p-4 rounded-full shadow cursor-pointer hover:scale-110 transition text-[32px]">
    <FcGoogle onClick={handleLoginWithGoogle} />
  </div>
  <div className="bg-white p-4 rounded-full shadow cursor-pointer hover:scale-110 transition text-[32px]">
    <FaApple />
  </div>
</div>
    </form>
  );
}

export default Signup;
