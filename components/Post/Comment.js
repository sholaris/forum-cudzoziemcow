import { Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebaseApp from "../../firebase/_Init";
import { useEffect } from "react";

const Comment = (props) => {
  let user = firebaseApp.auth().currentUser;

  useEffect(() => {
    document.getElementById(`${props.id}`).innerHTML = props.content;
  });

  function handleComment(e) {
    e.preventDefault();
    if (user) {
      document.querySelector(".comment-form").style.display = "block";
    } else {
      document.querySelector(".login-msg-comment").style.display = "block";
    }
  }

  return (
    <div className="comment-item">
      <div className="comment-container">
        <span className="meta-container">
          <span className="meta">
            komentarz dodany <span className="when">{props.date}</span>
            <span className="who"> przez {props.author}</span>
          </span>
        </span>
        <div className="comment-content" id={props.id}></div>
        <div className="comment-footer">
          <div className="item-button">
            <Button className="comment-answer" onClick={handleComment}>
              <FontAwesomeIcon icon="comment-dots" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
