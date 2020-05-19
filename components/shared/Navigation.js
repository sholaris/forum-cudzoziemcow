import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import firebaseApp from "../../firebase/_Init";

const Navigation = () => {
  const [user, setUser] = useState(null);

  function setupUI(cred) {
    const loggedOutLinks = document.querySelector(".logged-out");
    const loggedInLinks = document.querySelector(".logged-in");
    const username = document.querySelector(".username");
    if (cred) {
      username.style.display = "inline";
      loggedInLinks.style.display = "block";
      loggedOutLinks.style.display = "none";
    } else {
      username.style.display = "none";
      loggedInLinks.style.display = "none";
      loggedOutLinks.style.display = "block";
    }
  }

  function signoutUser() {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        window.location.replace("/");
      })
      .catch((err) => {
        alert("Error occurs: ", err);
      });
  }

  useEffect(() => {
    let usersRef = firebaseApp.firestore().collection("users");
    firebaseApp.auth().onAuthStateChanged((cred) => {
      if (cred) {
        let query = usersRef.get().then((docs) => {
          docs.forEach((doc) => {
            if (doc.data().email == cred.email) setUser(doc.id);
          });
        });
        setupUI(cred);
      } else {
        setupUI();
      }
    });
  }, []);

  return (
    <nav>
      <div className="nav-wrapper indigo darken-1">
        <a href="/" className="brand-logo">
          Forum Cudzoziemców
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="/">
              <FontAwesomeIcon icon={["far", "list-alt"]} />
            </a>
          </li>
          <li>
            <a href="/categories">
              <FontAwesomeIcon icon={["fas", "project-diagram"]} />
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={["fas", "tags"]} />
            </a>
          </li>
          <li>
            <a href="/ask">
              <FontAwesomeIcon icon={["fas", "comment-dots"]} />
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={["fas", "database"]} />
            </a>
          </li>
        </ul>
        <div className="search-bar">
          <form>
            <input name="search" type="text" placeholder="Szukaj..."></input>
            <button className="btn-search" type="submit">
              <FontAwesomeIcon icon={["fas", "search"]} />
            </button>
          </form>
          <div className="logged-out" style={{ display: "none" }}>
            <span>
              Masz już konto? <a href="/sign-in">Zaloguj się</a>
            </span>

            <a href="/register" className="btn">
              Zarejestruj się
            </a>
          </div>
          <div className="logged-in" style={{ display: "none" }}>
            <span className="username" style={{ display: "none" }}>
              Zalogowano jako{" "}
              <strong>
                <a href="#">{user}</a>
              </strong>
            </span>
            <a onClick={signoutUser} className="btn">
              Wyloguj
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
