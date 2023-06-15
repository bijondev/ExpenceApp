import { createContext, useReducer } from "react";

const DUMMY_EXPENSES =[
  {
    id: 'e1',
    description: 'A pair of shoes 123',
    amount: 59.99,
    date: new Date('2023-06-14')
  },
  {
    id: 'e2',
    description: 'A pair of trouser',
    amount: 89.29,
    date: new Date('2021-12-25')
  },
  {
    id: 'e3',
    description: 'A pair of bananas',
    amount: 5.29,
    date: new Date('2023-06-10')
  },
  {
    id: 'e4',
    description: 'A book2',
    amount: 17.13,
    date: new Date('2021-03-14')
  },
  {
    id: 'e5',
    description: 'A book',
    amount: 14.35,
    date: new Date('2021-03-19')
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19')
  },
  {
    id: 'e7',
    description: 'A pair of trouser',
    amount: 89.29,
    date: new Date('2021-12-25')
  },
  {
    id: 'e8',
    description: 'A pair of bananas',
    amount: 5.29,
    date: new Date('2021-04-19')
  },
  {
    id: 'e9',
    description: 'A book2',
    amount: 17.13,
    date: new Date('2021-03-14')
  },
  {
    id: 'e10',
    description: 'A book',
    amount: 14.35,
    date: new Date('2021-03-19')
  }
];

export const expenceContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReduicer(state, action){
    switch(action.type){
        case 'ADD':
            const id = parseInt(new Date / 1000).toString();
            console.log("-----------------------");
            console.log({...action.payload});
            return [{...action.payload, id:id }, ...state];


        case 'UPDATE':
            const updateableExpenseIndex = state.findIndex( 
                (expense) => expense.id === action.payload.id);

            const updateableExpense = state[updateableExpenseIndex];
            const updatadItem = { ...updateableExpense, ...action.payload.data};
            const updatedExpense = [...state];
            updatedExpense[updateableExpenseIndex]=updatadItem;
            return updatedExpense;


        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
        return state;
    }
}

function ExpensesContextProvider({children}){
    const [expensesState, dispatch]= useReducer(expensesReduicer, DUMMY_EXPENSES);

    function addExpense(expenceData){
        dispatch({type: 'ADD', payload: expenceData});
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenceData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenceData}});
    }

    const value ={
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }


    return <expenceContext.Provider value={value}>{children}</expenceContext.Provider>
}

export default ExpensesContextProvider;