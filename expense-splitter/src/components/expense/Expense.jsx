import {useState} from 'react'
import CreateExpense from './CreateExpense'

export default function Expense(){

    const [expense, setExpense] = useState([])
    

    return(
       <CreateExpense expense={expense} setExpense={setExpense}/>
    )
}