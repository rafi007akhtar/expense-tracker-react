import ExpenseItem from "./ExpenseItem"
import './ExpensesList.css';

export default function ExpensesList(props) {
    const list = props.items.map(item => <ExpenseItem
        key={item.id}
        title={item.title}
        amount={item.amount}
        date={item.date}
    />);

    if (list.length) {
        return <ul className="expenses-list">
            {list}
        </ul>
    }

    return <h2 className="expenses-list__fallback">Found no expenses.</h2>
    
}
