import { Budget } from "../utils/utils";
import { useFetcher } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function AddExpenseForm({ budgets }: { budgets: Budget[] }) {
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
      <div className="max-w-sm lg:max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Add new {""}
          {budgets.length === 1 &&
            `${budgets.map((budget) => budget.category)}`}{" "}
          {""}
          expense
        </h2>
        <fetcher.Form method="POST" ref={formRef}>
          <div className="mb-4">
            <label
              htmlFor="expense"
              className="block text-lg font-medium text-gray-700"
            >
              Expense
            </label>
            <input
              type="text"
              id="expense"
              placeholder="Enter expense e.g Mc.Donald, books"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              name="expense"
            />
          </div>
          <div className="mb-4">
            <input type="hidden" name="_action" value="add-expense"></input>
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

          <div className="mb-4" hidden={budgets.length === 1}>
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {budgets
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((budget) => (
                  <option key={budget.id} value={budget.category}>
                    {budget.category}
                  </option>
                ))}
            </select>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:from-green-500 hover:via-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Add expense
          </button>
        </fetcher.Form>
      </div>
    </>
  );
}
