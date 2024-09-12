import React, { useState } from 'react'
import CreateExpense from './CreateExpense'
import Button from '../ui/Button'


export default function Expense({expense, setExpense}){
   
    const [expenseForm, setExpenseForm] = useState(false)

    const DisplayExpenseForm = () => {
      setExpenseForm(!expenseForm)
    }

    return(
        <div>
            <span>
            <Button variant={'small'} onClick={DisplayExpenseForm}>
                Create Expense +
            </Button>
            </span>
            {expenseForm ? (
                 <CreateExpense expense={expense} setExpense={setExpense}/>
            ) : (
                ''
            )}
           
        </div>

    )
}