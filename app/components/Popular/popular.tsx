import styles from "@/app/components/Popular/popular.module.scss";
import Image from "next/image";
import { ImageProps } from "./type";
function Picture({ cover, title }: ImageProps) {
  return (
    <div>
      <Image
        className={styles.blog_image}
        src={cover}
        width={310}
        height={300}
        alt={title}
      ></Image>
    </div>
  );
}

function Popular() {
  const imageList: ImageProps[] = [
    {
      cover: "/popular/picture.jpg",
      title: "picture1",
    },
    {
      cover: "/popular/picture.jpg",
      title: "picture2",
    },
    {
      cover: "/popular/picture.jpg",
      title: "picture3",
    },
  ];
  return (
    <div className={styles.container}>
      <h3>Excepteur</h3>
      <div className={styles.box}>
        {imageList.map((item, index) => (
          <Picture key={index} cover={item.cover} title={item.title}></Picture>
        ))}
      </div>
    </div>
  );
}
export default Popular;
