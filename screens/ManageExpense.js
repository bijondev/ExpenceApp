import { useContext, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { expenceContext } from "../store/expense-context";
import { storeExpense, updateExpenseHttp, deleteExpense } from "../util/http";

function ManageExpenses({ route, navigation }) {
  const [isSubbimitting, setIsSubbmitting] = useState(false);
  const [error, setError] = useState();

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
    setIsSubbmitting(true);

    try {
      deleteExpense(editedExpenseId);
      expenseCTX.deleteExpense(editedExpenseId);
    } catch (error) {
      setIsSubbmitting(false);
      setError("Could not delete expenses!");
    }

    navigation.goBack();
  }

  function cancelhandeler() {
    navigation.goBack();
  }

  async function confirmhandeler(expencesData) {
    if (isEditing) {
      // console.log(expencesData);
      // console.log(editedExpenseId);
      setIsSubbmitting(true);

      try {
        expenseCTX.updateExpense(editedExpenseId, expencesData);
        await updateExpenseHttp(editedExpenseId, expencesData);
      } catch (error) {
        setIsSubbmitting(false);
        setError("Could not update expenses!");
      }
    } else {
      setIsSubbmitting(true);

      try {
        const id = await storeExpense(expencesData);
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>" + id);
        expenseCTX.addExpense({ ...expencesData, id: id });
      } catch (error) {
        setIsSubbmitting(false);
        setError("Could not Add Expense!");
      }
    }
    navigation.goBack();
  }

  function errorHandeler() {
    setError(null);
  }

  if (error && !isSubbimitting) {
    return <ErrorOverlay message={error} onConfirm={errorhandeler} />;
  }

  if (isSubbimitting) {
    return <LoadingOverlay />;
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
