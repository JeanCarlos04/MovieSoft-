import { keys } from "../data/keys.js";

const apikey = keys.SUPABASE_KEY;
const authorization = `Bearer ${keys.SUPABASE_KEY}`;
const headers = {
  apikey,
  authorization,
  "Content-Type": "application/json",
};

/* Movie */
export async function getMovie() {
  const params = {
    method: "GET",
    headers,
  };

  const response = await fetch(`${keys.SUPABASE_URL_MOVIES}?select=*`, params);
  const data = await response.json();
  return data;
}

export async function postMovie(body) {
  const params = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  await fetch(`${keys.SUPABASE_URL_MOVIES}`, params);
}

export async function patchMovie(id, body) {
  const params = {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  };

  await fetch(`${keys.SUPABASE_URL_MOVIES}?id=eq.${id}`, params);
}

export async function deleteMovie(id) {
  const params = {
    method: "DELETE",
    headers,
  };

  await fetch(`${keys.SUPABASE_URL_MOVIES}?id=eq.${id}`, params);
}

export async function searchMovie(title) {
  const params = {
    method: "GET",
    headers,
  };

  const response = await fetch(
    `${keys.SUPABASE_URL_MOVIES}?title=ilike.*${title}*&select=*`,
    params
  );
  const data = await response.json();
  return data;
}

/* User */
export async function getUser() {
  const params = {
    method: "GET",
    headers,
  };

  const response = await fetch(
    `${keys.SUPABASE_URL_USERS}?select=id,username`,
    params
  );
  const data = await response.json();
  return data;
}

export async function postUser(body) {
  const params = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  await fetch(`${keys.SUPABASE_URL_USERS}`, params);
}

export async function validUser(username, password) {
  const params = {
    method: "GET",
    headers,
  };

  const response = await fetch(
    `${keys.SUPABASE_URL_USERS}?username=eq.${username}&select=username,password`,
    params
  );
  const data = await response.json();
  if (data.length > 0) {
    return data[0].username === username && data[0].password === password;
  }
}

/* Video */
export function getVideo(url) {
  const idTrailer = url.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (idTrailer) {
    return `https://www.youtube.com/embed/${idTrailer[1]}`;
  } else {
    return "Error";
  }
}
