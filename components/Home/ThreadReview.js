import { useEffect, useState } from "react";
import firebaseApp from "../../firebase/_Init";
import Link from "next/link";

const ThreadReview = (props) => {
  const [author, setAuthor] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getUserName();
    let tags_list = [];
    for (let key in props.tags) {
      tags_list.push(props.tags[key]);
    }
    setTags(tags_list);
  }, []);

  function getUserName() {
    const usersRef = firebaseApp.firestore().collection("users");
    const query = usersRef
      .where("email", "==", props.author)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setAuthor(doc.id);
        });
      });
  }

  return (
    <div className="thread-container">
      <div className="thread-stats">
        <div className="votes">
          <span className="number">{props.votes}</span>
          <span className="label">głosów</span>
        </div>
        <div className="answers">
          <span className="number">{props.answers}</span>
          <span className="label">odpowiedzi</span>
        </div>
      </div>
      <div className="thread-details">
        <Link href="/threads/[id]" as={`/threads/${props.id}`}>
          <a>
            <h2 className="thread-title">{props.title}</h2>
          </a>
        </Link>

        <p className="details">
          pytanie zadane <span className="when">{props.date}</span> w{" "}
          <span className="where">{props.category}</span> przez{" "}
          <span className="who">{author}</span>{" "}
        </p>
        <div className="tags-container">
          {tags.map((tag) => (
            <span
              key={tag}
              className="new badge"
              data-badge-caption={tag}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreadReview;
