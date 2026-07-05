import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import './login.css';
import { useForm } from 'react-hook-form'; 

const emailRules = {
  required: "البريد الإلكتروني مطلوب",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "صيغة البريد الإلكتروني غير صحيحة",
  },
};

const passwordRules = {
  required: "كلمة المرور مطلوبة",
  minLength: {
    value: 8,
    message: "يجب أن تتكون من 8 خانات على الأقل",
  },
};

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const emailValue = watch("email", "");
  const passwordValue = watch("password", "");

  const isempty = emailValue.trim() === '';
  const isempty2 = passwordValue.trim() === '';
  const bg = "bg-gray-300";

 
  const handleLogin = async (data) => {
    setLoading(true); 
    localStorage.setItem('email', data.email);
    localStorage.setItem('password', data.password);
    
    try {
      const res = await axios.post(
        "https://e-commerce-api-3wara.vercel.app/auth/login", 
        {
          email: data.email,       
          password: data.password,    
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      setLoading(false);
      alert('successfully logged in');
      console.log("Data received (Token):", res.data);

    } catch (err) {
      setLoading(false);
      alert('Failed to login: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <div className="gap-4 m-4 p-4 bg-gray-900 rounded-lg flex justify-between login-container">
        <div className='flex-1 min-h-screen dleft rounded-lg '>
            <h2 className='text-[25px] m-5 text-gray-100'>Koda Commerce</h2>
            <h1 className='text-[35px] mt-12 text-gray-100'>Manage Your Store Like a Pro</h1>
            <ul className='space-y-4 mt-20 text-gray-800 text-[18px]'>
                <li className='w-full bg-white rounded-xl p-4' >✓ Product Management</li>
                <li className='w-full bg-white rounded-xl p-4'>✓ Order Tracking</li>
                <li className='w-full bg-white rounded-xl p-4'>✓ Customer Insights</li>
            </ul>
        </div>
        
        <div className="flex-1 min-h-screen bg-gray-500 rounded-lg shadow-md p-10 px-20 form-container">
          <h2 className="text-4xl font-bold text-gray-800 text-center mt-16">Login</h2>
          

          <form onSubmit={handleSubmit(handleLogin)} className={bg + " space-y-6 flex flex-col w-full mt-8 p-10 rounded-lg shadow-4xl"}>
        
            <div className='relative'>
              <input   
                type="text"
                placeholder='enter your email'
                {...register("email", emailRules)} 
                className="rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-900 w-full"
              />
              <p className={`${isempty ? 
                'invisible transition-all duration-300 top-[6px] left-[14px] text-[16px] p-0' :
                'visible block text-[8px] z-10 transition-all duration-300 -top-4 left-2 p-2 rounded-md'} 
                absolute ${bg} text-gray-800`}>
                enter your email
              </p>
              
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* حقل كلمة المرور */}
            <div className='relative space-y-2'>
              <input 
                type={passwordVisible ? "text" : "password"} 
                placeholder='enter your password' 
                {...register("password", passwordRules)}
                className='rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-900 w-full '
              />
              <p className={`${isempty2 ? 
                'invisible transition-all duration-300 top-[6px] left-[14px] text-[16px] p-0' :
                'visible block text-[8px] z-10 transition-all duration-300 -top-4 left-2 p-2 rounded-md'} 
                absolute ${bg} text-gray-800`}>
                enter your password
              </p>
              {errors.password && <p className="text-red-600 text-xs ml-3">{errors.password.message}</p>}

               <div className="flex items-center space-x-2 ml-2 ">
                    <input 
                    type="checkbox" 
                    checked={passwordVisible} 
                    onChange={() => setPasswordVisible(!passwordVisible)} 
                    className="rounded-full bg-blue-200 
                        focus:ring-2 focus:ring-blue-300 foucs:bg-gray-600 transition-all duration-200 cursor-pointer"
                    />
                    <p className=" text-gray-800 text-[12px]">Show Password</p>
              </div>
            </div>

            {/* زر الإرسال */}
            <button 
            disabled={loading}
            type="submit" 
            className={`bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-all duration-200
             ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
            
        </div>    
      </div>
    </>
  );
}

export default Login;

