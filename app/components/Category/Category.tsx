import Image from "next/image";
import styles from "./Category.module.scss";
import { CategoryProps } from "./types";

function Category() {
  const Category_List: CategoryProps[] = [
    {
      cover: "01_printer",
      title: "3D Printer",
      description: "Lorem ipsum dolor sit amet consectetu",
    },
    {
      cover: "01_printer",
      title: "3D Printer",
      description: "Lorem ipsum dolor sit amet consectetu",
    },
    {
      cover: "01_printer",
      title: "3D Printer",
      description: "Lorem ipsum dolor sit amet consectetu",
    },
  ];

  return (
    <div>
      <h4 className={styles.category_title}>Category Tools</h4>
      <div className={styles.blog}>
        {Category_List.map((item, index) => (
          <CategoryBlog
            key={index}
            cover={item.cover}
            title={item.title}
            description={item.description}
          ></CategoryBlog>
        ))}
      </div>
    </div>
  );
}

const CategoryBlog = ({ cover, title, description }: CategoryProps) => {
  return (
    <div className={styles.category}>
      <div className={styles.category_imageContainer}>
        <Image
          className={styles.category_image}
          src={`/category/${cover}.png`}
          width={500}
          height={500}
          alt={`${cover}`}
        ></Image>
      </div>
      <div className={styles.article}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Category;
