import { Fragment } from "react"
import { useSelector } from "react-redux";
import FriendRequest from "../components/FriendRequest";
import Sidebar from "../components/Sidebar"
import { selectRecievedRequests } from "../store/auth/authSelector";

const Friends = () => {
  const recievedRequests = useSelector(selectRecievedRequests);

  return (
    <div className="flex">
      <div className="hidden md:block mt-5 h-[80vh] w-[200px] bg-white rounded-lg shadow-md">
        <Sidebar />
      </div>
      <div className="w-[90%]  min-h-[100vh] md:w-[600px] m-auto">
        <div className="my-3">
          <h1 className="text-2xl font-bold">Friend Requests</h1>
          {
            recievedRequests.map((user) => {
              return <FriendRequest key={user._id} user={user} />
            })
          }
        </div>
      </div>
      <div className="hidden md:block">
        
      </div>
    </div>
  )
}

export default Friends