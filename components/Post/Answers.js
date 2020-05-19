import Answer from "./Answer";

const Answers = ({ answers, post_id }) => {
  return (
    <div className="answers-list-container">
      <h2>{answers.data.length} Odpowiedzi</h2>
      <div className="answer-list">
        {answers.data.map((answer) => (
          <Answer
            post_id={post_id}
            ans_id={answer.id}
            author={answer.author}
            date={answer.date}
            content={answer.content}
            votes={answer.votes}
            comments={answer.comments}
          />
        ))}
      </div>
    </div>
  );
};

export default Answers;
