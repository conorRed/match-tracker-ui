export function getTeams() {
  return fetch("/api/teams")
    .then((res) => res.json())
    .then((result) => {
      return result["items"];
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getEvents() {
  return fetch("/api/events")
    .then((res) => res.json())
    .then((result) => {
      return result["items"];
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getPlayers(team_id) {
  return fetch("/api/teams/" + team_id + "/players")
    .then((res) => res.json())
    .then((result) => {
      return result["items"];
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getOutcomesForEvent(event_id) {
  return fetch("/api/events/" + event_id + "/outcomes")
    .then((res) => res.json())
    .then((result) => {
      return result["items"];
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getOutcomes() {
  return fetch("/api/outcomes")
    .then((res) => res.json())
    .then((result) => {
      return result["items"];
    })
    .catch((err) => {
      console.log(err);
    });
}

export function createTeam(jsonObj) {
  return fetch("/api/teams", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonObj),
  });
}

export function createPlayer(jsonObj) {
  return fetch("/api/player", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonObj),
  });
}
