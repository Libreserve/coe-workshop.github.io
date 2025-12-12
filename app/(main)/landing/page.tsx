import Accordion from "@/app/components/Accordion/Accordion";
import Discover from "@/app/components/Discover/discover";
import Category from "../../components/Category/Category";
import Guide from "../../components/Guide/guide";
import WelcomeText from "../../components/Welcome_text/Welcome_text";
import styles from "./landing.module.scss";

function Landing() {
  return (
    <div className={styles.landing}>
      <WelcomeText></WelcomeText>
      <Category></Category>
      <Guide></Guide>
      <Discover></Discover>
      {/* <Popular></Popular>
      <Interpreting></Interpreting> */}
      <Accordion></Accordion>
    </div>
  );
}

export default Landing;
