import Expense from './components/expense/Expense'
import Group from './components/group/Group'
import Footer from './components/layout/Footer'
import { DataProvider } from './components/context/SiteContext'
import Header from './components/layout/Header'

function App() {
  return (
    <DataProvider>
      <div className='flex flex-col h-[100vh]'>
        <Header />
        <div className="font-semibold p-4">
          <Group />
          <Expense />
        </div>
        <Footer/>
      </div>
    </DataProvider>
  )
}

export default App
