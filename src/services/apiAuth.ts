import { API_URL } from "../utils/constants";

export async function logIn(creds: any) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });

  if (!res.ok) throw new Error(`Error ${res.status} occured`);

  const data = await res.json();

  if (creds.rememberMe) {
    localStorage.setItem("loginInfo", JSON.stringify({ ...data, ...creds }));
  }

  return data;
}

export async function logOut() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
  });

  if (!res.ok) throw new Error(`Error ${res.status} occured`);

  const data = await res.json();

  localStorage.removeItem("loginInfo");

  return data;
}
