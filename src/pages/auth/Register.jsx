import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const Register = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const [password, setPassword] = useState("");
  const [confirm_password, setPasswordConfirmation] = useState("");

  const clearData = () => {
    firstName.current.value = "";
    lastName.current.value = "";
    email.current.value = "";
    username.current.value = "";
    setPassword("");
    setPasswordConfirmation("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth`,
        {
          username: username.current.value,
          pass: password,
          email: email.current.value,
          firstName: firstName.current.value,
          lastName: lastName.current.value,
        }
      );
      clearData();

      toast.success(`${response?.data}`, {
        position: "top-center",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(
        `${
          error.response?.data?.error
            ? error.response?.data?.error
            : error.response?.data
        }`,
        {
          position: "top-center",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  useEffect(() => {
    document.title = "BlogV3 | Create an Account";
  }, []);

  return (
    <div className="flex flex-col h-screen ">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-6/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-whiteColor rounded-lg shadow-lg lg:shadow-xl"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Create a free account!
          </h2>

          <form className="mt-10" onSubmit={handleRegister}>
            <div className="flex">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  First Name
                </label>
                <input
                  ref={firstName}
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="enter your first name"
                  autoComplete="firstName"
                  className="block w-11/12 py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                  autoFocus
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Last Name
                </label>
                <input
                  ref={lastName}
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="enter your last name"
                  autoComplete="firstName"
                  className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                />
              </div>
            </div>

            <div className="flex mt-8">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Email
                </label>
                <input
                  ref={email}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  autoComplete="email"
                  className="block w-11/12 py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Username
                </label>
                <input
                  ref={username}
                  id="username"
                  type="text"
                  name="username"
                  placeholder="enter your username"
                  autoComplete="username"
                  className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                />
              </div>
            </div>

            <div className="flex mt-8">
              <div className="flex-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="atleast 8 characters"
                  autoComplete="current-password"
                  className="block w-11/12 py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-800 focus:outline-none focus:border-gray-200"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="confirm_password"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  placeholder="enter password again"
                  className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-800 focus:outline-none focus:border-gray-200"
                  required
                />
              </div>
            </div>

            <button
              disabled={password !== confirm_password}
              type="submit"
              className={`w-full py-3 mt-10 rounded-sm
                    font-medium text-whiteColor uppercase
                    focus:outline-none ${
                      (password === confirm_password) & (password.length > 7)
                        ? "hover:bg-yellow hover:text-black bg-black"
                        : "bg-gray cursor-not-allowed"
                    }
                     hover:shadow-none`}
            >
              Join
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <a href="forgot-password" className="flex-2 underline">
                Forgot password?
              </a>

              <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                or
              </p>

              <Link to="/auth/login" className="flex-2 underline">
                Login to your account
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer style={{ width: "auto" }} />
    </div>
  );
};
