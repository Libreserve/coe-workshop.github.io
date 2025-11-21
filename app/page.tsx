import React from "react";
import Navbar from "./components/Navbar/Navbar";
import styles from "./page.module.scss";
import Category from "./components/Category/Category";
import Guide from "./components/Guide/guide";
import Accordion from "@/app/components/Accordion/Accordion";
import WelcomeText from "./components/Welcome_text/Welcome_text";
import Toast from "./components/Toast/Toast";
import Discover from "@/app/components/Discover/discover";
import Popular from "@/app/components/Popular/popular";
import Interpreting from "@/app/components/Interpreting/interpreting";
import Footer from "./components/Footer/Footer";
function page() {
  return (
    <div className={styles.landing}>
<<<<<<< HEAD
        <Navbar></Navbar>
        <WelcomeText></WelcomeText>
        <Category></Category>
        <Guide></Guide>
        <Discover></Discover>
        <Popular></Popular>
        <Interpreting></Interpreting>
        <Accordion></Accordion>
        <Toast
          Variant="success"
          Title="Success to update"
          Description=" ReferenceError: Toast is not defined"
        ></Toast>
        <Footer></Footer>
=======
      <WelcomeText></WelcomeText>
      <Category></Category>
      <Guide></Guide>
      <Discover></Discover>
      <Popular></Popular>
      <Interpreting></Interpreting>
      <Accordion></Accordion>
>>>>>>> origin/main
    </div>
  );
}

export default page;
