import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Popover,
  Stack,
} from "@mui/material";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateIsSessionExpired } from "../redux/features/checkErrorAndStatus";
import { logUserOut } from "../redux/features/userSlice";
import { persistor } from "../redux/store";

export const NavBar = ({ bg }) => {
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logUserOut()); //sets user state to null
    persistor.purge(); //did this to delete the local storage
    navigate("/auth/login");
  };

  useEffect(() => {
    var jwtExpiry = user && jwt_decode(user?.token);

    if (jwtExpiry?.exp * 1000 - 60000 < Date.now()) {
      dispatch(updateIsSessionExpired());
      handleLogout();
    }
  });

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-20 ${
        bg !== undefined && `bg-navColor`
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12 py-4 sticky">
        <div className="md:flex justify-between items-center">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-whiteColor">
              <svg
                className="w-8 mr-2 fill-whiteColor"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Capa 1"
                viewBox="0 0 16.16 12.57"
              >
                <defs></defs>
                <path d="M14.02 4.77v7.8H9.33V8.8h-2.5v3.77H2.14v-7.8h11.88z"></path>
                <path d="M16.16 5.82H0L8.08 0l8.08 5.82z"></path>
              </svg>
            </Link>
            <div className="md:hidden">
              <button className="text-whiteColor focus:outline-none">
                <svg
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Link
              to="/about"
              className="text-lg uppercase mx-3 text-whiteColor cursor-pointer hover:text-gray-300"
            >
              About us
            </Link>

            <Link
              to="/posts"
              className="text-lg uppercase mx-3 text-whiteColor cursor-pointer hover:text-gray-300"
            >
              Posts
            </Link>

            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="text-lg uppercase mx-3 text-whiteColor cursor-pointer hover:text-gray-300"
                >
                  Login
                </Link>
                <Link
                  to="/auth/join"
                  className="text-lg uppercase mx-3 text-whiteColor cursor-pointer hover:text-gray-300"
                >
                  Join Us
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-lg uppercase mx-3 text-whiteColor cursor-pointer hover:text-gray-300"
                >
                  Dashboard
                </Link>
                <IconButton
                  size="small"
                  aria-describedby={id}
                  color="primary"
                  aria-label="avatar"
                  component="span"
                  onClick={handleClick}
                >
                  <Avatar
                    alt={`${user?.username.toUpperCase()}`}
                    sx={{
                      bgcolor: "yellow",
                      color: "black",
                      cursor: "pointer",
                      width: "35px",
                      height: "35px",
                    }}
                    src={`${user.profilePicture}`}
                  />
                </IconButton>

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Stack
                    direction="column"
                    divider={<Divider orientation="horizontal" flexItem />}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      size="medium"
                      disableElevation
                    >
                      Update Your Profile
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      size="medium"
                      disableElevation
                    >
                      Change your password
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Stack>
                </Popover>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
