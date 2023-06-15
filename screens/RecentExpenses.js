import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";

function RecentExpenses() {
  return <ExpensesOutput expencePriod="Last 7 days" />;
}

export default RecentExpenses;
