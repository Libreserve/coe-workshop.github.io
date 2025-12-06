"use client";
import styles from "./Accordion.module.scss";
import { useState } from "react";
import { AccordionProps } from "./types";

function AccordionAction({
  Title,
  Content,
  isOpen,
  onToggle,
}: AccordionProps & { isOpen?: boolean; onToggle?: () => void }) {
  return (
    <>
      <div className={styles.box} onClick={onToggle}>
        <p className={styles.mark}>{isOpen ? "-" : "+"}</p>
        <p className={styles.title}>{Title}</p>
      </div>
      {isOpen && (
        <div className={styles.content}>
          <p className={styles.content_text}>{Content}</p>
        </div>
      )}
      <div className={styles.line}></div>
    </>
  );
}

function Accordion() {
  const [open, setOpen] = useState<number | null>(null);

  const Accordion_List: AccordionProps[] = [
    {
      Title: "What types of tasks is EN.W suitable for?",
      Content: "No data",
    },
    {
      Title: "What types of tasks is EN.W suitable for?",
      Content: "No data",
    },
    {
      Title: "Does the website provide support?",
      Content: "No data",
    },
    {
      Title: "About Developers",
      Content: "No data",
    },
  ];
  return (
    <div className={styles.information}>
      <div className={styles.infor_layout}>
        <h2 className={styles.Accordion_title}>
          Exercitaion <br />
          ullamco laboris
        </h2>
        <div className={styles.infor_blog}>
          {Accordion_List.map((item, index) => (
            <AccordionAction
              key={index}
              Title={item.Title}
              Content={item.Content}
              isOpen={open === index}
              onToggle={() => setOpen(open === index ? null : index)}
            ></AccordionAction>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
