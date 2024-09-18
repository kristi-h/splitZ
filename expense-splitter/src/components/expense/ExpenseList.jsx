import { UseDataContext } from '../context/SiteContext'
import Button from '../ui/Button'

export default function ExpenseList(){
    const { groupData, setGroupData, expense } = UseDataContext()
    console.log('expense', expense)
    
    const expenseItems = expense.map(item => (
        <div key={item.id} className='flex flex-col bg-slate-100 rounded-lg py-4 px-4 mb-1'>
            <div className="flex justify-between items-center">
                <div>{item.name}</div>
                <div>{item.amount}</div>
                <div className="flex gap-2">
                <Button
                    variant={'small'}
                    className="font-normal"
                    >
                    Edit
                    </Button>
                    <Button
                    variant={'small'}
                    className="font-normal"
                    >
                    Delete
                </Button>
                </div>
            </div>
        </div>
    ))
//    console.log('expense'. expense)
    
    return(
        <div className="flex flex-col-reverse mb-4">
            {expenseItems}
        </div>
    )
}