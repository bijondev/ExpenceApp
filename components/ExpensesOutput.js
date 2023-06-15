import { View, FlatList, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummery from "./ExpensesSummery";

const DUMMY_EXPENSES =[
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    data: new Date('2021-12-19')
  },
  {
    id: 'e2',
    description: 'A pair of trouser',
    amount: 89.29,
    data: new Date('2021-12-25')
  },
  {
    id: 'e3',
    description: 'A pair of bananas',
    amount: 5.29,
    data: new Date('2021-04-19')
  },
  {
    id: 'e4',
    description: 'A book2',
    amount: 17.13,
    data: new Date('2021-03-14')
  },
  {
    id: 'e5',
    description: 'A book',
    amount: 14.35,
    data: new Date('2021-03-19')
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    data: new Date('2021-12-19')
  },
  {
    id: 'e7',
    description: 'A pair of trouser',
    amount: 89.29,
    data: new Date('2021-12-25')
  },
  {
    id: 'e8',
    description: 'A pair of bananas',
    amount: 5.29,
    data: new Date('2021-04-19')
  },
  {
    id: 'e9',
    description: 'A book2',
    amount: 17.13,
    data: new Date('2021-03-14')
  },
  {
    id: 'e10',
    description: 'A book',
    amount: 14.35,
    data: new Date('2021-03-19')
  }
];

function ExpensesOutput({ expenses, expencePriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummery expenses={DUMMY_EXPENSES} priodName={expencePriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: GlobalStyles.colors.primary700
  }
});
