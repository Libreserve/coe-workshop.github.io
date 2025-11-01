import React from "react";
import Navbar from "./components/navbar";
import styles from "./page.module.scss";
import WelcomeText from "./components/landing/welcome_text";
import Category from "./components/landing/category";
import { CategoryProps } from "./components/landing/category";
import Guide from "./components/landing/guide";
import Information, {Questions} from "@/app/components/landing/information";

function page() {
  const Category_List: CategoryProps[] = [
    {
      Cover: "01_printer",
      Title: "3D Printer",
      Description: "Lorem ipsum dolor sit amet consectetu",
    },
    {
      Cover: "01_printer",
      Title: "3D Printer",
      Description: "Lorem ipsum dolor sit amet consectetu",
    },
    {
      Cover: "01_printer",
      Title: "3D Printer",
      Description: "Lorem ipsum dolor sit amet consectetu",
    },
  ];
  const Information_List: Questions[] = [
    {
      Title: "What types of tasks is EN.W suitable for?",
    },
    {
      Title: "What types of tasks is EN.W suitable for?",
    },
    {
      Title: "Does the website provide support?",
    },
    {
      Title: "About Developers",
    },
  ]

  return (
    <div className={styles.landing}>
      <Navbar></Navbar>
      <WelcomeText></WelcomeText>
      <section className={styles.category}>
        <h4 className={styles.category_title}>Category Tools</h4>
        <div className={styles.blog}>
          {Category_List.map((item, index) => (
            <Category
              key={index}
              Cover={item.Cover}
              Title={item.Title}
              Description={item.Description}
            ></Category>
          ))}
        </div>
      </section>
      <section className={styles.information}>
        <div className={styles.infor_layout}>
          <h2 className={styles.information_title}>Exercitaion <br/>ullamco laboris</h2>
          <div className={styles.infor_blog}>
            {Information_List.map((item, index) => (
              <Information
                  key={index}
                  Title={item.Title}>
              </Information>
            ))}
          </div>
        </div>
      </section>
      <Guide></Guide>
    </div>
  );
}

export default page;
