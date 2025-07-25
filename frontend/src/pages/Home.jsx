import { clearUser } from "@/redux/auth/authSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      Home{" "}
      <div>
        <button
          className="cursor-pointer"
          onClick={() => {
            dispatch(clearUser());
          }}
        >
          Click
        </button>
      </div>{" "}
    </div>
  );
};

export default Home;
