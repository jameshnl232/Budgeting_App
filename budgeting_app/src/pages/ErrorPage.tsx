import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: { error: { message: string } } = useRouteError() as { error: { message: string } };

  console.log(error); 

  return (
    <div className="h-screen flex-col items-center content-center justify-center text-center">
      <h1 className="text-4xl text-bold pb-10">Opps!</h1>
      <h2 className="text-2xl py-5">An error has occured</h2>
      <h2 className="italic text-gray-500">{error.error.message}</h2>
    </div>
  );
};

export default ErrorPage;
