import { useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { expenceContext } from "../store/expense-context";

function ManageExpenses({ route, navigation }) {
  const expenseCTX = useContext(expenceContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpenses = expenseCTX.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandeler() {
    expenseCTX.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelhandeler() {
    navigation.goBack();
  }
  function confirmhandeler(expencesData) {
    if (isEditing) {
      expenseCTX.updateExpense(editedExpenseId, expencesData);
    } else {
      expenseCTX.addExpense(expencesData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        OnSubmit={confirmhandeler}
        submitButtonLabel={isEditing ? "update" : "Add"}
        onCancel={cancelhandeler}
        defaultValues={selectedExpenses}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandeler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
