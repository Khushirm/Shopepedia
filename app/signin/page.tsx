"use client";

import { signIn, useSession } from "next-auth/react";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

import Input from "@/app/components/Input";

import { useRouter } from "next/navigation";

const Signin = () => {
  const session = useSession();
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
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

  const login = async (e:React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });
      toast.success("Logged in successfully");
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      toast.error("Some error occured. Please try again later!");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full overflow-hidden relative bg-[url('/images/ecomm.jpg')] bg-cover bg-fixed bg-no-repeat">
      <div className="bg-white w-full h-full lg:bg-opacity-10">
        <div className="flex justify-center">
          <div className="bg-orange-200 bg-opacity-50 px-20 py-20 w-full mt-8 self-center lg:max-w-md rounded-md">
            <h2 className="text-red-950 text-5xl font-semibold mb-8">
              Sign In
            </h2>
            <form className="flex flex-col gap-3" onSubmit={login}>
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
              <button
                type="submit"
                disabled={isLoading}
                className="bg-red-950 py-2 text-white mt-8 rounded-md w-full hover:bg-red-800 transition disabled:bg-red-300"
              >
                {isLoading ? "Signing In" : "Sign In"}
              </button>
            </form>
            <p className="text-red-900 text-center my-4 text-xl">OR</p>
            <div className="w-full flex justify-center my-3">
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() => signIn("google", { redirect: false })}
              >
                <FcGoogle size={30} />
              </div>
            </div>
            <p className="text-red-950 mt-4">
              Are you a new user?
              <Link
                href="/signup"
                className="text-pink-800 ml-1 hover:underline cursor-pointer"
              >
                Create a new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signin;
