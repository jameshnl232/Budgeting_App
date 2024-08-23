import { LoaderFunction, redirect, useLoaderData } from "react-router-dom";
import { Budget, deleteBudgetFromLocalStorage, Expense, fetchDataFromLocalStorage } from "../utils/utils";
import BudgetItem from "../components/BudgetItem";
import { toast } from "react-toastify";

export default function BudgetPage() {
  const { budget, expensesOfBudget } = useLoaderData() as {
    budget: Budget;
    expensesOfBudget: Expense[] | null;
  };

  console.log(budget, expensesOfBudget);

  return (
    <div className="px-20 flex-col justify-center items-center">
      <BudgetItem budget={budget} isBudgetsPage={false} />
      <div>
        <h2 className="pt-5 text-4xl font-bold text-center lg:flex lg:justify-start lg:items-center lg:pl-20 text-gray-700">
          Expenses of {budget.category}
        </h2>
        {expensesOfBudget && expensesOfBudget.length > 0 ? (
          <div className="flex justfify-center items-center py-10 ">
            <table className="w-full bg-white shadow-md rounded-lg mx-20">
              <thead>
                <tr className="text-2xl font-semibold text-left">
                  <th className="py-4 px-6">Expense</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Date</th>
                </tr>
              </thead>
              <tbody className="text-left">
                {expensesOfBudget.map((expense) => (
                  <tr key={expense.id} className="border-b border-gray-200">
                    <td className="py-4 px-6">{expense.expense}</td>
                    <td className="py-4 px-6">{expense.amount}</td>
                    <td className="py-4 px-6">{budget.category}</td>
                    <td className="py-4 px-6">
                      {new Date(expense.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-2xl mt-10">No expenses added yet</div>
        )}
      </div>
    </div>
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const budgets: Budget[] = fetchDataFromLocalStorage("budgets");
  const budget = budgets.find((budget) => budget.id === id);
  const expensesOfBudget: Expense[]  = fetchDataFromLocalStorage(
    "expenses"
  )?.filter((expense: Expense) => expense.budgetId === id);

  return { budget, expensesOfBudget };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const action = formData.get("_action") as string;
  if (action === "delete-budget") {
    const id = formData.get("id") as string;
    deleteBudgetFromLocalStorage(id);
    toast.success("Budget deleted successfully");
  }
  return redirect("/budgets");
};
