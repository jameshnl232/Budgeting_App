import { Link, redirect, useLoaderData } from "react-router-dom";
import {
  Budget,
  createBudgetInLocalStorage,
  createExpenseFromLocalStorage,
  deleteBudgetFromLocalStorage,
  deleteExpenseFromLocalStorage,
  Expense,
  fetchDataFromLocalStorage,
} from "../utils/utils";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import Footer from "../components/Footer";
import BudgetItem from "../components/BudgetItem";
import ExpenseTable from "../components/ExpenseTable";

export default function Home() {
  const { user, budgets, expenses } = useLoaderData() as {
    user: string;
    budgets: Budget[];
    expenses: Expense[];
  };

  console.log({ user, budgets, expenses });

  return (
    <>
      <section className="min-h-screen flex flex-col justify-between relative bg-gradient-to-b from-blue-100 to-white z-0 min-h-screen">
        <main className="pt-10 text-center flex flex-col justify-between gap-y-20">
          {budgets && budgets.length > 0 ? null : (
            <div>
              <h1 className=" text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {`Welcome back, ${user}`}
              </h1>
              <p className="mt-8 text-lg sm:text-xl text-gray-700">
                Personal budgeting is the secret to financial freedom. <br />
                <span className="text-blue-700 font-medium">
                  Create a budget to get started!
                </span>
              </p>
            </div>
          )}
          {budgets && budgets.length > 0 ? (
            <>
              <div className="z-20 lg:flex lg:justify-between lg:items-start lg:space-x-10 px-4 lg:px-20 py-10 min-h-full">
                <div className="w-full lg:w-1/2">
                  <AddBudgetForm />
                </div>
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                  <AddExpenseForm budgets={budgets} />
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-center lg:flex lg:justify-start lg:items-center lg:pl-20 text-gray-700">
                  Your Budgets
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-4 lg:px-20">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} isBudgetsPage={false} />
                  ))}
                </div>
              </div>
              {expenses && expenses.length > 0 ? (
                <div>
                  <h2 className="text-4xl font-bold text-center lg:flex lg:justify-start lg:items-center lg:pl-20 text-gray-700">
                    <span>Your Expenses</span>
                    <span className="text-xl font-medium text-gray-500">
                      ({expenses.length})
                    </span>
                  </h2>
                  <ExpenseTable
                    expenses={expenses
                      .sort((a, b) => a.createdAt - b.createdAt)
                      .slice(0, 8)}
                    budgets={budgets}
                  />
                  {expenses.length > 8 && (
                    <Link to="/expenses" className="text-blue-500">
                      View all expenses
                    </Link>
                  )}
                </div>
              ) : null}
            </>
          ) : (
            <div className="z-20">
              <AddBudgetForm />
            </div>
          )}
        </main>
        <Footer />
      </section>
    </>
  );
}

export const loader = async () => {
  const user: string | null = fetchDataFromLocalStorage("user");
  const budgets: Budget[] = fetchDataFromLocalStorage("budgets");
  const expenses: Expense[] = fetchDataFromLocalStorage("expenses");
  return { user, budgets, expenses };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const action = formData.get("_action") as string;
  if (action === "add-budget") {
    let budgetData = Object.fromEntries(formData) as {
      category: string;
      amount: string | number;
    };
    budgetData = { ...budgetData, amount: +budgetData.amount };
    console.log(budgetData);
    createBudgetInLocalStorage(budgetData);
    toast.success("Budget created successfully");
  }
  if (action === "add-expense") {
    let expenseData = Object.fromEntries(formData) as {
      expense: string;
      amount: string | number;
      category?: string;
      budgetId: string;
    };
    const category = formData.get("category") as string;
    const budgetId = fetchDataFromLocalStorage("budgets").find(
      (budget: Budget) => budget.category === category
    )?.id;
    expenseData = { ...expenseData, amount: +expenseData.amount, budgetId };
    createExpenseFromLocalStorage({
      expense: expenseData.expense,
      amount: expenseData.amount,
      budgetId: expenseData.budgetId,
    });
    toast.success("Expense created successfully");
  }
  if (action === "delete-expense") {
    const id = formData.get("id") as string;
    deleteExpenseFromLocalStorage(id);
    toast.success("Expense deleted successfully");
  }
  if(action === "delete-budget") {
    const id = formData.get("id") as string;
    deleteBudgetFromLocalStorage(id);
    toast.success("Budget deleted successfully");
  }
  return redirect("/home");
};
