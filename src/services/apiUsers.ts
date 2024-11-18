import { API_URL } from "../utils/constants";

const API_URL_USERS = `${API_URL}/users`

export async function getUserData() {
  const res = await fetch(API_URL_USERS);
  const { total } = await res.json();

  if (!res.ok) throw new Error(`Error ${res.status} occured`);

  const resAllUsers = await fetch(`${API_URL_USERS}?page=1&per_page=${total}`);

  if (!resAllUsers.ok) throw new Error(`Error ${res.status} occured`);

  const data = await resAllUsers.json();
  return data;
}

export async function createUser(user: any) {
  const res = await fetch(API_URL_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error(`Error ${res.status} occured in creating the user`);

  const data = await res.json();
  return data;
}

export async function updateUser(user: any) {
  const res = await fetch(`${API_URL_USERS}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  
  if (!res.ok) throw new Error(`Error ${res.status} occured in updating the user`);

  const data = await res.json();
  return data;
}

export async function deleteUser(id: any) {
  const res = await fetch(`${API_URL_USERS}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(`Error ${res.status} occured in deleting the user`);

  return res;
}
