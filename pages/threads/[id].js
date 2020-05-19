import BaseLayout from "../../components/Layouts/BaseLayout";
import Wrapper from "../../components/shared/Wrapper";
import Header from "../../components/shared/Header";
import Separator from "../../components/shared/Separator";
import Post from "../../components/Post/Post";
import Error from "../../components/shared/Error";
import Answers from "../../components/Post/Answers";
import { convertDate } from "../../lib/utils";
import firebaseApp from "../../firebase/_Init";
import { useEffect, useState } from "react";

export async function getStaticPaths() {
  // getting all possible threads IDs
  let threads = { ids: [] };
  const threadsRef = firebaseApp.firestore().collection("threads");
  const query = await threadsRef.get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      threads.ids.push(doc.id);
    });
  });

  const paths = threads.ids.map((thread_id) => ({
    params: { id: thread_id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // fetching all thread data
  let thread = {};
  const threadRef = firebaseApp
    .firestore()
    .collection("threads")
    .doc(params.id);
  const query1 = await threadRef.get().then((doc) => {
    thread.id = params.id;
    thread.title = doc.data().title;
    thread.author = doc.data().author;
    thread.date = convertDate(doc.data().date);
    thread.category = doc.data().category;
    thread.stats = doc.data().stats;
    thread.tags = doc.data().tags;
    thread.question = doc.data().content;
  });

  // fetching answers for this post
  let answers = { data: [] };
  const answersRef = firebaseApp
    .firestore()
    .collection("threads")
    .doc(params.id)
    .collection("answers");
  const query2 = await answersRef
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        let answer = {};
        answer.id = doc.id;
        answer.author = doc.data().author;
        answer.date = convertDate(doc.data().date);
        answer.content = doc.data().content;
        answer.votes = doc.data().votes;
        answer.comments = [];
        answersRef
          .doc(doc.id)
          .collection("comments")
          .get()
          .then((comments) => {
            if (!comments.empty) {
              comments.forEach((comment) => {
                answer.comments.push({
                  id: comment.id,
                  author: comment.data().author,
                  date: convertDate(comment.data().date),
                  content: comment.data().content,
                });
              });
            }
          });
        answers.data.push(answer);
      });
    });

  // fetching comments for this post
  let comments = { data: [] };
  const commentsRef = firebaseApp
    .firestore()
    .collection("threads")
    .doc(params.id)
    .collection("comments");
  const query3 = await commentsRef
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        let comment = {};
        comment.id = doc.id;
        comment.author = doc.data().author;
        comment.date = convertDate(doc.data().date);
        comment.content = doc.data().content;
        comments.data.push(comment);
      });
    });

  return { props: { thread, answers, comments } };
}

const Thread = ({ thread, answers, comments }) => {
  const [author, setAuthor] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getUserName();
    let tags_list = [];
    for (let key in thread.tags) {
      tags_list.push(thread.tags[key]);
    }
    setTags(tags_list);
  }, []);

  function getUserName() {
    // getting username of current logged in user for setting author attribute of post metadata
    const usersRef = firebaseApp.firestore().collection("users");
    const query = usersRef
      .where("email", "==", thread.author)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setAuthor(doc.id);
        });
      });
  }
  return (
    <BaseLayout>
      <Wrapper>
        <Header content={thread.title} />
        <Separator />
        <Error />
        <Post
          id={thread.id}
          date={thread.date}
          author={author}
          category={thread.category}
          tags={tags}
          stats={thread.stats}
          content={thread.question}
          comments={comments}
        />
        {answers ? (
          <Answers answers={answers} post_id={thread.id} />
        ) : (
          <Separator />
        )}
      </Wrapper>
    </BaseLayout>
  );
};

export default Thread;
