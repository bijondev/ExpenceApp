import { Pressable, View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import { getFormatedDate } from "../util/date";

function ExpenceItem({ id, description, amount, data }) {
  const navigation = useNavigation();

  function expensesPresshandeler() {
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    });
  }
  return (
    <Pressable onPress={expensesPresshandeler}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.txtBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.txtBase}>{getFormatedDate(data)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenceItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  txtBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
