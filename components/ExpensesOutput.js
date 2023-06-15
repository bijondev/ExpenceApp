import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummery from "./ExpensesSummery";

function ExpensesOutput({ expenses, expencePriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (expenses.length) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummery expenses={expenses} priodName={expencePriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginTop: 32,
  },
});
