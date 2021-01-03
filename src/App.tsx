import { AppQuery } from "./__generated__/AppQuery.graphql";
import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "./RelayEnvironment";

function App(): JSX.Element {
  return (
    <QueryRenderer<AppQuery>
      environment={environment}
      query={graphql`
        query AppQuery {
          repository(owner: "facebook", name: "relay") {
            name
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return <div>Dataset id: {props.repository?.name}</div>;
      }}
    />
  );
}

export default App;
