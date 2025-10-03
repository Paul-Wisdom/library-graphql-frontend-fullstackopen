import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { InMemoryCache, ApolloClient, ApolloLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities"
import { SetContextLink } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const authLink = new SetContextLink((_, {headers}) => {
  const token = window.localStorage.getItem('library-token')
  return{
    headers:{
      ...headers,
      authorization: token? `Bearer ${token}` : null
    }
  }
})
const httpLink = new HttpLink({uri: 'http://localhost:4000'})
const wsLink = new GraphQLWsLink(createClient({url: 'ws://localhost:4000'}))
const splitLink = ApolloLink.split(({query}) => {
  const definition = getMainDefinition(query)
  return(
    definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  )
}, wsLink, authLink.concat(httpLink))
const client = new ApolloClient({
  link: splitLink ,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>

);
