import { Button, CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { persistor } from "../../redux/store";
import { logUserOut } from "../../redux/features/userSlice";

export const ConfirmAccount = () => {
  let { token } = useParams();
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    document.title = "BlogV3 | Confirm Account";

    const confirmUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/auth/confirm-email?token=${token}`
        );
        setLoading(false);
        setSuccess(res.data);
      } catch (error) {
        setLoading(false);
        setError(error?.response?.data);
      }
    };

    confirmUser();
  }, [token]);

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown((countdown) => countdown > 0 && countdown - 1);
      }, 1000);

      if (countdown === 0) {
        persistor.purge();
        dispatch(logUserOut());
        navigate("/auth/login");
      }

      return () => clearInterval(timer);
    }
  }, [success, countdown, navigate, dispatch]);

  const handleEmailResend = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/auth/resend-confirmation?username=${user.username}`
      );
      toast.success(`${response?.data}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error(`${err?.response?.data}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen ">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        {loading && <CircularProgress color="inherit" />}
        {error && (
          <div
            className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-6/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-whiteColor rounded-lg shadow-lg lg:shadow-xl"
          >
            <h2 className="text-center font-semibold text-xl lg:text-2xl text-red">
              {error}
            </h2>
            <div className="flex justify-center mt-6">
              {user ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleEmailResend}
                >
                  Get a new email with instructions
                </Button>
              ) : (
                <h5 className="text-gray">
                  Please login to request a new verification code
                </h5>
              )}
            </div>
            <ToastContainer style={{ width: "auto" }} />
          </div>
        )}

        {success && (
          <div
            className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-6/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-whiteColor rounded-lg shadow-lg lg:shadow-xl text-center"
          >
            <h2 className="font-semibold text-xl lg:text-2xl text-green">
              {success}
            </h2>
            <p className="pt-5">Redirecting you to the login page, in:</p>
            <h3 className={`text-8xl pt-5 ${countdown === 0 && "hidden"}`}>
              {countdown}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
