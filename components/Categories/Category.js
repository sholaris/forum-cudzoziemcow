const Category = (props) => {
  return (
    <>
      <span
        className="new badge category-link"
        data-badge-caption={props.name}
      ></span>
      <div className="clear"></div>
      <span className="category-desc">{props.desc}</span>
    </>
  );
};

export default Category;
