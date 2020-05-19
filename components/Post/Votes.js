import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebaseApp from "../../firebase/_Init";
import { useState } from "react";

const Votes = ({ votes, post_id, ans_id }) => {
  const [db_votes, setVotes] = useState(votes);

  function handleSubmit(e) {
    let user = firebaseApp.auth().currentUser;
    if (user) {
      const answerRef = firebaseApp
        .firestore()
        .collection("threads")
        .doc(post_id)
        .collection("answers")
        .doc(ans_id);
      let query = answerRef.get().then((doc) => {
        setVotes(doc.data().votes);
      });
      if (e.target.parentElement.id == "btn-vote-up") {
        let updateVotes = answerRef.update({ votes: db_votes + 1 });
      } else if (e.target.parentElement.id == "btn-vote-down") {
        let updateVotes = answerRef.update({ votes: db_votes - 1 });
      }
      location.reload();
    } else {
      e.preventDefault();
      document.querySelector(".err-msg").classList.add("active");
    }
  }

  return (
    <form>
      <div className="voting">
        <div className="vote-buttons">
          <FontAwesomeIcon
            onClick={handleSubmit}
            className="btn-vote-up"
            id="btn-vote-up"
            icon="caret-up"
          />

          <FontAwesomeIcon
            onClick={handleSubmit}
            className="btn-vote-down"
            id="btn-vote-down"
            icon="caret-down"
          />
        </div>
        <div className="vote-count">
          <span className="voting-counter">
            <span className="vote-count-data">+ {votes}</span>
            <span className="vote-count-label">głosów</span>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Votes;
