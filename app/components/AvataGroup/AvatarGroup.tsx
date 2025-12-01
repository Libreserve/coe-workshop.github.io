import styles from "@/app/components/AvataGroup/AvatarGroup.module.scss"
import Image from "next/image"
import { AvatarGroup } from "./types";

function AvataGroup({max, imageList}:AvatarGroup) {
    const rest:number = imageList.length + 1 - max;
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
                    return null;
                })}
                {
                    rest > 0 && (
                    <div className={styles.avatar} key={`avatar-shrink`}>
                        <div className={styles.avatar_rest}>
                                +{rest}
                        </div>
                    </div>
                    )
                }
            </div>
        </>
    );
};
export default AvataGroup;