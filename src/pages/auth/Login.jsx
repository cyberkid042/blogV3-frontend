import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logUserState } from "../../redux/features/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { clearIsSessionExpired } from "../../redux/features/checkErrorAndStatus";

export const Login = () => {
  const dispatch = useDispatch();
  const username = useRef();
  const password = useRef();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const checkSession = useSelector((state) => state.status.isSessionExpired);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        {
          username: username.current.value,
          password: password.current.value,
        }
      );

      dispatch(logUserState(response.data));

      navigate(from, { replace: true });
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
    document.title = "BlogV3 | Login to your account";
  }, []);

  useEffect(() => {
    if (checkSession) {
      toast.warning(
        "You were logged out because your session expired. Please login again!",
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

      dispatch(clearIsSessionExpired());
    }
  }, [checkSession, dispatch]);

  return (
    <div className="flex flex-col h-screen ">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-whiteColor rounded-lg shadow-lg lg:shadow-xl"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Welcome Back!
          </h2>

          <form className="mt-10" onSubmit={handleLogin}>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Username / Email
            </label>
            <input
              ref={username}
              id="username"
              type="text"
              name="username"
              placeholder="enter your username or email address"
              autoComplete="username"
              className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
              autoFocus
            />

            <label
              htmlFor="password"
              className="block mt-8 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              ref={password}
              id="password"
              type="password"
              name="password"
              placeholder="enter your password"
              autoComplete="current-password"
              className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-800 focus:outline-none focus:border-gray-200"
              required
            />

            <button
              type="submit"
              className={`w-full py-3 mt-10 rounded-sm
                    font-medium text-whiteColor uppercase
                    focus:outline-none  
                       hover:bg-yellow hover:text-black bg-black 
                    } hover:shadow-none`}
            >
              Login
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <a href="forgot-password" className="flex-2 underline">
                Forgot password?
              </a>

              <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                or
              </p>

              <Link to="/auth/join" className="flex-2 underline">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer style={{ width: "auto" }} />
    </div>
  );
};
