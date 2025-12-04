import Image from "next/image";
import styles from "./guide.module.scss";
import { StepBlogProps } from "./types";
function StepBlog({ Index, Cover, Title }: StepBlogProps) {
  return (
    <div className={styles.blog}>
      <div className={styles.blog_content}>
        <h1 className={styles.blog_index}>{Index}</h1>
        <div>
          <h2 className={styles.blog_title}>{Title}</h2>
        </div>
      </div>
      <div className={styles.blog_warper}>
        <Image
          className={styles.blog_image}
          src={Cover}
          width={200}
          height={200}
          alt={Cover}
        ></Image>
      </div>
    </div>
  );
}

function Guide() {
  const stepBlog: StepBlogProps[] = [
    {
      Cover: "/guide/02_step_1.png",
      Title: "consectetur adipiscing",
      Description: "Duis aute irure dolor in",
    },
    {
      Cover: "/category/01_printer.png",
      Title: "Title",
      Description: "Description",
    },
    {
      Cover: "/category/01_printer.png",
      Title: "Title",
      Description: "Description",
    },
  ];

  return (
    <div className={styles.guide}>
      <div className={styles.text}>
        <h1 className={styles.text_title}>Lorem ipsum dolor sit amet.</h1>
        <h2 className={styles.text_description}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi,
          consectetur?
        </h2>
      </div>
      <div className={styles.guide_action}>
        {stepBlog.map((item, index) => (
          <StepBlog
            key={index}
            Index={index + 1}
            Cover={item.Cover}
            Title={item.Title}
            Description={item.Description}
          ></StepBlog>
        ))}
      </div>
    </div>
  );
}

export default Guide;
