import React,{useState,useEffect} from 'react';
import axios from 'axios'; 
import Logout from './logout';
import Login from './login';
const Profile=({ user, setUser })=>{
  const [showLoginPopup, setShowLoginPopup] = useState(false); 
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await axios.get('http://localhost:3000/api/auth/profile', {
            withCredentials: true
          });
          setUser(res.data.user);
        } catch (err) {
          setUser(null); // 🔄 Ensure state resets if not logged in
          console.log("Not logged in");
        }
      };
      fetchUser();
    }, []);
    return(<>
    {/* Profile Icon */}
    <div className="relative group">
            <button className="focus:outline-none">
              <img
                src='/img/profile_icon.png'
                alt="Profile"
                className="rounded-full w-10 h-10"
              />
            </button>

            {/* Dropdown - appears on hover */}
            <div className="absolute right-0 hidden bg-white text-gray-700 py-2 mt-2 rounded-lg shadow-lg w-48 group-hover:block">
              {/* <a href="/login" className="block px-4 py-2 hover:bg-gray-200">
                Login
              </a>
              <a href="/Signup" className="block px-4 py-2 hover:bg-gray-200">
                Signup
              </a> */}
              {user ?
<>
           <div className="text-center my-2 text-md font-semibold text-green-700">
           Welcome, {user.name}!
         </div>
         <Logout setUser={setUser} />
       </>
              :
              <>
               <button
             onClick={() => setShowLoginPopup(true)}
             className="block w-full text-left px-4 py-2 hover:bg-gray-200"
           >
             Login
           </button>
              {/* <div className="text-center my-2 text-md font-semibold text-green-700">
                Welcome, {user.name}!
              </div>
              <Logout setUser={setUser} /> */}
            </>
              }
            </div>
          </div>
          {/* 🔐 LOGIN MODAL */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <button
              onClick={() => setShowLoginPopup(false)}
              className="text-gray-500 float-right text-xl font-bold"
            >
              &times;
            </button>
            <Login setUser={setUser} setShowPopup={setShowLoginPopup} />
          </div>
        </div>
      )}
    </>)
}
export default Profile;