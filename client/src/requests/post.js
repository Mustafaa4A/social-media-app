const URL = 'http://localhost:3300';

export const getPosts = async ({ token }) => {
  console.log(token);
  const response = fetch(`${URL}/posts`, {
    headers: {
      Authorization:`Bearer ${token}`
    }
  });
  return response;
}


export const addPost = async ({ post, token }) => {
  const response = fetch(`${URL}/posts`, {
    method: "POST",
    headers:{Authorization:`Bearer ${token}`},
    body: post
  })
  return response;
}

export const removePost = async ({postId, token}) => {
  const response = await fetch(`${URL}/posts/${postId}`, {
    method: "DELETE",
    headers:{Authorization:`Bearer ${token}`},
  });
  return response;
}


export const likePost = async ({postId, userId, token}) => {
  const response = await fetch(`${URL}/posts/${postId}/like`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
      Authorization:`Bearer ${token}`
    },
    body: JSON.stringify({ userId })
  })
  return response;
}

export const commentPost = async ({postId, userId, comment, token}) => {
  const response = await fetch(`${URL}/posts/${postId}/comment`, {
    method: "PATCH",
    headers: { "content-Type": "application/json", Authorization: `Bearer ${token}` },
    
    body: JSON.stringify({ userId, comment })
  })
  return response;
}

export const getComments = async ({postId, token}) => {
  const response = fetch(`${URL}/posts/${postId}/comments`, {
    headers:{Authorization:`Bearer ${token}`}
  });
  return response;
}