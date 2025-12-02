"use client";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  // adding each link is needed
  const About_List = [
    {
      Header: "Pages",
      Content: [
        { title: "Home", link: "/" },
        { title: "Tools", link: "/" },
        { title: "Basket", link: "/" },
        { title: "Transaction", link: "/" },
      ],
    },
    {
      Header: "About",
      Content: [
        { title: "Website", link: "/" },
        { title: "Instructor", link: "/" },
        { title: "Developer", link: "/" },
      ],
    },
    {
      Header: "Resources",
      Content: [
        { title: "EN KKU", link: "/" },
        { title: "Blog", link: "/" },
        { title: "Event", link: "/" },
        { title: "News", link: "/" },
      ],
    },
    {
      Header: "Help",
      Content: [
        { title: "FAQs", link: "/" },
        { title: "Reviews", link: "/" },
        { title: "How it works ", link: "/" },
        { title: "Report", link: "/" },
      ],
    },
  ];

  // link via logo, unfinished logo issue
  // const left_contact = {
  //     github: {
  //         image: "GitHub",
  //         url: "https://github.com/yourusername"
  //     },
  //     facebook: {
  //         image : "Facebook",
  //         url: "https://facebook.com/yourpage"
  //     },
  //     gmail: {
  //         image: "Email Us",
  //         url: "mailto:youremail@gmail.com"
  //     }
  // };

  return (
    <div className={styles.blog}>
      <div className={styles.left}>
        <div className={styles.left_heading}>
          EN.<span style={{ color: "#b6acacff" }}>W</span>
        </div>
        <div className={styles.left_text}>DEVELOP</div>
        <div className={styles.left_logo}>
          <Image
            src={"/footer/left_contact_logo.png"}
            alt="Logo"
            width={97}
            height={29}
          />
        </div>
      </div>

      <div className={styles.right}>
        {About_List.map((item, index) => (
          <div key={index} className={styles.right_blog}>
            <div key={`header-${index}`} className={styles.right_heading}>
              {item.Header}
            </div>
            <div className={styles.right_content}>
              {item.Content &&
                item.Content.map((contentItem, contentIndex) => (
                  <Link href={contentItem.link} key={contentIndex}>
                    {contentItem.title}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
      <hr className={styles.hr} />
    </div>
  );
}

export default Footer;
