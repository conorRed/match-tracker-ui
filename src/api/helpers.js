import jwt_decode from "jwt-decode";
export async function getGames(token) {
  return await fetch("/api/games", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getGame(token, id) {
  return await fetch(`/api/games/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
export function createGame(token, jsonObj) {
  return fetch("/api/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonObj),
  });
}

export function createEventForGame(jsonObj) {
  return fetch("/api/events", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonObj),
  });
}

export async function getTeams() {
  return await fetch(`/api/teams`, { method: "GET" });
}

export async function getTeam(id) {
  return await fetch(`/api/teams/${id}`, { method: "GET" });
}

export async function getEvents() {
  return await fetch("/api/event_options", { method: "GET" });
}

export async function getPlayers(team_id) {
  return await fetch(`/api/teams/${team_id}/players`, { method: "GET" });
}

export async function updatePlayer(player_id, jsonObj) {
  return fetch(`/api/players/${player_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonObj),
  });
}

export async function getOutcomesForEvent(event_id) {
  return await fetch(`/api/events/${event_id}/outcomes`, { method: "GET" });
}

export async function getOutcomes() {
  return await fetch("/api/outcomes", { method: "GET" });
}

export function login(jsonObj) {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonObj),
  });
}

export function handleError(messageFunc, errorStatus, message) {
  messageFunc(message);
}

export function isTokenExpired(token) {
  let currentDate = new Date();
  let decodedToken = jwt_decode(token);
  console.log("token", decodedToken);
  console.log("current", currentDate.getTime());

  return !(decodedToken.exp * 1000 > currentDate.getTime());
}

export function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
