import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:4000'}),
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>

);
