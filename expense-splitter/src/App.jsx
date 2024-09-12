import Expense from './components/expense/Expense'
import Group from './components/group/Group'
import { DataProvider } from './components/context/SiteContext'

function App() {
  return (
    <DataProvider>
      <div className="font-semibold p-4">
        <Group />
        <Expense />
      </div>
    </DataProvider>
  )
}

export default App
