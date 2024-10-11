import { useEffect, useRef } from "react";
import { UseDataContext } from "../context/SiteContext";
import Button from "../ui/Button";
import Dialog from "../ui/Dialog";

const GetStarted = () => {
  const { friends, handleSetModal } = UseDataContext();

  useEffect(() => {
    if (friends.length < 2) {
      toggleDialog(deleteDialogRef);
    }
  });

  const toggleDialog = (ref) => {
    if (!ref.current) {
      return;
    }
    ref.current.hasAttribute("open")
      ? ref.current.close()
      : ref.current.showModal();
  };

  // Create reference to dom elements
  const deleteDialogRef = useRef(null);
  return (
    <>
      <Dialog isCustom={true} dialogRef={deleteDialogRef}>
        <div className="flex flex-col items-center justify-center">
          <p className="mb-6 text-center">
            Get started by adding a friend to split expenses with.
          </p>
          <Button
            className="w-full sm:w-48"
            onClick={() => handleSetModal("FriendForm")}
          >
            Add Friend
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default GetStarted;
