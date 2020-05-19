import { Button, Row } from "react-materialize";
import firebaseApp from "../../firebase/_Init";
import "firebase/auth";
import useForm from "../shared/useForm";
import validate from "./validate";

const LoginForm = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    loginUser,
    validate,
    initialState
  );

  function loginUser(e) {
    // login user by email nad password
    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // alert(`Logged-in user ${user.user.email}`);
        window.location.replace("/");
      })
      .catch((err) => {
        alert("Error occurs: ", err);
      });
  }

  return (
    <div className="form-container">
      <Row>
        <form
          id="login-form"
          className="col s12"
          onSubmit={handleSubmit}
          noValidate
        >
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
              <label for="password">Hasło</label>
              <a className="remainder">Przypomnij hasło</a>
            </div>
          </Row>
          <Row>
            <Button type="submit">Zaloguj się</Button>
          </Row>
        </form>
      </Row>
    </div>
  );
};

export default LoginForm;
