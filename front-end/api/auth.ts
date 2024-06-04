import axios from "axios";
import { verify } from "crypto";
interface FormData {
  email: string;
  password: string;
}
export const signIn = async (formData: FormData, gRecaptchaToken: string) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/signIn", {
      ...formData,
      token: gRecaptchaToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export const getQrCodeUrl = async () => {
  try {
    const response = await axios.get("http://localhost:3000/auth/enable-2fa");
    return response.data;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export const verifyOtp = async (otp: number) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/verify-otp", {
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};
