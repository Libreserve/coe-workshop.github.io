import styles from "@/app/components/AvataGroup/AvatarGroup.module.scss"
import Image from "next/image"

function AvataGroup({max, imageList}:AvatarGroup) {
    return (
        <>
            <div className={styles.avatar_group}>
                {imageList.map((image, index) => {
                    if (index < max) return (
                    <div className={styles.avatar} key={`avatar-${index}`}>
                        <Image
                            src={image}
                            alt={`tool-${index}`}
                            width={100}
                            height={100}
                            className={styles.avatar_image}
                            >
                        </Image>            
                    </div>
                    )
                    else if (index === max) return (
                    <div className={styles.avatar} key={`avatar-${index}`}>
                        <div className={styles.avatar_rest}>
                                +{imageList.length - max + 1}
                        </div>
                    </div>
                    )
                    return null;
                })}
            </div>
        </>
    );
};
export default AvataGroup;