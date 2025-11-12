import React from "react";
import styles from "@/app/components/Popular/popular.module.scss";
import Image from "next/image";
function Picture({ Cover, Title}: ImageProps) {
    return (
        <div>
            <Image
                className={styles.blog_image}
                src={Cover}
                width={310}
                height={300}
                alt={Title}
            ></Image>
        </div>
    )
}

function Popular() {
    const imageList: ImageProps[] = [
        {
            Cover: "/popular/picture.jpg",
            Title: "picture1",
        },
        {
            Cover: "/popular/picture.jpg",
            Title: "picture2",
        },
        {
            Cover: "/popular/picture.jpg",
            Title: "picture3",
        },
    ]
    return (
        <div className={styles.container}>
            <h3>Excepteur</h3>
            <div className={styles.box}>
                {imageList.map((item,index) => (
                    <Picture
                        key={index}
                        Cover = {item.Cover}
                        Title =  {item.Title}
                    ></Picture>
                ))}
            </div>
        </div>
    )
}
export default Popular;