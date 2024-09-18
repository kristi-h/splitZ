import Button from "../ui/Button";
import GroupList from "./GroupList";
import { UseDataContext } from "../context/SiteContext";

export default function Group() {
  const { handleSetModal, modal } = UseDataContext();
  console.log(modal);

  return (
    // if modal is not showing then display the following
    !modal.show && (
      <div>
        <h1 className="text-center">Groups</h1>
        <div>
          <GroupList />
          <ReceiptUpload />
        </div>
        <div className="over absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
          <Button
            // onClick={handleCreateGroupForm}
            onClick={() => handleSetModal("CreateGroup")}
            className={"h-14 w-[200px] rounded-[10px] bg-primary text-[18px]"}
          >
            Create Group
          </Button>
        </div>
      </div>
    )
  );
}
