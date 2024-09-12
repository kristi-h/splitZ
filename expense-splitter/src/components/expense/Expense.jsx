import CreateExpense from './CreateExpense'


export default function Expense({expense, setExpense}){


    

    return(
        <div>
            <CreateExpense expense={expense} setExpense={setExpense}/>
        </div>

    )
}