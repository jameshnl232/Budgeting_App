function generateRandomColor() {
  const existingBudgets = fetchDataFromLocalStorage("budgets") ?? [];
  const length = existingBudgets.length ?? 0;
  return `${length * 34} 65% 50%`;
}

export type Budget = {
  id: string;
  category: string;
  amount: number;
  createdAt: number;
  color: string;
};

export type Expense = {
  id: string;
  budgetId: string;
  amount: number;
  expense: string;
  createdAt: number;
};

export function fetchDataFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key)!);
}

export function deleteUserDataFromLocalStorage() {
  localStorage.removeItem("user");
  localStorage.removeItem("budgets");
  localStorage.removeItem("expenses");
}

export function createUserInLocalStorage(username: string) {
  localStorage.setItem("user", JSON.stringify(username));
}

export function createBudgetInLocalStorage({
  category,
  amount,
}: {
  category: string;
  amount: number | string;
}) {
  const newBudget: Budget = {
    id: crypto.randomUUID(),
    category,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };
  const budget = fetchDataFromLocalStorage("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...budget, newBudget])
  );
}

export function deleteBudgetFromLocalStorage(id: string) {
  const budgets = fetchDataFromLocalStorage("budgets");
  const newBudgets = budgets.filter((budget: Budget) => budget.id !== id);
  const expenses = fetchDataFromLocalStorage("expenses");
  const newExpenses = expenses.filter(
    (expense: Expense) => expense.budgetId !== id
  );
  localStorage.setItem("expenses", JSON.stringify(newExpenses));
  return localStorage.setItem("budgets", JSON.stringify(newBudgets));
}

export function createExpenseFromLocalStorage({
  budgetId,
  amount,
  expense,
}: {
  budgetId: string;
  amount: number | string;
  expense: string;
}) {
  const newExpense = {
    id: crypto.randomUUID(),
    budgetId,
    amount: +amount,
    expense,
    createdAt: Date.now(),
  };
  const expenses = fetchDataFromLocalStorage("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...expenses, newExpense])
  );
}

export function deleteExpenseFromLocalStorage(id: string) {
  const expenses = fetchDataFromLocalStorage("expenses");
  const newExpenses = expenses.filter((expense: Expense) => expense.id !== id);
  return localStorage.setItem("expenses", JSON.stringify(newExpenses));
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export function calculateSpentByBudget(budgetId: string) {
  const expenses = fetchDataFromLocalStorage("expenses") ?? [];
  const totalExpenses = expenses
    .filter((expense: Expense) => expense.budgetId === budgetId)
    .reduce((acc: number, curr: Expense) => acc + curr.amount, 0);

  return totalExpenses;
}

export function getAllExpensesFromACategory(budgetID: string) {
  const expenses = fetchDataFromLocalStorage("expenses") ?? [];
  return expenses.filter((expense: Expense) => expense.budgetId === budgetID);
}
