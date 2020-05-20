import BaseLayout from "../components/Layouts/BaseLayout";
import Filters from "../components/Home/Filters";
import Header from "../components/shared/Header";
import ThreadReview from "../components/Home/ThreadReview";
import Separator from "../components/shared/Separator";
import Wrapper from "../components/shared/Wrapper";
import firebaseApp from "../firebase/_Init";
import { convertDate } from "../lib/utils";
import { useRouter, useState } from "react";

const Home = ({ threads, sort }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  // const router = useRouter();
  // const { q } = router.query;

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    let results = [];
    threads.data.forEach((post) => {
      let tags_list = [];
      for (let key in post.tags) {
        tags_list.push(post.tags[key]);
      }
      search.split(" ").some((word) => {
        if (tags_list.indexOf(word) != -1) {
          results.push(post);
          return true;
        } else if (post.title.indexOf(word) != -1) {
          results.push(post);
          return true;
        }
      });
    });
    setPosts(results);
    console.log(results);
  }

  return (
    <BaseLayout handleSearch={handleSearch} handleChange={handleChange}>
      <Wrapper>
        <Filters method={sort} />
        <Header content="Najnowsze pytania i odpowiedzi" />
        <Separator />
        {posts.length == 0
          ? threads.data.map((doc) => (
              <ThreadReview
                key={doc.id}
                id={doc.id}
                tags={doc.tags}
                votes={doc.votes}
                answers={doc.answers}
                title={doc.title}
                date={doc.date}
                category={doc.category}
                author={doc.author}
              />
            ))
          : posts.map((doc) => (
              <ThreadReview
                key={doc.id}
                id={doc.id}
                tags={doc.tags}
                votes={doc.votes}
                answers={doc.answers}
                title={doc.title}
                date={doc.date}
                category={doc.category}
                author={doc.author}
              />
            ))}
      </Wrapper>
    </BaseLayout>
  );
};

Home.getInitialProps = async (ctx) => {
  // fetching all posts metadata to display as a list o reviews
  let sort = "date";
  if (ctx.query.sort) {
    sort = `stats.${ctx.query.sort}`;
  }

  let threads = { data: [] };
  const threadsRef = firebaseApp.firestore().collection("threads");
  const query = await threadsRef
    .orderBy(sort, "desc")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        let thread = {};
        thread.id = doc.id;
        thread.date = convertDate(doc.data().date);
        thread.author = doc.data().author;
        thread.category = doc.data().category;
        thread.votes = doc.data().stats.votes;
        thread.answers = doc.data().stats.answers;
        thread.title = doc.data().title;
        thread.tags = doc.data().tags;
        threads.data.push(thread);
      });
    });
  return {
    threads: threads,
    sort: sort,
  };
};

export default Home;
