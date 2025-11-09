import React from "react";
import Navbar from "./components/Navbar/Navbar";
import styles from "./page.module.scss";
import Category from "./components/Category/Category";
import Guide from "./components/Guide/guide";
import Accordion from "@/app/components/Accordion/Accordion";
import WelcomeText from "./components/Welcome_text/Welcome_text";
import Toast from "./components/Toast/Toast";
import Discover from "@/app/components/Discover/discover";
function page() {
  return (
    <div className={styles.landing}>
        <Navbar></Navbar>
        <WelcomeText></WelcomeText>
        <Category></Category>
        <Guide></Guide>
        <Discover></Discover>
        <Accordion></Accordion>
        <Toast
          Variant="success"
          Title="Success to update"
          Description=" ReferenceError: Toast is not defined"
        ></Toast>
    </div>
  );
}

export default page;
