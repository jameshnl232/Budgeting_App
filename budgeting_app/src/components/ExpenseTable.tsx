import { Expense, Budget } from "../utils/utils";
import { formatCurrency } from "../utils/utils";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useFetcher } from "react-router-dom";

export default function ExpenseTable({
  expenses,
  budgets,
}: {
  expenses: Expense[];
  budgets: Budget[];
}) {
  const fetcher = useFetcher();

  return (
    <>
      <div className="flex overflow-x-auto justfify-center items-center py-10 px-20">
        <table className=" w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-2xl font-semibold text-left ">
              <th className="py-4 px-6">Expense</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Date</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {expenses.map((expense) => {
              const budget = budgets.find(
                (budget) => budget.id === expense.budgetId
              );
              return (
                <tr key={expense.id} className="border-b border-gray-200">
                  <td className="py-4 px-6">{expense.expense}</td>
                  <td className="py-4 px-6">
                    {formatCurrency(+expense.amount)}
                  </td>
                  <td className="py-4 px-6">{budget?.category}</td>
                  <td className="py-4 px-6">
                    {new Date(expense.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <fetcher.Form method="POST">
                      <button className="text-red-500">
                        <input type="hidden" name="id" value={expense.id} />
                        <input
                          type="hidden"
                          name="_action"
                          value="delete-expense"
                        />
                        <div className="flex gap-2 items-center justify-center content-center">
                          <span>Delete</span>
                          <TrashIcon height={20} width={20} />
                        </div>
                      </button>
                    </fetcher.Form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
