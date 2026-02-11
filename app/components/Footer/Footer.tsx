"use client";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const aboutListTh = [
    {
      Header: "หน้าเพจ",
      Content: [
        { title: "หน้าหลัก", link: "/" },
        { title: "อุปกรณ์", link: "https://ben10.fandom.com/wiki/Omnitrix" },
        {
          title: "ตะกร้า",
          link: "https://www.facebook.com/share/v/1Bz5FMqiAm/",
        },
        { title: "รายการ", link: "https://www.instagram.com/p/DMN8fpNpJnt/" },
      ],
    },
    {
      Header: "เกี่ยวกับ",
      Content: [
        { title: "เว็บไซต์", link: "https://election2569.thestandard.co/" },
        { title: "ผู้ชี้แนะ", link: "https://www.hindustantimes.com/entertainment/anime/jujutsu-kaisen-101-jujutsu-kaisen-power-system-and-gojo-satoru-limitless-technique-explained-101690524713929.html" },
        { title: "ผู้พัฒนา", link: "https://www.instagram.com/p/DSwm6d5kTKp/" },
      ],
    },
    {
      Header: "แหล่งข้อมูล",
      Content: [
        { title: "EN KKU", link: "https://www.instagram.com/p/C-JMHWLOMvx/" },
        { title: "บล็อก", link: "https://www.instagram.com/p/DFHt5zrzdBe/" },
        { title: "กิจกรรม", link: "https://www.instagram.com/p/DNFmyihTA4s/" },
        { title: "ข่าว", link: "https://www.instagram.com/p/DAGYo6vz9LA/" },
      ],
    },
    {
      Header: "ช่วยเหลือ",
      Content: [
        { title: "คำถามที่พบบ่อย", link: "https://www.instagram.com/p/DG1DtrSxsaE/" },
        { title: "รีวิว", link: "https://www.instagram.com/p/DUYqD4XEtg6/" },
        { title: "วิธีใช้งาน", link: "https://help.dododex.com/en/article/how-to-tame-dinosaurs-in-ark-survival-evolved-beginners-guide" },
        { title: "รายงานปัญหา", link: "https://www.instagram.com/p/DUmafZSASiJ/" },
      ],
    },
  ];

  return (
    <footer className={styles.blog}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.left_heading}>
            <div>
              EN.<span>W</span>
            </div>
          </div>
          <div className={styles.left_links}>
            <div className={styles.left_text}>DEVELOP</div>
            <div className={styles.left_logoes}>
              <div>
                <Link
                  href={
                    "https://github.com/Coe-Workshop/coe-workshop.github.io/tree/dev/public"
                  }
                  key={"github"}
                >
                  <Image
                    src={`github.svg`}
                    alt="github"
                    width={30}
                    height={30}
                    className={styles.logo}
                  />
                </Link>
              </div>
              <Link
                href={
                  "https://github.com/Coe-Workshop/coe-workshop.github.io/tree/dev/public"
                }
                key={"facebook"}
              >
                <Image
                  src={`facebook.svg`}
                  alt="facebook"
                  width={30}
                  height={30}
                  className={styles.logo}
                />
              </Link>
              <Link href={"https://facebook.com"} key={"mail"}>
                <Image
                  src={`mail.svg`}
                  alt="mail"
                  width={30}
                  height={30}
                  className={styles.logo}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {aboutListTh.map((item, index) => (
            <div key={index} className={styles.right_blog}>
              <h2 key={`header-${index}`} className={styles.right_heading}>
                {item.Header}
              </h2>
              <div className={styles.right_content}>
                {item.Content &&
                  item.Content.map((contentItem, contentIndex) => (
                    <Link href={contentItem.link} key={contentIndex}>
                      <h3>{contentItem.title}</h3>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.endline}>
        <hr></hr>
      </div>
    </footer>
  );
};

export default Footer;
