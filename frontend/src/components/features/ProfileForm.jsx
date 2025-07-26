import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import placeholder from "@/assets/images/placeholder.png";
import { IoCameraOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import UserApi from "@/api/user";
import { setUser, user } from "@/redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Input } from "../ui/input";

const ProfileForm = ({ className, ...props }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { updateUserData } = new UserApi();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);
  const [base64URL, setBase64URL] = useState("");
  const dispatch = useDispatch();
  const userDetails = useSelector(user);
  useEffect(() => {
    if (userDetails) {
      reset({
        fullname: userDetails?.fullname,
      });
    }
  }, [userDetails]);
  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    convertToBase64(imageFile);
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64URL(reader.result);
    };
    reader.onerror = (error) => {};
  };

  const handleUpdate = async (data) => {
    if (!base64URL) return alert("No image selected");
    let updatedata = {
      image: base64URL,
      fullname: data?.fullname,
    };
    setIsLoading(true);
    try {
      const response = await updateUserData(updatedata);
      if (response.success) {
        dispatch(setUser(response.data));
        toast.success(response?.message ?? "User Data updated Successfully");
      } else {
        toast.error(response.message ?? "Error While Updating User Data");
      }
    } catch (error) {
      toast.error(error?.message ?? "Error while updating User Data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "flex flex-col gap-6 justify-center select-none",
          className
        )}
        {...props}
      >
        <Card className="overflow-hidden p-0 min-w-lg w-full">
          <CardContent className="grid p-0 grid-cols-1">
            <form
              className="p-6 md:p-8 w-full mx-auto"
              noValidate
              onSubmit={handleSubmit(handleUpdate)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Profile</h1>
                </div>
                <div className="grid gap-2 relative">
                  <input
                    onChange={handleFileChange}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                  />
                  <img
                    className="rounded-full border-gray-300 h-28 w-28 object-cover self-center mt-2 mx-auto"
                    src={base64URL || userDetails?.profile_image || placeholder}
                    alt="Profile"
                  />
                  <div className="absolute bottom-1/8 right-3/8 p-2 rounded-full cursor-pointer bg-slate-600 border border-gray-800">
                    <IoCameraOutline
                      size={24}
                      className="text-white"
                      onClick={() => fileRef.current.click()}
                    />
                  </div>
                </div>
                {/* <div className="grid gap-2">
                  <Label htmlFor="fullname" className="mx-1">
                    Full Name
                  </Label>
                  <p
                    className=" border p-2 border-gray-300 focus:outline-none bg-slate-200
                  rounded-lg "
                  >
                    {userDetails?.fullname}
                  </p>
                </div> */}
                <div className="grid gap-3">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    className={isLoading ? "bg-slate-200" : ""}
                    {...register("fullname", {
                      required: {
                        value: true,
                        message: "Full Name is required",
                      },
                    })}
                    id="fullname"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Full Name"
                    disabled={isLoading}
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-xs">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="mx-1">
                    Email
                  </Label>
                  <p
                    className=" border p-2 border-gray-300 focus:outline-none bg-slate-200
                  rounded-lg "
                  >
                    {userDetails?.email}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="mx-1">
                    Joined At
                  </Label>
                  <p
                    className=" border p-2 border-gray-300 focus:outline-none bg-slate-200
                  rounded-lg "
                  >
                    {userDetails?.createdAt
                      ? moment(userDetails?.createdAt).format(
                          "Do MMM YY, hh:mm:ss a"
                        )
                      : "N/A"}
                  </p>
                </div>
                <Button
                  type="submit"
                  className={`w-full ${
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {isLoading ? "Loading..." : "Update"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileForm;
