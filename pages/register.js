import BaseLayout from "../components/Layouts/BaseLayout";
import Header from "../components/shared/Header";
import Wrapper from "../components/shared/Wrapper";
import Separator from "../components/shared/Separator";
import RegistryForm from "../components/Register/RegistryForm";

const Register = () => {
  return (
    <BaseLayout>
      <Wrapper>
        <Header content="Rejestracja nowego użytkownika" />
        <Separator />
        <RegistryForm />
      </Wrapper>
    </BaseLayout>
  );
};

export default Register;
