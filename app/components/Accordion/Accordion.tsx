import styles from "./Accordion.module.scss";
import { AccordionProps } from "./types";

function AccordionAction({ Title }: AccordionProps) {
  return (
    <>
      <div className={styles.box}>
        <p className={styles.mark}>+</p>
        <p className={styles.title}>{Title}</p>
      </div>
      <div className={styles.line}></div>
    </>
  );
}

function Accordion() {
  const Accordion_List: AccordionProps[] = [
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
  ];
  return (
    <div>
      <div className={styles.infor_layout}>
        <h2 className={styles.Accordion_title}>
          Exercitaion <br />
          ullamco laboris
        </h2>
        <div className={styles.infor_blog}>
          {Accordion_List.map((item, index) => (
            <AccordionAction key={index} Title={item.Title}></AccordionAction>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
