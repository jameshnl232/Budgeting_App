import budgeting_app_image from "../assets/budgeting_app_image.png";
import { Form } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      className="  px-6 pt-14 lg:px-8  bg-center bg-cover bg-blend-overlay bg-black/50 text-gray-200 min-h-screen"
      style={{ backgroundImage: `url(${budgeting_app_image})` }}
    >
      <div className="mx-auto max-w-2xl py-32 lg:flex">
        <div className="lg:text-left text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Take Control of <br />{" "}
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              Your Money
            </span>
          </h1>
          <p className=" pt-6 text-lg leading-8 italic text-gray-300 pb-5 ">
            Personal budgeting is the secret to financial freedom. Start your
            journey today.
          </p>
          <Form method="POST" action="login">
            <input
              name="user"
              id="user"
              className="block w-full lg:w-80 py-4 px-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
            <div className="pt-3 w-auto">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Get Started
                </span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
