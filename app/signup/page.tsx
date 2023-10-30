"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

import Input from "@/app/components/Input";

const SignUp = () => {
  const session = useSession();
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (session.data) {
      router.replace("/");
    }
  }, [session, router]);

  const register = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/signup", {
        name: user.username,
        email: user.email,
        password: user.password,
      });
      toast.success(data.message);
      router.push("/login");
      toast.error(data.error);
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-full w-full relative bg-[url('/images/ecomm.jpg')] bg-cover bg-fixed bg-no-repeat">
      <div className="bg-white w-full h-full lg:bg-opacity-10">
        <div className="flex justify-center">
          <div className="bg-orange-200 bg-opacity-50 px-20 py-20 w-full mt-5 self-center lg:max-w-md rounded-md">
            <h2 className="text-red-950 text-5xl font-semibold mb-8">
              Sign Up
            </h2>
            <div className="flex flex-col gap-3">
              <Input
                id="username"
                value={user.username}
                type="text"
                onChange={handleChange}
                label="Username"
                name="username"
              />
              <Input
                id="email"
                value={user.email}
                type="email"
                onChange={handleChange}
                label="Email"
                name="email"
              />
              <Input
                label="Password"
                onChange={handleChange}
                id="password"
                value={user.password}
                type="password"
                name="password"
              />
            </div>
            <button
              onClick={register}
              disabled={isLoading}
              className="bg-red-900 py-2 text-white rounded-md w-full mt-8 hover:bg-red-800 disabled:bg-red-300 transition"
            >
              {isLoading ? "Signing Up" : "Sign Up"}
             
            </button>
            <p className="text-pink-900 my-4 text-center text-xl">OR</p>
            <div className="w-full flex justify-center my-3">
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() => signIn("google", { redirect: false })}
              >
                <FcGoogle size={30} />
              </div>
            </div>
            <p className="text-red-950 mt-4">
              Already have an account?
              <Link
                className="text-pink-800 ml-1 hover:underline cursor-pointer"
                href="/signin"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
