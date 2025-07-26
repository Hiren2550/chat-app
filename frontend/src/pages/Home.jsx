import Navbar from "@/components/features/Navbar";
import { clearUser } from "@/redux/auth/authSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
