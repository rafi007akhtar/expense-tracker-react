import Card from "../UI/Card";
import './Expenses.css'
import ExpensesFilter from "./ExpenseFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpenseChart from "./ExpenseChart";

function Expenses(props) {
    const [selectedYear, setSelectedYear] = useState(2020);

    // create a dynamic list of expenses
    const expenses = props.expenses;

    // get the selected year from ExpensesFilter
    function selectedYearHandler(year) {
        setSelectedYear(year);
    }

    const filteredItems = expenses.filter(item => {
        return item.date.getFullYear().toString() === selectedYear.toString()
    });

    return <>
        <Card className="expenses">
            <ExpensesFilter defaultYear={selectedYear} onDropdownChange={(year) => selectedYearHandler(year)} />
            <ExpenseChart expenses={filteredItems} />
            <ExpensesList items={filteredItems} />
        </Card>
    </>
}

export default Expenses;
