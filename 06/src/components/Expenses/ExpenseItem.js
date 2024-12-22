import { useState } from "react";

import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";
import Card from "../UI/Card";

function ExpenseItem({ title, amount, date }) {
  const [contentTitle, setContentTitle] = useState(title);

  return (
    // Card is an abstraction for a div with the specified classname
    <li>
      <Card className={"expense-item"}>
        <ExpenseDate date={date} />
        <div className="expense-item__description">
          <h2> {contentTitle} </h2>
          <div className="expense-item__price">${amount}</div>
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
