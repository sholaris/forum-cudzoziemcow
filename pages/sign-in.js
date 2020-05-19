import BaseLayout from "../components/Layouts/BaseLayout";
import Header from "../components/shared/Header";
import Wrapper from "../components/shared/Wrapper";
import Separator from "../components/shared/Separator";
import LoginForm from "../components/Sign-In/LoginForm";
import firebaseApp from "../firebase/_Init";
import { useEffect } from "react";

const SignIn = () => {
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        document.location.replace("/");
      }
    });
  }, []);
  return (
    <BaseLayout>
      <Wrapper>
        <Header content="Zaloguj się" />
        <Separator />
        <LoginForm />
      </Wrapper>
    </BaseLayout>
  );
};

export default SignIn;
