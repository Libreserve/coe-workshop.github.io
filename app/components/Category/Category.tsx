import React from "react";
import styles from "./Category.module.scss";
import Image from "next/image";
import { title } from "process";

function Category() {
  const Category_List: CategoryProps[] = [
    {
      Cover: "01_printer",
      Title: "3D Printer",
      Description: "Lorem ipsum dolor sit amet consectetu",
    },
    {
      Cover: "01_printer",
      Title: "3D Printer",
      Description: "Lorem ipsum dolor sit amet consectetu",
    },
    {
      Cover: "01_printer",
      Title: "3D Printer",
      Description: "Lorem ipsum dolor sit amet consectetu",
    },
  ];

  return (
    <div>
      <h4 className={styles.category_title}>Category Tools</h4>
      <div className={styles.blog}>
        {Category_List.map((item, index) => (
          <CategoryBlog
            key={index}
            Cover={item.Cover}
            Title={item.Title}
            Description={item.Description}
          ></CategoryBlog>
        ))}
      </div>
    </div>
  );
}

function CategoryBlog({ Cover, Title, Description }: CategoryProps) {
  return (
    <div className={styles.category}>
      <div className={styles.category_imageContainer}>
        <Image
          className={styles.category_image}
          src={`/category/${Cover}.png`}
          width={500}
          height={500}
          alt={`${Cover}`}
        ></Image>
      </div>
      <div className={styles.article}>
        <h2 className={styles.title}>{Title}</h2>
        <p className={styles.Description}>{Description}</p>
      </div>
    </div>
  );
}

export default Category;
