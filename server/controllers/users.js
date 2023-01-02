import User from "../models/User.js";


// * find user
export const findUser = async (id) => {
  const user = await User.findById(id);
  return user || null;
}

//* READ */
export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  console.log("Here id");
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ error: 'Invalid user ID' });

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );
    
    const sendedRequests = await Promise.all(
        user.sendedRequests.map((id) => User.findById(id))
    );
    
    const recievedRequests = await Promise.all(
      user.recievedRequests.map((id) => User.findById(id))
    );
    

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, username, picturePath }) => {
        return { _id, firstName, lastName, username, picturePath };
      }
    );

    const formattedSendedRequests = sendedRequests.map(
      ({ _id, firstName, lastName, username, picturePath }) => {
        return { _id, firstName, lastName, username, picturePath };
      }
  );

  const formattedRecievedRequests = recievedRequests.map(
    ({ _id, firstName, lastName, username, picturePath }) => {
      return { _id, firstName, lastName, username, picturePath };
    }
  );


  res.status(200).json({
    friends: formattedFriends,
    sendedRequests: formattedSendedRequests,
    recievedRequests: formattedRecievedRequests
  });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//* UPDATE */
export const addRemoveFriendRequest = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    
    if (id === friendId) return res.status(403).json({ error: "Invalid request" });

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({ error: "Invalid User ID" })
    
    if (user.sendedRequests.includes(friendId)) {
      friend.recievedRequests = friend.recievedRequests.filter((id) => id !== id);
      user.sendedRequests = user.sendedRequests.filter((id) => id !== id);
    } else {
      friend.recievedRequests.push(id);
      user.sendedRequests.push(friendId);
    }

    await user.save();
    await friend.save();

    const sendedRequests = await Promise.all(
      user.sendedRequests.map((id) => User.findById(id))
    );
    const fromattedSendedRequests = sendedRequests.map(
      ({ _id, firstName, lastName, username, picturePath }) => {
        return { _id, firstName, lastName, username, picturePath };
      }
    );

    res.status(200).json(fromattedSendedRequests);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    console.log(id);
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({ error: "Invalid User ID" })
    
    if (user.friends.includes(friendId)) {
      friend.friends = friend.friends.filter((id) => id !== id);
      user.friends = user.friends.filter((id) => id !== id);
    } else {
      user.recievedRequests = user.recievedRequests.filter((id) => id !== friendId);
      friend.sendedRequests = friend.sendedRequests.filter((id) => id !== id);
      friend.friends.push(id);
      user.friends.push(friendId);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, username, picturePath }) => {
        return { _id, firstName, lastName, username, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const deleteRequest = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    console.log(id);
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    user.recievedRequests = user.recievedRequests.filter((id) => id !== friendId);
    friend.sendedRequests = friend.sendedRequests.filter((id) => id !== id);
    friend.friends.push(id);
    user.friends.push(friendId);
    
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, username, picturePath }) => {
        return { _id, firstName, lastName, username, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};