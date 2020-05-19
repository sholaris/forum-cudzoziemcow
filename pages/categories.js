import BaseLayout from "../components/Layouts/BaseLayout";
import Header from "../components/shared/Header";
import Separator from "../components/shared/Separator";
import Wrapper from "../components/shared/Wrapper";

const Categories = () => {
  return (
    <BaseLayout>
      <Wrapper>
        <Header content="Kategorie zadawanych pytań" />
        <Separator />
      </Wrapper>
    </BaseLayout>
  );
};

export default Categories;
