import { Budget } from "../utils/utils";
import { Link, useFetcher } from "react-router-dom";

import { formatCurrency, calculateSpentByBudget } from "../utils/utils";

export default function BudgetItem({
  budget,
  isBudgetsPage,
}: {
  budget: Budget;
  isBudgetsPage: boolean;
}) {
  const { category, amount, color, id } = budget;
  const fetcher = useFetcher();
  const totalExpenses = calculateSpentByBudget(budget.id);
  const remaining = amount - totalExpenses;
  const percentage = (totalExpenses / amount) * 100;

  return (
    <div
      className="flex-col items-center justify-center bg-white shadow-lg p-4 rounded-lg hover:scale-105 transition-all ease-in-out border-4
    "
      style={{ borderColor: `hsl(${color})` }} // Apply the color dynamically
    >
      <div className="flex justify-between items-start px-10">
        <div>
          <h2 className="text-lg font-semibold">{category}</h2>
        </div>
        <div>
          <p className="text-sm text-gray-500">{formatCurrency(amount)}</p>
          <fetcher.Form method="POST">
            <input type="hidden" name="id" value={budget.id} />
            <input type="hidden" name="_action" value="delete-budget" />
            <button className="text-red-500">Delete</button>
          </fetcher.Form>
        </div>
      </div>
      <div className="w-full px-10">
        <div
          className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700"
          // Set the outer container's background
        >
          <div
            className="h-2.5 rounded-full dark:bg-gray-300 transition-all duration-300 ease-in-out"
            style={{
              width: `${percentage}%`, // Adjust this dynamically based on your data
              maxWidth: "100%",
              backgroundColor: `hsl(${color})`, // Match the inner bar's color with the outer container
            }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between items-start px-10">
        <div>
          <small className="text-sm text-gray-500">
            {formatCurrency(totalExpenses)} spent
          </small>
        </div>
        <div>
          <small className="text-sm text-gray-500">
            {formatCurrency(remaining)} remaining
          </small>
        </div>
      </div>
      {isBudgetsPage && (
        <Link to={id}>
          <div className="text-center pt-5 hover:text-red-900 hover:underline" >View Details</div>
        </Link>
      )}
    </div>
  );
}
