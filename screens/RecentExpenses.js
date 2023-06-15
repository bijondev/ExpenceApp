import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { expenceContext } from "../store/expense-context";
import { getDateMinutsDays } from "../util/date";

function RecentExpenses() {
  const expensesCTX = useContext(expenceContext);

  const _recentExpenses = expensesCTX.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinutsDays(today, 7);
    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput 
    expenses={_recentExpenses} 
    fallbackText="No expenses for last 7 days" 
    expencePriod="Last 7 days" 
    />
  );
}

export default RecentExpenses;
