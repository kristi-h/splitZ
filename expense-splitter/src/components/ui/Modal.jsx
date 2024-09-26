import EditGroup from "../group/EditGroup";
import CreateGroup from "../group/CreateGroup";
import { UseDataContext } from "../context/SiteContext";
import CreateExpense from "../expense/CreateExpense";
import EditExpense from "../expense/EditExpense";
import CreateFriend from "../friend/FriendForm";
import ReceiptImage from "./ReceiptImage";
import { useEffect } from "react";

// map component names to actual components
const components = {
  CreateGroup,
  EditGroup,
  CreateExpense,
  EditExpense,
  CreateFriend,
  ReceiptImage,
};

export default function Modal({ id, image_url, image_alt }) {
  const { modal } = UseDataContext();
  const Component = components[modal.type];

  // scroll to top when modal is loaded
  useEffect(() => {
    if (modal.show) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [modal.show]);

  return (
    modal.show && (
      // <div className="absolute top-[200px] h-full flex bg-black/50 w-full z-20">
      <div className="z-20 mx-auto flex h-full w-full max-w-4xl bg-black/50">
        <div className="w-full bg-white p-6">
          {Component ? (
            <Component
              id={modal.id}
              image_url={modal.image_url}
              image_alt={modal.image_alt}
            />
          ) : null}
        </div>
      </div>
    )
  );
}

// popup style modal
// export default function Modal() {
//   return (
//     <div className="absolute flex bg-black/50 h-full w-full z-20">
//       <div className="m-auto w-96  bg-white rounded-lg p-6">
//           {/* <EditGroup /> */}Modal
//       </div>
//     </div>
//   )
// }
