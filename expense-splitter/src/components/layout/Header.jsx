import { NavLink } from "react-router-dom";
import IconButton from "../ui/IconButton";
import { UseDataContext } from "../context/SiteContext";

export default function Header() {
  const { handleSetModal, modal } = UseDataContext();
  return (
    <div className="text-accentOne bg-gradientDark flex h-[180px] flex-col pb-1 pt-[40px]">
      <div className="text-center text-[40px] font-extrabold uppercase">
        Let&rsquo;s Split It
      </div>
      <nav className="m-auto w-full max-w-4xl px-4">
        <div className="flex justify-between gap-2">
          <NavLink to="/home">
            <IconButton onClick={() => handleSetModal()} icon={"house"} isActive={modal.type === "home" && modal.show }>
              Home
            </IconButton>
          </NavLink>
          <NavLink to="/groups">
            <IconButton onClick={() => handleSetModal()} icon={"user-group"} isActive={modal.type === "groups"}>
              Groups
            </IconButton>
          </NavLink>
          <NavLink to="/friends">
            <IconButton onClick={() => handleSetModal()} icon={"address-book"} isActive={modal.type === "friends"}>
              Friends
            </IconButton>
          </NavLink>
          <NavLink to="/expenses">
            <IconButton onClick={() => handleSetModal()} icon={"credit-card"} isActive={modal.type === "expenses"}>
              Expenses
            </IconButton>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
