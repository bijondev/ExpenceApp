import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { expenceContext } from "../store/expense-context";
import { getDateMinutsDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const expensesCTX = useContext(expenceContext);
  // const [fetchExpensesD, setFetchExpensesD] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);

      try {
        const expenses = await fetchExpenses();
        expensesCTX.setExpenses(expenses);
      }
      catch (error) {
        setError("Could not fetch expenses!");
      }

      setIsFetching(false);
      // setFetchExpensesD(expenses);

    }

    getExpenses();
  }, []);

  function errorHandeler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandeler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

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
