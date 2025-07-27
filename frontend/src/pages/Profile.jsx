import Navbar from "@/components/features/Navbar";
import ProfileForm from "@/components/features/ProfileForm";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-muted h-[calc(100vh-4rem)]   flex flex-col items-center  p-2 md:p-2">
        <div className="w-full max-w-sm md:max-w-3xl">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
