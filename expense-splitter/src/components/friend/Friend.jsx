import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseDataContext } from "../context/SiteContext";
import Button from "../ui/Button";
import FriendList from "./FriendList";
import ButtonFooter from "../ui/ButtonFooter";

const Friend = () => {
  const navigate = useNavigate();
  const { user, handleSetModal, modal } = UseDataContext();

  useEffect(() => {
    // if user is not "logged in", go to login
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    !modal.show && (
      <>
        <h1 className="text-center">Friends</h1>
        <FriendList />
        <ButtonFooter>
          <Button
            className="bg-primary"
            onClick={() => {
              handleSetModal("FriendForm");
            }}
          >
            Add Friend
          </Button>
        </ButtonFooter>
      </>
    )
  );
};

export default Friend;
