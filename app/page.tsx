import React from "react";
import Navbar from "./components/Navbar/Navbar";
import styles from "./page.module.scss";
import Category from "./components/Category/Category";
import Guide from "./components/Guide/guide";
import Accordion from "@/app/components/Accordion/Accordion";
import { CategoryProps } from "./components/Category/types";
import { AccordionProps } from "./components/Accordion/types";
import WelcomeText from "./components/Welcome_text/Welcome_text";

function page() {
  return (
    <div className={styles.landing}>
      <Navbar></Navbar>
      <WelcomeText></WelcomeText>
      <Category></Category>
      <Accordion></Accordion>
      <Guide></Guide>
    </div>
  );
}

export default page;
