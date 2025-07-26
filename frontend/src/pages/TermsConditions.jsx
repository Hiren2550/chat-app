import Navbar from "@/components/features/Navbar";
import TermsPrivacy from "@/components/features/TermsPrivacy";

export default function TermsConditions() {
  return (
    <div>
      <Navbar />
      <div className="bg-muted flex flex-col items-center justify-center p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-4 select-none ">
          Terms and Conditions
        </h1>
        <div className="w-full max-w-sm md:max-w-5xl border border-slate-600 rounded-lg bg-white">
          <TermsPrivacy />
        </div>
      </div>
    </div>
  );
}
