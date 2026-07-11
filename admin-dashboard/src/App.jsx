import { useState } from "react";
import DeleteConfirmationModal from "./components/ui/DeleteConfirmationModal";

function App() {
     const [isOpen, setIsOpen] = useState(true);
  return (
    <>
          {isOpen && <DeleteConfirmationModal
          title="Delete User"
          message="Are You sure you want to delete this user?"
          onCancel={() =>setIsOpen(false)}
          onDelete={()=>{
            alert("User Deleted");
            setIsOpen(false);
          }} />}
    </>
    
  );
}

export default App; 