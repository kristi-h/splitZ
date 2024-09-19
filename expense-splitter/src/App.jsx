import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Expense from "./components/expense/Expense";
import Group from "./components/group/Group";
import Footer from "./components/layout/Footer";
import { DataProvider } from "./components/context/SiteContext";
import Header from "./components/layout/Header";
import Modal from "./components/ui/Modal";
import CreateExpense from "./components/expense/CreateExpense";
import ReceiptUpload from "./components/upload/ReceiptUpload";
import Friend from "./components/friend/Friend";
import Home from "./components/Home"

function App() {
  return (
    <Router>
      <DataProvider>
        <div className="flex h-[100vh] flex-col">
          <Header />
          <div className='flex flex-col h-full overflow-y-auto'>
              <Modal />
              <section className="font-semibold px-4 py-6 max-w-4xl mx-auto w-full">
              {/* <section className="font-semibold m-auto w-full px-4 max-w-4xl py-6"> */}
                <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/groups" element={<Group />} />
                  <Route path="/friends" element={<Friend />} />
                  <Route path="/expenses" element={<Expense />} />
                  <Route path="/receipts" element={<ReceiptUpload />} />
                </Routes>
              </section>
              <Footer/>
           </div>
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;
