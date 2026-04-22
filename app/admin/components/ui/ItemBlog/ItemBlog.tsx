import styles from "./ItemBlog.module.scss";
import { ItemBlogProps } from "./ItemBlog.types";
export const ItemBlog = ({
  name,
  description = "",
  avaliable,
  quatity,
}: ItemBlogProps) => {
  return (
    <button className={styles.itemBlog}>
      <div>
        {/* <Image src={imageUrl} width={200} height={200} alt={name}></Image> */}
      </div>
      <section className={styles.info}>
        <div>
          <h2 className={styles.info_name}>{name}</h2>
          <p className={styles.info_description}>
            {description.length > 30
              ? description.slice(0, 30) + " ..."
              : description}
          </p>
          <span className={styles.info_number}>
            <h3 className={styles.info_avaliable}>{avaliable}</h3>
            <h3 className={styles.info_quatity}>/ {quatity}</h3>
          </span>
        </div>
        {/* <div>
          <SvgIconMono
            src="./icon/dot.svg"
            width={14}
            height={14}
            alt="dot"
          ></SvgIconMono>
        </div> */}
      </section>
    </button>
  );
};
