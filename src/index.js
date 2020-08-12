import React from "react";
import ReactDOM from "react-dom";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";

import App from "./App";

const authLink = setContext(async (req, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjY3MDAyMmU5NWI1NDAwMWMwZjA3YzIiLCJpYXQiOjE1MzUzNzM1NDV9.yfBHbQq4cclWGX8DD34E-HOHPo9n7Wo-yrai4i4zJAk`
    }
  };
});

const httpLink = createUploadLink({
  uri: "https://sumaryz-211606.appspot.com/graphql"
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
