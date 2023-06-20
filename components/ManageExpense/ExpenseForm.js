import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button from "../../components/UI/Button";
import { GlobalStyles } from "../../constants/styles";

import Input from "./Input";

function ExpenseForm({ submitButtonLabel, onCancel, OnSubmit, defaultValues }) {

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true
    }
  });

  function inputChangehandeler(inputIdentifier, enterValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enterValue, isValid: true }
      };
    });
  }


  function subbmithandeler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid Input', "Please check your input values.");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: { value: curInputs.description.value, isValid: descriptionIsValid },
        }
      });
      return;
    }

    OnSubmit(expenseData);
  }

  const formIsvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;




  return (
    <View style={styles.form}>
      <Text style={styles.title}>Add your expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangehandeler.bind(this, 'amount'),
            value: inputs.amount.value
          }} />

        <Input
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          label="Date" textInputConfig={{
            placehoder: "YYYY-MM-DD",
            onChangeText: inputChangehandeler.bind(this, 'date'),
            value: inputs.date.value,
            maxLength: 10
          }} />
      </View>

      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          placehoder: "Enter text",
          onChangeText: inputChangehandeler.bind(this, 'description'),
          value: inputs.description.value,
          multiline: true,
          autoCorrect: false,
          autoCapitalize: 'none'
        }} />

      {formIsvalid && (<Text style={styles.error}>Ivalid input values - please check enter data!</Text>)}

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
  error: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
});