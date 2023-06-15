import { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { expenceContext } from "../store/expense-context";

function AllExpenses() {
  const expensesCTX = useContext(expenceContext);
  return (
    <ExpensesOutput
      expenses={expensesCTX.expenses}
      fallbackText="No expenses"
      expencePriod="Total"
    />
  );
}

export default AllExpenses;
