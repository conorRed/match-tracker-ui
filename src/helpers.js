export function teamsCall() {
  return fetch("/api/teams")
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function eventsCall() {
  return fetch("/api/events")
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
}
