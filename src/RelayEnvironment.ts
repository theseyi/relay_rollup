import RelayRuntime, { RequestParameters, Variables } from "relay-runtime";
const { Environment, Network, RecordSource, Store } = RelayRuntime;

function fetchQuery(request: RequestParameters, variables: Variables) {
  return fetch("https://harhgzroha.execute-api.us-west-2.amazonaws.com/dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  }).then((response) => response.json());
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
