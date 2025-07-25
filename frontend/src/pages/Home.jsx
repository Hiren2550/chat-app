import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { handleData } from "../api/auth";

const Home = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(user);
  return (
    <div>
      Home{" "}
      <div>
        <button className="cursor-pointer" onClick={() => handleData()}>
          Click
        </button>
      </div>{" "}
    </div>
  );
};

export default Home;
