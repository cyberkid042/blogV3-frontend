import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { About } from "./pages/About";
import { ConfirmAccount } from "./pages/auth/ConfirmAccount";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { VerifyAccount } from "./pages/auth/VerifyAccount";
import { Dashboard } from "./pages/Dashboard";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { AllPosts } from "./pages/posts/AllPosts";
import { SinglePost } from "./pages/posts/SinglePost";
import { UserPage } from "./pages/users/UserPage";

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.users.user);

  return (
    <>
      {location.pathname !== "/" && (
        <NavBar bg={location.pathname !== "/" && "navColor"} />
      )}
      <NavBar />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/about" element={<About />} />
        <Route
          path="/auth/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/auth/join"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/auth/confirm-email/:token"
          element={
            user && user?.isVerified ? (
              <Navigate to="/dashboard" />
            ) : (
              <ConfirmAccount />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            !user ? (
              <Navigate to="/auth/login" state={{ from: location }} replace />
            ) : user.isVerified ? (
              <Dashboard />
            ) : (
              <Navigate to="/verify-account" />
            )
          }
        />
        <Route
          path="/verify-account"
          element={
            !user ? (
              <Navigate to="/auth/login" state={{ from: location }} replace />
            ) : user.isVerified ? (
              <Navigate to="/dashboard" />
            ) : (
              <VerifyAccount />
            )
          }
        />
        <Route path="/user/:username" element={<UserPage />} />

        <Route path="/posts" element={<AllPosts />} />
        <Route path="/post/:title" element={<SinglePost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

/* <Route path="/posts" element={<AllPosts />}>
          <Route path=":invoiceId" element={<Invoice />} />
          <Route path="sent" element={<SentInvoices />} />
        </Route> */

// function RequireAuth({ location, user }) {
//   if (!user)
//     return <Navigate to="/auth/login" state={{ from: location }} replace />;

//   if (user.isVerified) {
//     return <Navigate to="/dashboard" replace />;
//   } else {
//     return <Navigate to="/verify-account" replace />;
//   }
// }

export default App;
