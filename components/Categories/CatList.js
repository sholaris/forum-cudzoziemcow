import Category from "./Category";
import { categories } from "../../public/pagedata/manifest";

const CatList = () => {
  return (
    <div className="content cat-list">
      <ul className="categories-list">
        {categories.map((category) => (
          <li className="category-item">
            <Category name={category.name} desc={category.description} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatList;
