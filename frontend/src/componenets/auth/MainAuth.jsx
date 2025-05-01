import React, { useEffect, useState } from 'react';
import loginpicture from '../../assets/login.svg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { clearErrors, login, register } from '../../action/userAction';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Signup from './Signup';
import { useDispatch, useSelector } from 'react-redux';

function MainAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { error, loading, isAuthenticated } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, termsAccepted } = formData;

    if (isLogin) {
      //handling login submittion----------
      if (!email || !password) {
        toast.warn('Please enter both email and password!');
        return;
      }
      dispatch(login(email, password))
    } else {
      //handling signup --------------------
      if (!firstname || !lastname || !email || !password) {
        toast.warn('Please fill in all fields!');
        return;
      }
      if (!termsAccepted) {
        toast.warn('Please agree to the terms and conditions!');
        return;
      }
      dispatch(register(firstname, lastname, email, password))
    }
  };
  useEffect(() => {
    if (error) {
      // toast.error("");
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      toast.success("Welcome");
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-[#9EE1FF] overflow-hidden">
      {/* Left: Illustration */}
      <div className="w-full md:w-[50%] flex items-center justify-center px-4 py-6">
        <img
          src={loginpicture}
          alt="Login Illustration"
          className="w-full max-w-[450px] h-auto object-contain hidden md:block"
        />
      </div>

      {/* Right: Form Container */}
      <div className="w-full md:w-[50%] flex items-center justify-center p-6">
        {isLogin ? (
          <Login
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            switchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <Signup
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            switchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default MainAuth;
