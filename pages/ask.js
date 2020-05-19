import BaseLayout from "../components/Layouts/BaseLayout";
import Header from "../components/shared/Header";
import Separator from "../components/shared/Separator";
import Wrapper from "../components/shared/Wrapper";
import Questionaire from "../components/Ask/Questionaire";
import LoginForm from "../components/Sign-In/LoginForm";
import firebaseApp from "../firebase/_Init";
import { useEffect, useState } from "react";

const Ask = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <BaseLayout>
      <Wrapper>
        {user ? (
          <>
            <Header content="Zadaj pytanie" />
            <Separator />
            <Questionaire />
          </>
        ) : (
          <>
            <Header content="Zaloguj się" />
            <Separator />
            <LoginForm />
          </>
        )}
      </Wrapper>
    </BaseLayout>
  );
};

export default Ask;
