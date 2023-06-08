import { View, Text, FlatList } from "react-native";

function ExpensesSummery({ expenses, priodName }) {
  const expensesSum = expenses.reduce((sum, expens) => {
    return sum + expens.amount;
  }, 0);
  return (
    <View>
      <Text>{priodName}</Text>
      <Text>$ {expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummery;
