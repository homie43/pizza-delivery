import React from "react";

const Categories = ({ categoryId, setCategoryId }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i} // лучше в key не передавать индекс, но тут спорно, тк список статичный и меняться не будет
            onClick={() => setCategoryId(i)}
            className={categoryId === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
