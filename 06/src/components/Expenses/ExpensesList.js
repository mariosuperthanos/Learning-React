import ExpenseItem from "./ExpenseItem";
import './ExpensesList.css'

const ExpensesList = ({filteredExpenses}) => {
  if(filteredExpenses.length===0) {
    return <h2 className="expenses-list__fallback">Found no expenses!</h2>
  }

  return <ul className="expenses-list">
    {filteredExpenses.map((element, index) => (
      <ExpenseItem
        // telling react that that we add a new component
        key={element.id != null ? element.id : index}
        title={element.title}
        amount={element.amount}
        date={element.date}
      />
    ))}
  </ul>

}

export default ExpensesList;