import React, { useEffect } from "react";

export const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found";
  });
  return (
    <div className="flex place-content-center h-screen">
      <img
        alt="Page not found"
        src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
      />
    </div>
  );
};
