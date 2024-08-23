import HeroSection from "../components/HeroSection";
import { redirect } from "react-router-dom";
import {
  createUserInLocalStorage,
  deleteUserDataFromLocalStorage,
  fetchDataFromLocalStorage,
} from "../utils/utils";
import { toast } from "react-toastify";


export default function LandingPage() {

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 left-0 flex justify-center lg:justify-start ">
        <button
          onClick={() => {
            redirect("/");
          }}
          type="button"
          className=" mt-10 lg:ml-10 py-2.5 px-5 text-2xl font-medium text-gray-100 transition-all duration-400 ease-in-out hover:scale-125"
        >
          ControlBudget
        </button>
      </div>
      <HeroSection />
    </div>
  );
}

export function logoutAction() {
  deleteUserDataFromLocalStorage();
  toast.success("You have been logged out");
  return redirect("/");
}

export async function loginAction({ request }: { request: Request }) {
  const user = fetchDataFromLocalStorage("user");
  if (user) {
    toast.error("You are already logged in");
    return redirect("/home");
  }
  const formData = await request.formData();
  const userData = Object.fromEntries(formData) as { user: string };
  createUserInLocalStorage(userData.user);
  toast.success("You have been logged in");
  console.log(user);
  return redirect("/home");
}
