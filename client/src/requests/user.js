const URL = 'http://localhost:3300';

export const getUser = async ({ username, token }) => {
  console.log({username, token});
  const response = await fetch(`${URL}/users/${username}`, {
    headers:{Authorization:`Bearer ${token}`}
  });
  return response;
}

export const requestFriend = async ({userId, friendId, token}) => {
  console.log(userId, friendId);
  const response = await fetch(`${URL}/users/${userId}/${friendId}/friendRequest`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json", Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({name:'users'})
  });
  return response;
}

export const addFriend = async ({userId, friendId, token}) => {
  const response = await fetch(`${URL}/users/${userId}/${friendId}/addFriend`, {
    method: "PATCH",
    headers: { "content-Type": "application/json" },
    body:JSON.stringify({name:'users'})
  });
  return response;
}

export const deleteRequest = async ({userId, friendId, token}) => {
  const response = await fetch(`${URL}/users/${userId}/${friendId}/deleteRequest`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json", Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({name:'users'})
  });
  return response;
}

export const getUserFriends = async ({userId, token}) => {
  const response = await fetch(`${URL}/users/${userId}/friends`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}