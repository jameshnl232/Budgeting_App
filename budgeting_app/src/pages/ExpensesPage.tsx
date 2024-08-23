import { toast } from "react-toastify";
import ExpenseTable from "../components/ExpenseTable";
import { Budget, deleteExpenseFromLocalStorage, Expense, fetchDataFromLocalStorage } from "../utils/utils";
import { redirect, useLoaderData } from "react-router-dom";

export default function ExpensesPage() {
  const { budgets, expenses } = useLoaderData() as {
    budgets: Budget[];
    expenses: Expense[];
  };

  return (
    <div>
      {expenses && expenses.length > 0 ? (
        <div>
          <h2 className="text-4xl font-bold text-center lg:flex lg:justify-start lg:items-center lg:pl-20 text-gray-700">
            <span>Your Expenses</span>
            <span className="text-xl font-medium text-gray-500">
              ({expenses.length})
            </span>
          </h2>
          <ExpenseTable
            expenses={expenses.sort((a, b) => a.createdAt - b.createdAt)}
            budgets={budgets}
          />
        </div>
      ) : null}
    </div>
  );
}

export const loader = async () => {
  const budgets: Budget[] = fetchDataFromLocalStorage("budgets");
  const expenses: Expense[] = fetchDataFromLocalStorage("expenses");
  return { budgets, expenses };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const action = formData.get("_action") as string;
  if (action === "delete-expense") {
    const id = formData.get("id") as string;
    deleteExpenseFromLocalStorage(id);
    toast.success("Expense deleted successfully");
  }
  return redirect("/expenses");
};
