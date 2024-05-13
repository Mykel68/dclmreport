"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/dlbc.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5001/auth/login`,
        formData,
        { withCredentials: false }
      );
      const token = response.data.token;
      localStorage.setItem("token", response.data.token);

      // Redirect based on user role
      const decodedToken = jwtDecode(response.data.token);

      if (decodedToken.userType === "Admin") {
        router.push("/admin");
      } else if (decodedToken.userType === "Super admin") {
        router.push("/super_admin");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized access, handle accordingly
        toast.error("Unauthorized access. Please check your credentials.", {
          position: "top-right",
        });
      } else {
        // Other errors, log the details
        console.error("Error:", error);
      }
    }
  };
  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex items-center p-5">
        <Image src={Logo} alt="Image" className=" w-1/2  object-cover " />
      </div>
    </div>
  );
}
