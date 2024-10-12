import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Expense from "./components/expense/Expense";
import ExpenseDetail from "./components/expense/ExpenseDetail";
import Group from "./components/group/Group";
import GroupDetail from "./components/group/GroupDetail";
import Footer from "./components/layout/Footer";
import { DataProvider } from "./components/context/SiteContext";
import Header from "./components/layout/Header";
import Modal from "./components/ui/Modal";
import ReceiptUpload from "./components/upload/ReceiptUpload";
import Friend from "./components/friend/Friend";
import Home from "./components/Home";
import About from "./components/layout/About";
import Login from "./components/Login";
import NotFound from "./components/layout/NotFound";

function App() {
  return (
    <Router>
      <DataProvider>
        <>
          <Header />
          <div className="flex flex-col">
            <Modal />
            <section className="mx-auto mb-[80px] w-full max-w-4xl px-4 py-6 font-semibold">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/groups">
                  <Route index element={<Group />} />
                  <Route path=":groupId" element={<GroupDetail />} />
                </Route>
                <Route path="/friends" element={<Friend />} />
                <Route path="/expenses">
                  <Route index element={<Expense />} />
                  <Route path=":expenseId" element={<ExpenseDetail />} />
                </Route>
                <Route path="/receipts" element={<ReceiptUpload />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </section>
            <Footer />
          </div>
        </>
      </DataProvider>
    </Router>
  );
}

export default App;
