"use client";
import React, { useEffect, useState } from "react";
import { getQrCodeUrl, verifyOtp } from "../../../../api/auth";

export default function Qrcode() {
  const [imgUrl, setImgUrl] = useState("");
  const [verifyNumber, setVerifyNumber] = useState<Number>();
  const [data, setData] = useState();

  //   const qrUrl = async () => {
  //     const data = await getQrCodeUrl();
  //     setImgUrl(data);
  //   };
  const handleChange = (e) => {
    setVerifyNumber(e.target.value);
  };
  const handleSubmitVerify = async () => {
    console.log(verifyNumber);
    const data = await verifyOtp(verifyNumber);
    console.log(data);
    setData(data);
  };

  return (
    <div className="bg-white h-screen  w-full mx-auto ">
      {/* <img src={imgUrl} alt="123" /> */}
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Enter
        <span className="text-blue-600 dark:text-blue-500"> OTP #1</span> .
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Here at Flowbite we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
      </p>
      <input
        type="number"
        id="number-input"
        onChange={handleChange}
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 w-1/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block hover:outline-blue-500 outline-none  p-2.5 "
        required
      />
      <button
        type="button"
        onClick={handleSubmitVerify}
        className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      {data ? <div>Login Successful</div> : ""}
    </div>
  );
}
