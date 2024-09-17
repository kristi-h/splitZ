import React, { useState } from 'react'
import CreateExpense from './CreateExpense'
import Button from '../ui/Button'
import ExpenseList from './ExpenseList'
import { UseDataContext } from '../context/SiteContext'

export default function Expense(){
    const {handleSetModal, modal} = UseDataContext();
   
    // const [expenseForm, setExpenseForm] = useState(false)

    // const DisplayExpenseForm = () => {
    //   setExpenseForm(!expenseForm)
    // }

    return(
        !modal.show && ( <div>
            <h1 className="text-center">Expenses</h1>
            <div>
            <ExpenseList />
            </div>
            <div className="absolute over left-1/2 bottom-6 -translate-x-1/2 z-10">
            <Button 
                onClick={() => handleSetModal('CreateExpense')} 
                className={'bg-primary h-14 w-[200px] text-[18px] rounded-[10px]'}
            >Create Expense</Button>
            </div>
        </div>
        )
    );
}


// return(
//     <div>
//         <span>
//         <Button variant={'small'} onClick={DisplayExpenseForm}>
//             Create Expense +
//         </Button>
//         </span>
//         {expenseForm ? (
//              <CreateExpense />
//         ) : (
//             ''
//         )}
//         <ExpenseList />
       
//     </div>

// )