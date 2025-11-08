import React from "react";
import Navbar from "./components/Navbar/Navbar";
import styles from "./page.module.scss";
import Category from "./components/Category/Category";
import Guide from "./components/Guide/guide";
import Accordion from "@/app/components/Accordion/Accordion";
import WelcomeText from "./components/Welcome_text/Welcome_text";
import Footer from "./components/Footer/Footer";
function page() {
  return (
    <div>
      <div className={styles.landing}>
        <Navbar></Navbar>
        <WelcomeText></WelcomeText>
        <Category></Category>
        <Guide></Guide>
        <Accordion></Accordion>
      </div>
        <Footer></Footer>
    </div>
    
  );
}

export default page;
