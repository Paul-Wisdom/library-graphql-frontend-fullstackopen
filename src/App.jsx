import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { LoginForm } from "./components/Login";
import Notification from "./components/Notification";
import { CURRENT_USER } from "./queries";
import { RecommendationView } from "./components/RecommendationView";
import { useQuery } from "@apollo/client/react";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [msg, setMsg] = useState(null)

  const user = useQuery(CURRENT_USER)

  const handleLogout = () => {
    setToken(null)
    window.localStorage.removeItem('library-token')
  }

  const updateNotification = (message) => {
    setMsg(message)
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ?
          (<>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommendations</button>
            <button onClick={handleLogout}>logout</button>
          </>) :
          (<button onClick={() => setPage("login")}>login</button>)}
      </div>

      <Notification msg={msg}/>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      {user.data && <RecommendationView show={page === 'recommend'} user={user.data.me}/>}

      <LoginForm show={page === "login"} setToken={setToken} updateNotification={updateNotification} setPage={setPage}/>
    </div>
  );
};

export default App;
