import { useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";

function ManageExpenses({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandeler() {
    navigation.goBack();
  }
  function cancelhandeler(){
    navigation.goBack();
  }
  function confirmhandeler(){
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={cancelhandeler}>Cancel</Button>
        <Button style={styles.button} onPress={confirmhandeler}>{isEditing ? 'Update': 'Add'}</Button>
      </View>
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
container:{
  flex:1,
  padding: 24,
  backgroundColor: GlobalStyles.colors.primary800,
},
deleteContainer:{
  marginTop: 16,
  paddingTop: 8,
  borderTopWidth: 2,
  borderTopColor: GlobalStyles.colors.primary200,
  alignItems: 'center'
},
buttons:{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
},
button:{
  minWidth: 120,
  marginHorizontal: 8
}
});
