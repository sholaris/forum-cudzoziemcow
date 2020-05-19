import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebaseApp from "../../firebase/_Init";
import { useState } from "react";

const Votes = ({ votes, post_id }) => {
  const [db_votes, setVotes] = useState(votes);

  function handleSubmit(e) {
    // update votes counter for post
    let user = firebaseApp.auth().currentUser;
    if (user) {
      const threadRef = firebaseApp
        .firestore()
        .collection("threads")
        .doc(post_id);
      let query = threadRef.get().then((doc) => {
        setVotes(doc.data().stats.votes);
      });
      console.log(db_votes);
      if (e.target.parentElement.id == "btn-vote-up") {
        let updateVotes = threadRef.update({ "stats.votes": db_votes + 1 });
      } else if (e.target.parentElement.id == "btn-vote-down") {
        let updateVotes = threadRef.update({ "stats.votes": db_votes - 1 });
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
