import { getCategoryDisplay, toToolCategory } from "@/app/lib/features/tools/category.utils";
import styles from "./ItemBlog.module.scss";
import { ItemBlogProps } from "./ItemBlog.types";

export const ItemBlog = ({
  id,
  name,
  description = "",
  imageUrl,
  avaliable,
  quatity,
  category,
  onClick,
}: ItemBlogProps & { onClick?: () => void }) => {
  return (
    <button className={styles.itemBlog} onClick={onClick}>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>ไม่มีรูป</div>
        )}
      </div>
      <section className={styles.info}>
        {category && (
          <span className={styles.info_category}>{category ? getCategoryDisplay(toToolCategory(category)!) : ""}</span>
        )}
        <h2 className={styles.info_name}>{name}</h2>
        <p className={styles.info_description}>
          {description.length > 50
            ? description.slice(0, 50) + "..."
            : description || "ไม่มีคำอธิบาย"}
        </p>
        <div className={styles.availability_container}>
          <span className={styles.availability_label}>จำนวนที่ว่าง</span>
          <span className={styles.info_number}>
            <span className={styles.info_avaliable}>{avaliable || 0}</span>
            <span className={styles.info_quatity}>/ {quatity || 0}</span>
          </span>
        </div>
      </section>
    </button>
  );
};
