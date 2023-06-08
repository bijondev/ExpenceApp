import { View, FlatList } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummery from "./ExpensesSummery";

function ExpensesOutput({ expenses, expencePriod }) {
  return (
    <View>
      <ExpensesSummery expenses={expenses} priodName={expencePriod} />
      <ExpensesList />
    </View>
  );
}

export default ExpensesOutput;
