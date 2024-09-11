
import {useState} from 'react'
import Expense from "./components/expense/Expense"
import Group from './components/Group'


function App() {
  const [expense, setExpense] = useState([])
  
  return (
    <>
  
      <div className="font-semibold p-4">
        <Group expense={expense}/>
        <Expense expense={expense} setExpense={setExpense}/>
      </div>

    </>
  )
}

export default App
