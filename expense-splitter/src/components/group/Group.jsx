import { useState } from 'react';
import Button from "../ui/Button";
// import SearchBar from "../ui/SearchBar";
// import CreateGroup from "./CreateGroup";
import GroupList from "./GroupList";
import { UseDataContext } from "../context/SiteContext"

export default function Group() {
  const {handleSetModal, modal} = UseDataContext();

  // const [inputText, setInputText] = useState("");
    
    // let inputHandler = (e) => {
    //     var lowerCase = e.target.value.toLowerCase();
    //     setInputText(lowerCase);
    // };

  return (
    // if modal is not showing then display the following
    !modal.show && (
      <div>
        <h1 className="text-center">Groups</h1>
        {/* <SearchBar input={inputText} inputHandler={inputHandler}/> */}
        <div>
          {/* <GroupList input={inputText} /> */}
          <GroupList />
        </div>
        <div className="absolute over left-1/2 bottom-6 -translate-x-1/2 z-10">
          <Button 
            // onClick={handleCreateGroupForm} 
            onClick={() => handleSetModal('CreateGroup')} 
            className={'bg-primary h-14 w-[200px] text-[18px] rounded-[10px]'}
          >Create Group</Button>
        </div>
      </div>
    )
  );
}
