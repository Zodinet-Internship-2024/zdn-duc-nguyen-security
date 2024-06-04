"use client";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const GoogleCaptchaWrapper = ({ children }: { children: React.ReactNode }) => {
  const reCaptchaKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "NOT DEFINED";
  console.log(reCaptchaKey);
  return (
    <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
};
export default GoogleCaptchaWrapper;
