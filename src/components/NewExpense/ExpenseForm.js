import { useState } from "react";
import "./ExpenseForm.css";

export default function ExpenseForm(props) {
    const [expenseFormControls, setExpenseFormControls] = useState({
        enteredTitle: '',
        enteredAmount: '',
        enteredDate: ''
    });
    const [showForm, setShowForm] = useState(false)

    function updateFormControl(event, control) {
        let updatedControl = {};
        const updateValue = event.target.value;
        switch (control) {
            case 'title':
                updatedControl = { enteredTitle: updateValue };
                break;
            case 'amount':
                updatedControl = { enteredAmount: updateValue };
                break;
            case 'date':
                updatedControl = { enteredDate: updateValue };
                break;
            default:
                return;  // don't update form for an unknown control
        }

        // NOTE: unsafe practice: you may not have the latest state when using the prev state values
        // setExpenseFormControls({
        //     ...expenseFormControls,
        //     ...updatedControl
        // });

        // better practice; makes sure you are getting the latest state:
        setExpenseFormControls((prevState) => {
            return { ...prevState, ...updatedControl };
        });
        console.log('form:', expenseFormControls);
    }

    function submitHandler(event) {
        event.preventDefault();

        const expenseData = {
            title: expenseFormControls.enteredTitle,
            amount: +expenseFormControls.enteredAmount,
            date: new Date(expenseFormControls.enteredDate)
        }
        props.onSaveExpenseData(expenseData);  // this is how you communicate from child to parent

        setExpenseFormControls({
            enteredTitle: '',
            enteredAmount: '',
            enteredDate: ''
        });

        setShowForm(false);
    }

    const newExpenseForm = (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input
                        type="text"
                        value={expenseFormControls.enteredTitle}
                        onChange={(e) => updateFormControl(e, 'title')}
                    />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={expenseFormControls.enteredAmount}
                        min="0.01" step="0.01"
                        onChange={(e) => updateFormControl(e, 'amount')}
                    />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input
                        type="date"
                        value={expenseFormControls.enteredDate}
                        min="2019-01-01" max="2023-12-31"
                        onChange={(e) => updateFormControl(e, 'date')}
                    />
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
    const newExpenseButton = <button onClick={() => setShowForm(true)}>Add New Expense</button>;

    return (
        <>
            {!showForm && newExpenseButton}
            {showForm && newExpenseForm}
        </>
    )
}
