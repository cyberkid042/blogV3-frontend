import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

export const VerifyAccount = () => {
  const { username } = useSelector((state) => state.users.user);

  const handleEmailResend = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/auth/resend-confirmation?username=${username}`
      );

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
          error?.response?.data?.error
            ? error?.response?.data?.error
            : error?.response?.data
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
    document.title = "BlogV3 | Verify Account";
  }, []);

  return (
    <div className="flex flex-col h-screen ">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-6/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-whiteColor rounded-lg shadow-lg lg:shadow-xl"
        >
          <h2 className="text-center font-semibold text-2xl lg:text-3xl text-gray-800">
            Please verify your account to continue!
          </h2>
          <p className="text-center pt-5 text-gray text-body">
            We sent you an email with instructions to verify your account. If
            you did not receive this email, please click the link below to
            request a new email with instructions.
          </p>

          <div className="flex justify-center mt-6">
            <Button
              variant="contained"
              color="success"
              onClick={handleEmailResend}
            >
              Get a new email with instructions
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer style={{ width: "auto" }} />
    </div>
  );
};
