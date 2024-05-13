import Image from "next/image";
import React from "react";
import Logo from "@/assets/dlbc.png";

const Banner = () => {
  return (
    <div className="w-full items-center flex-col justify-center flex mb-2">
      <Image src={Logo} alt="logo" className=" w-1/6  mb-3 " />
      <div className="">
        <h2 className="text-2xl font-semibold underline underline-offset-8 ">
          DCLM Operational Report
        </h2>
      </div>
    </div>
  );
};

export default Banner;
