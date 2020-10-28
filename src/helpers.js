export function teamsCall() {
  return fetch("/api/teams")
    .then((res) => res.json())
    .then((result) => {
      return result["data"];
    })
    .catch((err) => {
      console.log(err);
    });
}

export function outcomesCall(event_id) {
  return fetch("/api/events/" + event_id + "/outcomes")
    .then((res) => res.json())
    .then((result) => {
      return result["data"];
    })
    .catch((err) => {
      console.log(err);
    });
}

export function eventsCall() {
  return fetch("/api/events")
    .then((res) => res.json())
    .then((result) => {
      return result["data"];
    })
    .catch((err) => {
      console.log(err);
    });
}
