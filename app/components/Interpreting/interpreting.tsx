import styles from "@/app/components/Interpreting/interpreting.module.scss";
import React from "react";
import Image from "next/image";
import { InterProps } from "./type";
function BlogPosts({ Cover, Title, Description }: InterProps) {
  return (
    <div className={styles.blog_container}>
      <Image
        className={styles.blog_image}
        src={Cover}
        width={310}
        height={300}
        alt={Title}
      ></Image>
      <h4>{Title}</h4>
      <p>{Description}</p>
    </div>
  );
}
function Interpreting() {
  const InterList: InterProps[] = [
    {
      Cover: "/interpreting/picture.jpg",
      Title: "Lorem ipsum dolor sit amet",
      Description:
        "consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad mini.",
    },
    {
      Cover: "/interpreting/picture.jpg",
      Title: "Lorem ipsum dolor sit amet",
      Description:
        "consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad mini.",
    },
  ];
  return (
    <div className={styles.container}>
      <h3>Interpreting</h3>
      <div className={styles.box}>
        {InterList.map((item, index) => (
          <BlogPosts
            key={index}
            Cover={item.Cover}
            Title={item.Title}
            Description={item.Description}
          ></BlogPosts>
        ))}
      </div>
    </div>
  );
}
export default Interpreting;
