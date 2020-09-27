export function teamsCall() {
  return fetch("http://localhost:8080/teams")
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function eventsCall() {
  return fetch("http://localhost:8080/events")
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
}
