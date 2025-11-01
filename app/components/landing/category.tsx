import React from "react";
import styles from "./category.module.scss";
import Image from "next/image";
import { title } from "process";

export interface CategoryProps {
  Cover: string; //image address
  Title: string; //name of catagory
  Description: string;
}

function Category({ Cover, Title, Description }: CategoryProps) {
  return (
    <div className={styles.category}>
      <div className={styles.category_image_container}>
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
