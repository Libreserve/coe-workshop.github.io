import { useEffect, useState } from "react";
import styles from "./CategoryFilter.module.scss";
import Image from "next/image";

function CategoryFilter({
  onCategoryChange,
}: {
  onCategoryChange: (category: string | null) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: AllToolsMatches[]) => {
        const eachCategory = [...new Set(data.map((item) => item.category))];
        setCategories(eachCategory);
      });
  }, []);

  const handleClick = (category: string | null) => {
    setSelected(category);
    onCategoryChange(category);
  };

  return (
    <div className={styles.container}>
      {categories.map((item, index) => (
        <div
          key={index}
          className={selected === item ? styles.active : styles.none_active}
          onClick={() => handleClick(item)}
        >
          {/* <Image
            width={18}
            height={18}
            alt="search_icon"
            src={"/tools/bag.png"}
            className={styles.icon_size}
          ></Image> */}
          <p>Category {index + 1}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryFilter;
