// import React, { useState } from "react";
// import PostsList from "./components/PostsList";
// import NewPostForm from "./components/NewPostForm";
// import { FaPlus } from "react-icons/fa";
// import instagram from './assests/instagram.webp'; 


// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editId, setEditId] = useState('');

//   // Function to toggle modal visibility
//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   return (
//     <div className=" bg-gray-50 min-h-screen flex flex-col items-center justify-center p-6">

//       {/* Title */}
//       <div className="flex items-center justify-center space-x-4 mb-5">
//       <img src={instagram} alt="Instagram logo" className="w-[60px] h-[60px] rounded-full " />
//       <h1 className="text-4xl font-semibold text-gray-800 ">Posts</h1>
//      </div>

//       {/* Posts List - Centered */}
//       <div className="flex justify-center w-full">
//         <PostsList setEditId={setEditId} toggleModal={toggleModal}/>
//       </div>

//       {/* Button to trigger modal */}
//       <div
//         onClick={toggleModal}
//         className="w-[76px] h-[76px] bg-[#4566EC] rounded-full self-center flex items-center justify-center mt-[38px] cursor-pointer"
//       >
//         <FaPlus className="w-[32.57px] h-[32.57px] text-white" />
//       </div>

//       {/* Modal for creating new post */}
//       {isModalOpen && (
//         <NewPostForm
//           editId={editId}
//           setEditId={setEditId}
//           toggleModal={toggleModal}
//         />
//       )}
//     </div>
//   );
// }

// export default App;




import React, { useState } from "react";
import PostsList from "./components/PostsList";
import NewPostForm from "./components/NewPostForm";
import { FaPlus } from "react-icons/fa";
import instagram from './assests/instagram.webp'; 

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState('');

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 min-h-screen flex flex-col items-center justify-start p-8">

      {/* Title */}
      <div className="flex items-center justify-center space-x-4 mb-2">
        <img
          src={instagram}
          alt="Instagram logo"
          className="w-[70px] h-[70px] rounded-full border-4 border-white shadow-xl"
        />
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Posts
        </h1>
      </div>

      {/* Posts List - Centered */}
      <div className="flex justify-center w-full mb-8">
        <PostsList setEditId={setEditId} toggleModal={toggleModal} />
      </div>

      {/* Button to trigger modal */}
      <div
        onClick={toggleModal}
        className="w-[80px] h-[80px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mt-6 cursor-pointer transform hover:scale-105 transition-transform duration-300 shadow-2xl"
      >
        <FaPlus className="w-[36px] h-[36px] text-white" />
      </div>

      {/* Modal for creating new post */}
      {isModalOpen && (
        <NewPostForm
          editId={editId}
          setEditId={setEditId}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}

export default App;
