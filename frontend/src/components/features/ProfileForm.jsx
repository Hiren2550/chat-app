import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import placeholder from "@/assets/images/placeholder.png";
import { IoCameraOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";

const ProfileForm = ({ className, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(undefined);
  const [fileUrl, setFileUrl] = useState(null);
  const fileRef = useRef(null);
  const onSubmit = () => {};
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
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Profile</h1>
                </div>
                <div className="grid gap-2 relative">
                  <input
                    onChange={(e) => {
                      let fileData = e.target.files[0];
                      setFile(fileData);
                      setFileUrl(URL.createObjectURL(fileData));
                    }}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                  />
                  <img
                    className="rounded-full border-gray-300 h-28 w-28 object-cover self-center mt-2 mx-auto"
                    src={
                      fileUrl ||
                      placeholder ||
                      formData.avatar ||
                      currentUser.avatar
                    }
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
                <div className="grid gap-2">
                  <Label htmlFor="email" className="mx-1">
                    Email
                  </Label>
                  <p
                    className=" border p-2 border-gray-300 focus:outline-none bg-slate-200
                  rounded-lg "
                  >
                    Test@12334
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
