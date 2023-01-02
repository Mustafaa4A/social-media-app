const URL = 'http://localhost:3300';

export const register = async (user) => {
  try {
    const response = await fetch(`${URL}/auth/register`, {
    method: 'POST',
    body: user
    });
  return response;
  } catch (error) {
    console.error(error);
  }
}

export const login = async ({username, password}) => {
  try {
    const response = await fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers:{"content-Type":"application/json"},
    body: JSON.stringify({username, password})
  });
  return response;
  } catch (error) {
    console.error(error)
  }
}