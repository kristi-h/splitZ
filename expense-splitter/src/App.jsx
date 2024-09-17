import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Expense from './components/expense/Expense'
import Group from './components/group/Group'
import Footer from './components/layout/Footer'
import { DataProvider } from './components/context/SiteContext'
import Header from './components/layout/Header'
import Modal from './components/ui/Modal'

function App() {
  return (
    <Router>
      <DataProvider>
        <Modal />
        <div className='flex flex-col h-[100vh]'>
          <Header />
          <div className='flex flex-col h-full overflow-y-auto'>
              <section className="font-semibold px-4 py-6">
                <Routes>
                  <Route path="/home" />
                  <Route path="/groups" element={<Group />} />
                  <Route path="/friends" />
                  <Route path="/expenses" element={<Expense />} />
                </Routes>
              </section>
            <Footer/>
          </div>
        </div>
      </DataProvider>
    </Router>
  )
}

export default App
