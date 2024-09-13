import Expense from "./components/expense/Expense";
import Group from "./components/group/Group";
import Footer from "./components/Footer";
import { DataProvider } from "./components/context/SiteContext";

function App() {
  return (
    <DataProvider>
      <div className="p-4 font-semibold">
        <Group />
        <Expense />
      </div>
      <Footer />
    </DataProvider>
  );
}

export default App;
