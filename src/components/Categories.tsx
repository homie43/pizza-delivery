import React from "react";

type CategorysProps = {
  categoryId: number;
  onChangeCategory: (idx: number) => void; // void значит что функция вернет ничего
};

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

const Categories: React.FC<CategorysProps> = React.memo(
  // React.memo кэширует первый рендер и использует его при изменении других компонентов, чтобы не делать ре-рендер
  ({ categoryId, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li
              key={i} // лучше в key не передавать индекс, но тут спорно, тк список статичный и меняться не будет
              onClick={() => onChangeCategory(i)}
              className={categoryId === i ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
