import firebaseApp from "../../firebase/_Init";
import Votes from "./Votes";
import { Button, Row } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CKEditor from "ckeditor4-react";
import AnswerComment from "./AnswerComment";
import { useState, useEffect } from "react";
import Link from "next/link";

const Answer = (props) => {
  const [editorContent, setEditorContent] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // getting username of current login user
    document.getElementById(`${props.ans_id}`).innerHTML = props.content;
    let usersRef = firebaseApp.firestore().collection("users");
    firebaseApp.auth().onAuthStateChanged((cred) => {
      if (cred) {
        let query = usersRef.get().then((docs) => {
          docs.forEach((doc) => {
            if (doc.data().email == cred.email) setUser(doc.id);
          });
        });
      }
    });
  }, []);

  function onEditorChange(e) {
    // getting text typed in text editor
    setEditorContent(e.editor.getData());
  }

  function handleAnswerComments(e) {
    // showing text editor for comment if user is logged in
    e.preventDefault();
    if (user) {
      document.getElementById(`comment-form-${props.ans_id}`).style.display =
        "block";
    } else {
      document.querySelector(`#login-msg-${props.ans_id}`).style.display =
        "block";
    }
  }

  function hideAnswerCommentForm(e) {
    // hiding text editor for comment
    e.preventDefault();
    const form = document.getElementById(`comment-form-${props.ans_id}`);
    form.style.display = "none";
  }

  function handleAnswerCommentSubmit(e) {
    if (editorContent != "") {
      const commentsRef = firebaseApp
        .firestore()
        .collection(
          `threads/${props.post_id}/answers/${props.ans_id}/comments`
        );
      commentsRef.add({
        author: user,
        date: new Date(),
        content: editorContent,
      });
      location.reload();
    }
  }

  return (
    <div className="answer-item">
      <Votes
        votes={props.votes}
        post_id={props.post_id}
        ans_id={props.ans_id}
      />
      <div className="answer-main">
        <span className="meta-container">
          <span className="meta">
            odpowiedź udzielona <span className="when">{props.date}</span> przez
            <span className="who"> {props.author}</span>
          </span>
        </span>
        <div className="answer-content" id={props.ans_id}></div>
        <div className="answer-buttons">
          <Button className="comment" onClick={handleAnswerComments}>
            <span className="icon-container">
              <FontAwesomeIcon icon="comment-dots" className="post-comment" />
            </span>
            Skomentuj
          </Button>
        </div>
        <div
          className="login-msg-answer-comment"
          id={`login-msg-${props.ans_id}`}
        >
          <Link href="/sign-in">
            <a>Zaloguj się</a>
          </Link>{" "}
          lub{" "}
          <Link href="/register">
            <a>załóż konto</a>
          </Link>{" "}
          aby skomentować
        </div>
        <div className="comments-section">
          {props.comments.map((comment) => (
            <AnswerComment
              author={comment.author}
              date={comment.date}
              content={comment.content}
              id={comment.id}
              ans_id={props.ans_id}
            />
          ))}
        </div>
        <div
          className="answer-comment-form"
          id={`comment-form-${props.ans_id}`}
        >
          <Row>
            <h2>Twój komentarz do tego pytania:</h2>
          </Row>
          <Row>
            <form>
              <CKEditor
                config={{ entities: false }}
                data={editorContent}
                onChange={onEditorChange}
              />
            </form>
          </Row>
          <Row>
            <Button
              type="submit"
              onClick={handleAnswerCommentSubmit}
              className="submit-comment"
            >
              Skomentuj
            </Button>
            <Button className="delete-comment" onClick={hideAnswerCommentForm}>
              Anuluj
            </Button>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Answer;
