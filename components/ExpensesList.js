import { View, Text, FlatList } from "react-native";
import ExpenceItem from "./ExpenceItem";

function renderExpencesItem(itemData) {
  // console.log(itemData.item.description);
  // return <Text>{itemData.item.description}</Text>;
  return <ExpenceItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpencesItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
