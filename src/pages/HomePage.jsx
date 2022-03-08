import { useEffect } from "react";
import { HomePageTopSection } from "../components/HomePageTopSection";

export const HomePage = () => {
  useEffect(() => {
    document.title = "BlogV3 | Welcome to blgv3";
  });
  return (
    <>
      <HomePageTopSection />
    </>
  );
};
