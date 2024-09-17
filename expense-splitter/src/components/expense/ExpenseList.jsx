import { UseDataContext } from '../context/SiteContext'

export default function ExpenseList(){
    const { groupData, setGroupData, expense } = UseDataContext()
    console.log('expense', expense)
    
    const expenseItems = expense.map(item => (
        <div key={item.id} className='flex flex-col bg-slate-100 rounded-md py-4 px-2 mb-1 cursor-pointer'>
            <div className="flex justify-between">
                <div>{item.name}</div>
                <div>{item.amount}</div>
                <div className="flex gap-2">
                <button className="bg-slate-500 text-slate-100 px-2 rounded-sm hover:bg-slate-600">
                    edit
                </button>
                <button className="bg-slate-500 text-slate-100 px-2 rounded-sm hover:bg-slate-600">
                    delete
                </button>
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