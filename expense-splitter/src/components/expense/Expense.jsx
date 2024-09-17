import Button from '../ui/Button'
import ExpenseList from './ExpenseList'
import { UseDataContext } from '../context/SiteContext'

export default function Expense(){
    const {handleSetModal, modal} = UseDataContext();

    return(
        !modal.show && ( <div>
            <h1 className="text-center">Expenses</h1>
            <div>
            <ExpenseList />
            </div>
            <div className="absolute over left-1/2 bottom-6 -translate-x-1/2 z-10">
                <Button 
                    onClick={() => handleSetModal('CreateExpense')} 
                    className={'bg-primary'}
                >Create Expense</Button>
            </div>
        </div>
        )
    );
}
