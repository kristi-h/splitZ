import { NavLink } from "react-router-dom";
import Icon from "../ui/IconButton";

export default function Header() {
  return (
    <div className="flex h-[180px] flex-col bg-primary pb-1 pt-[40px] text-white">
      <div className="text-center text-[40px] font-extrabold uppercase">
        Let&rsquo;s Split It
      </div>
      <nav className="m-auto w-full max-w-4xl px-4">
        <div className="flex justify-between gap-2">
          <NavLink to="/home">
            <Icon icon={"house"}>Home</Icon>
          </NavLink>
          <NavLink to="/groups">
            <Icon icon={"user-group"}>Groups</Icon>
          </NavLink>
          <NavLink to="/friends">
            <Icon icon={"address-book"}>Friends</Icon>
          </NavLink>
          <NavLink to="/expenses">
            <Icon icon={"credit-card"}>Expenses</Icon>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
