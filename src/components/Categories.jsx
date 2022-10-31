import React from "react";

const Categories = () => {
  const [activeCategory, setActiveCategory] = React.useState(0); // состояние категорий

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
        {categories.map((category, i) => (
          <li
            key={i} // лучше в key не передавать индекс, но тут спорно, тк список статичный и меняться не будет
            onClick={() => setActiveCategory(i)}
            className={activeCategory === i ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
