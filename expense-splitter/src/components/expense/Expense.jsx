import {useState} from 'react'
import CreateExpense from './CreateExpense'
import ExpenseList from './ExpenseList'

export default function Expense({expense, setExpense}){


    

    return(
        <div>
            <CreateExpense expense={expense} setExpense={setExpense}/>
            <ExpenseList expense={expense} setExpense={setExpense}/>
        </div>

    )
}