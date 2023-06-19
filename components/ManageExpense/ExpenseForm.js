import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button from "../../components/UI/Button";

import Input from "./Input";

function ExpenseForm({ submitButtonLabel, onCancel, OnSubmit, defaultValues }) {

  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
    description: defaultValues ? defaultValues.description.toString() : ""
  });

  function inputChangehandeler(inputIdentifier, enterValue) {
    setInputValues((cutInputValues) => {
      return {
        ...cutInputValues,
        [inputIdentifier]: enterValue
      };
    });
  }


  function subbmithandeler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert('Invalid Input', "Please check your input values.");
      return;
    }

    OnSubmit(expenseData);
  }




  return (
    <View style={styles.form}>
      <Text style={styles.title}>Add your expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangehandeler.bind(this, 'amount'),
            value: inputValues.amount
          }} />

        <Input
          style={styles.rowInput}
          label="Date" textInputConfig={{
            placehoder: "YYYY-MM-DD",
            onChangeText: inputChangehandeler.bind(this, 'date'),
            value: inputValues.date,
            maxLength: 10
          }} />
      </View>

      <Input
        label="Description" textInputConfig={{
          placehoder: "Enter text",
          onChangeText: inputChangehandeler.bind(this, 'description'),
          value: inputValues.description,
          multiline: true,
          autoCorrect: false,
          autoCapitalize: 'none'
        }} />

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={subbmithandeler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 24,
    textAlign: 'center'
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
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