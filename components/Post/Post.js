import { Button, Row } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Votes from "../shared/Votes";
import Comment from "./Comment";
import CKEditor from "ckeditor4-react";
import firebaseApp from "../../firebase/_Init";
import { useEffect, useState } from "react";
import Link from "next/link";

const Post = (props) => {
  const [editorContent, setEditorContent] = useState("");
  const [user, setUser] = useState(null);
  const threadRef = firebaseApp.firestore().collection("threads").doc(props.id);

  useEffect(() => {
    // getting username of current login user
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

  function hideAnswerForm(e) {
    // hiding text editor for answer
    e.preventDefault();
    const form = document.querySelector(".answer-form");
    form.style.display = "none";
  }

  function hideCommentForm(e) {
    // hiding text editor for comment
    e.preventDefault();
    const form = document.querySelector(".comment-form");
    form.style.display = "none";
  }

  function handleComments(e) {
    // showing text editor for comment if user is logged in
    e.preventDefault();
    if (user) {
      document.querySelector(".comment-form").style.display = "block";
    } else {
      document.querySelector(".login-msg-comment").style.display = "block";
    }
  }

  function handleAnswer(e) {
    // showing text editor for answer if user is logged in
    e.preventDefault();
    if (user) {
      document.querySelector(".answer-form").style.display = "block";
    } else {
      document.querySelector(".login-msg-answer").style.display = "block";
    }
  }

  function onEditorChange(e) {
    // getting text typed in text editor
    setEditorContent(e.editor.getData());
  }

  function handleAnswerSubmit(e) {
    // submit answer to answers collection and update answer counter for post
    if (editorContent != "") {
      const answersRef = firebaseApp
        .firestore()
        .collection("threads")
        .doc(props.id)
        .collection("answers");
      answersRef.add({
        author: user,
        date: new Date(),
        content: editorContent,
        votes: 0,
      });
      threadRef.update({ "stats.answers": props.stats.answers + 1 });
      location.reload();
    }
  }

  function handleCommentSubmit(e) {
    // submit comment to comments collection and update comment counter for post
    if (editorContent != "") {
      const answersRef = firebaseApp
        .firestore()
        .collection("threads")
        .doc(props.id)
        .collection("comments");
      answersRef.add({
        author: user,
        date: new Date(),
        content: editorContent,
      });
      threadRef.update({ "stats.comments": props.stats.comments + 1 });
      location.reload();
    }
  }

  return (
    <>
      <div className="content">
        <Votes votes={props.stats.votes} post_id={props.id} />
        <div className="main-post">
          <form>
            <span className="meta-container">
              <span className="meta">
                pytanie zadane <span className="when">{props.date}</span> w{" "}
                <span className="where">{props.category} </span>przez{" "}
                <span className="who">{props.author}</span>
              </span>
            </span>
            <div className="inner-content">
              <div className="entry-content">{props.content}</div>
            </div>
            <div className="tags">
              <ul className="tag-list">
                {props.tags.map((tag) => (
                  <li key={tag} className="tag-item">
                    <span className="new badge" data-badge-caption={tag}></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="react-buttons">
              <Button className="answer" onClick={handleAnswer}>
                <span className="icon-container">
                  <FontAwesomeIcon icon="comment-alt" />
                </span>
                Odpowiedz
              </Button>
              <Button className="comment" onClick={handleComments}>
                <span className="icon-container">
                  <FontAwesomeIcon
                    icon="comment-dots"
                    className="post-comment"
                  />
                </span>
                Skomentuj
              </Button>
            </div>
            <div className="login-msg-comment">
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
              {props.comments.data.map((comment) => (
                <Comment
                  author={comment.author}
                  date={comment.date}
                  content={comment.content}
                  id={comment.id}
                />
              ))}
            </div>
            <div className="comment-form">
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
                  onClick={handleCommentSubmit}
                  className="submit-comment"
                >
                  Skomentuj
                </Button>
                <Button className="delete-comment" onClick={hideCommentForm}>
                  Anuluj
                </Button>
              </Row>
            </div>
          </form>
        </div>
      </div>
      <div className="login-msg-answer">
        <Link href="/sign-in">
          <a>Zaloguj się</a>
        </Link>{" "}
        lub{" "}
        <Link href="/register">
          <a>załóż konto</a>
        </Link>{" "}
        aby odpowiedzieć na to pytanie
      </div>
      <div className="answer-form">
        <Row>
          <h2>Twoja odpowiedź</h2>
        </Row>
        <Row>
          <form>
            <CKEditor data={editorContent} onChange={onEditorChange} />
          </form>
        </Row>
        <Row>
          <Button
            type="submit"
            onClick={handleAnswerSubmit}
            className="submit-answer"
          >
            Odpowiedz
          </Button>
          <Button className="delete-answer" onClick={hideAnswerForm}>
            Anuluj
          </Button>
        </Row>
      </div>
    </>
  );
};

export default Post;
