import styles from "@/app/components/Discover/discover.module.scss";
import Image from "next/image";
import React from "react";
import Link from 'next/link';

function Blog({ Cover, Title, Url }: BlogProps) {
    return (
      <div className={styles.detail}>
          <Image
              className={styles.blog_image}
              src={Cover}
              width={310}
              height={300}
              alt={Title}
          ></Image>
          <div className={styles.text}>
              <h4>{Title}</h4>
              <div className={styles.link_container}>
                  <Link href={Url} className={styles.link}>
                      <span className={styles.text_default}>Discover</span>
                      <span className={styles.text_hover}>Discover</span>
                  </Link>
                  <span className={styles.icon}> ⟶ </span>
              </div>
          </div>
      </div>
    );
}

function Discover(){
    const BlogList: BlogProps[] = [
        {
            Cover: "/discover/picture.jpg",
            Title: "Adipiscing",
            Url: "/discover/adipiscing"
        },
        {
            Cover: "/discover/picture.jpg",
            Title: "Ut enim",
            Url: "/discover/adipiscing"
        },
        {
            Cover: "/discover/picture.jpg",
            Title: "Duis aute",
            Url: "/discover/adipiscing"
        },
        {
            Cover: "/discover/picture.jpg",
            Title: "Lorem ipsum",
            Url: "/discover/adipiscing"
        },

    ];
    return (
        <div className={styles.container}>
            <h3>Consectetur</h3>
            <div className={styles.box}>
                {BlogList.map((item,index) => (
                    <Blog
                        key={index}
                        Cover = {item.Cover}
                        Title =  {item.Title}
                        Url = {item.Url}
                    ></Blog>
                ))}
            </div>
        </div>
    );
}
export default Discover;