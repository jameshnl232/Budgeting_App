import { redirect, useLoaderData } from "react-router-dom";
import BudgetItem from "../components/BudgetItem";
import { Budget, deleteBudgetFromLocalStorage, fetchDataFromLocalStorage } from "../utils/utils";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Budgets() {
  const { budgets } = useLoaderData() as { budgets: Budget[] };

  const [isBudgetsPage] = useState(true);

  return (
    <div>
      <h2 className="text-4xl py-2 font-bold text-center lg:flex lg:justify-start lg:items-center lg:pl-20 font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        Your Budgets
      </h2>
      {budgets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-4 lg:px-20">
          {budgets.map((budget) => (
            <BudgetItem
              key={budget.id}
              budget={budget}
              isBudgetsPage={isBudgetsPage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl mt-10">No budgets added yet</div>
      )}
    </div>
  );
}

export const loader = async () => {
  const budgets: Budget[] = fetchDataFromLocalStorage("budgets");
  return { budgets };
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
}
