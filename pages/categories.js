import BaseLayout from "../components/Layouts/BaseLayout";
import Header from "../components/shared/Header";
import Separator from "../components/shared/Separator";
import Wrapper from "../components/shared/Wrapper";
import CatList from "../components/Categories/CatList";

const Categories = () => {
  return (
    <BaseLayout>
      <Wrapper>
        <Header content="Kategorie zadawanych pytań" />
        <Separator />
        <CatList />
      </Wrapper>
    </BaseLayout>
  );
};

export default Categories;
