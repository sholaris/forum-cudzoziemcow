import { Button, Row } from "react-materialize";
import firebaseApp from "../../firebase/_Init";
import useForm from "../shared/useForm";
import validate from "../shared/validate";
import "firebase/firestore";
import "firebase/auth";

const RegistryForm = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    registerUser,
    validate,
    initialState
  );

  function registerUser(e) {
    // new user registration -> include save to database and create authorized account
    e.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    saveUser(username, email, password);
    authorizeUser(email, password);
  }

  function authorizeUser(email, password) {
    // create new authorized user account
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((obj) => {
        // alert(`Registered user ${obj.user.email}`);
        window.location.replace("/sign-in");
      });
  }

  function saveUser(username, email, password) {
    // add new user to database
    let usersRef = firebaseApp.firestore().collection("users");
    let query = usersRef
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          firebaseApp.firestore().collection("users").doc(username).set({
            email: email,
            password: password,
          });
        } else {
          document.getElementById("error-heading").style.display = "block";
        }
      })
      .catch((err) => {
        alert("Error occurs: ", err);
      });
  }

  return (
    <div className="form-container">
      <Row className="heading">
        <h2 className="reg-heading">Dołącz do społeczności forum!</h2>
        <p>
          Masz pytanie związane z legalizacją swojego pobytu w Polsce? Szukasz
          sprawdzonych informacji dotyczacych nabycia potrzebnego Ci dokumentu?
          A może potrzebujesz porady jak wypełnić konkretny wniosek i do jakiego
          urzedu się z nim udać?
        </p>
        <p>
          Załóż darmowe konto na forum i poznaj ludzi, którzy pomogą ci swoją
          wiedzą i doświadczeniem!
        </p>
      </Row>
      <Row className="error">
        <p id="error-heading" className="error-heading">
          Istnieje już konto z podanym adresem email
        </p>
      </Row>
      <Row>
        <form
          id="register-form"
          className="col s12"
          onSubmit={handleSubmit}
          noValidate
        >
          <Row>
            <div className="input-field col s12">
              <label for="username">Nazwa użytkownika</label>
              <input
                id="username"
                name="username"
                type="text"
                className={`${errors.username && "input-error"}`}
                onChange={handleChange}
                value={values.username}
              ></input>
              {errors.username && (
                <p className="error-msg">{errors.username}</p>
              )}
            </div>
          </Row>
          <Row>
            <div className="input-field col s12">
              <label for="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`${errors.email && "input-error"}`}
                onChange={handleChange}
                value={values.email}
              ></input>
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>
          </Row>
          <Row>
            <div className="input-field col s12">
              <label for="password">Hasło</label>
              <input
                id="password"
                name="password"
                type="password"
                className={`${errors.password && "input-error"}`}
                onChange={handleChange}
                value={values.password}
              ></input>
              {errors.password && (
                <p className="error-msg">{errors.password}</p>
              )}
            </div>
            <p className="agreement">
              <label>
                <input type="checkbox" className="filled-in" />
                <span>
                  Wyrażam zgodę na przetwarzanie danych, akceptują Regulamin
                  oraz Politykę Prywatności.
                </span>
              </label>
            </p>
          </Row>
          <Row>
            <p className="agreement-desc">
              Celem podania danych osobowych jest umożliwienie użytkownikowi
              swobodnego korzystania z własnego indywidualnego konta w serwisie.
              Administratorem danych będzie strona Forum Cudzoziemców,
              kontakt@sprawadlaimigranta.pl. W każdej chwili możesz wycofać
              udzieloną zgodę, uzyskać dostęp do swoich danych, poprawić je lub
              usunąć. Podanie danych jest dobrowolne ale konieczne do posiadania
              ważnego konta w seriwise.
            </p>
          </Row>

          <Row>
            <Button type="submit">Załóż konto</Button>
          </Row>
        </form>
      </Row>
    </div>
  );
};

export default RegistryForm;
