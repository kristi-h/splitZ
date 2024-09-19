import { Link } from "react-router-dom";
import IconButton from "../ui/IconButton";

export default function Header() {
  return (
    <div className="flex h-[200px] flex-col bg-primary/70 pb-3 pt-[62px] text-white">
      <div className="text-center text-[40px] font-extrabold uppercase">
        Let's Split It
      </div>
      <nav className="m-auto w-full max-w-4xl px-4">
        <div className="flex justify-between gap-2">
          <Link to="/home">
            <IconButton icon={"house"}>Home</IconButton>
          </Link>
          <Link to="/groups">
            <IconButton icon={"people-group"}>Groups</IconButton>
          </Link>
          <Link to="/friends">
            <IconButton icon={"address-book"}>Friends</IconButton>
          </Link>
          <Link to="/expenses">
            <IconButton icon={"credit-card"}>Expenses</IconButton>
          </Link>
        </div>
      </nav>
    </div>
  );
}
