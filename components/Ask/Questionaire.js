import { Button, Row, Select } from "react-materialize";
import firebaseApp from "../../firebase/_Init";
import "firebase/firestore";
import useForm from "../shared/useForm";
import validate from "./validate";
import { postCategories } from "../../public/pagedata/manifest";

const Questionaire = () => {
  const initialState = {
    subject: "",
    category: "",
    question: "",
    tags: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    saveQuestionaire,
    validate,
    initialState
  );

  function getValue(id) {
    return document.getElementById(id).value;
  }

  function saveQuestionaire(e) {
    // save post data typed by user to database
    e.preventDefault();
    var subject = getValue("subject");
    var category = getValue("category");
    var question = getValue("question");
    var tags = {};
    var list_of_tags = getValue("tags").split(" ");
    for (var i = 0; i < list_of_tags.length; i++) {
      tags[i] = list_of_tags[i];
    }
    var user = firebaseApp.auth().currentUser;
    let query = firebaseApp
      .firestore()
      .collection("threads")
      .add({
        author: user.email,
        title: subject,
        category: category,
        content: question,
        tags: tags,
        date: new Date(),
        stats: {
          answers: 0,
          comments: 0,
          votes: 0,
        },
      })
      .then(window.location.replace("/"))
      .catch((err) => {
        alert("Error saving document: ", err);
      });
  }

  return (
    <div className="form-container">
      <Row className="heading">
        <h3 className="reg-heading"></h3>
        <ul>
          <li>
            <p>
              Przed zadaniem pytania upewnij się, że Twój problem nie został już
              rozwiązany lub nie zostało zadane podobne pytanie -
              <strong>użyj wyszukiwarki</strong>.
            </p>
          </li>
          <li>
            <p>
              Opisz <strong>bardzo dokładnie</strong> swój problem i wątpliwości
              aby inni dokładnie wiedzieli jak Ci pomóc.
            </p>
          </li>
          <li>
            <p>
              Wybierz odpowiednią <strong>kategorię</strong> - po wybraniu
              każdej z nich zobaczysz opis pomagający dokonać wyboru.
            </p>
          </li>
          <li>
            <p>
              Wpisz <strong>tagi</strong> najlepiej pasujące do twojego problemu
              - pomoże to w znalezieniu twojego pytania.
            </p>
          </li>
        </ul>
      </Row>
      <Row className="form">
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <div className="input-field col s6">
              <label htmlFor="subject">
                Temat - czego konkretnie dotyczy pytanie.
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className={`${errors.subject && "input-error"}`}
                onChange={handleChange}
                value={values.subject}
              ></input>
              {errors.subject && <p className="error-msg">{errors.subject}</p>}
            </div>
          </Row>
          <Row>
            <div className="input-field col s12">
              <label className="select-label">Kategoria:</label>
              <Select
                id="category"
                name="category"
                className={`${errors.category && "input-error"}`}
                onChange={handleChange}
                value={values.category}
              >
                <option value="" disabled></option>
                {postCategories.categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </Select>
              {errors.category && (
                <p className="error-msg">{errors.category}</p>
              )}
            </div>
          </Row>
          <Row>
            <div className="input-field col s6">
              <label htmlFor="question">Treść pytania:</label>
              <textarea
                id="question"
                name="question"
                className={`${
                  errors.question && "input-error"
                } materialize-textarea`}
                onChange={handleChange}
                value={values.question}
              ></textarea>
              {errors.question && (
                <p className="error-msg">{errors.question}</p>
              )}
            </div>
          </Row>
          <Row>
            <div className="input-field col s6">
              <label htmlFor="tags">Tagi: </label>
              <input
                id="tags"
                name="tags"
                type="text"
                className={`${errors.tags && "input-error"}`}
                onChange={handleChange}
                value={values.tags}
              />
            </div>
            {errors.tags && <p className="error-msg">{errors.tags}</p>}
          </Row>
          <Row>
            <Button type="submit">Zadaj pytanie</Button>
          </Row>
        </form>
      </Row>
    </div>
  );
};

export default Questionaire;
