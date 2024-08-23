import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

export default function AddBudgetForm() {
  
      const fetcher = useFetcher();
      const isSubmitting = fetcher.state === "submitting";

      const formRef = useRef<HTMLFormElement>(null);

      useEffect(() => {
        if (!isSubmitting) {
          formRef?.current?.reset();
        }
      }, [isSubmitting]);

  return (
    <>
      <fetcher.Form
        ref={formRef}
        method="POST"
        className="max-w-sm lg:max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <input type="hidden" name="_action" value="add-budget"></input>
        </div>
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Create a Budget
        </h2>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            placeholder="Enter category e.g Food, Rent"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name="category"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-lg font-medium text-gray-700"
          >
            Budget Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter budget amount e.g $500"
            step={0.01}
            inputMode="decimal"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:from-green-500 hover:via-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Create Budget
        </button>
      </fetcher.Form>
    </>
  );
}
