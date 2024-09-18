import Button from '../ui/Button'
import ExpenseList from './ExpenseList'
import { UseDataContext } from '../context/SiteContext'

export default function Expense(){
    const {handleSetModal, modal} = UseDataContext();

    return(
        !modal.show && ( 
        <>
            <h1 className="text-center">Expenses</h1>
            <div>
            <ExpenseList />
            </div>
            <Button 
                className="over absolute bottom-6 left-1/2 z-10 h-14 w-[200px] -translate-x-1/2 rounded-md bg-primary"
                onClick={() => handleSetModal('CreateExpense')} 
            >Create Expense</Button>
        </>
        )
    );
}
