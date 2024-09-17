import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Expense from "./components/expense/Expense";
import Group from "./components/group/Group";
import Footer from "./components/layout/Footer";
import { DataProvider } from "./components/context/SiteContext";
import Header from "./components/layout/Header";
import Modal from "./components/ui/Modal";
import CreateExpense from "./components/expense/CreateExpense";
import ReceiptUpload from "./components/upload/ReceiptUpload";
import FriendsList from "./friends/FriendsList";

function App() {
  return (
    <Router>
      <DataProvider>
        <div className="flex h-[100vh] flex-col">
          <Header />
          <div className="flex h-full flex-col overflow-y-auto">
            <Modal />
            <section className="px-4 py-6 font-semibold">
              <Routes>
                <Route path="/home" />
                <Route path="/groups" element={<Group />} />
                <Route path="/friends" element={<FriendsList />} />
                <Route path="/expenses" element={<Expense />} />
                <Route path="/receipts" element={<ReceiptUpload />} />
                {/* <Expense /> */}
                {/* <CreateExpense /> */}
                {/* <CreateParticipant /> */}
              </Routes>
            </section>
            <Footer />
          </div>
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;
