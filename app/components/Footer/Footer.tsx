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
        { title: "รายการ", link: "/" },
      ],
    },
    {
      Header: "เกี่ยวกับ",
      Content: [
        { title: "เว็บไซต์", link: "/" },
        { title: "ผู้ชี้แนะ", link: "" },
        { title: "ผู้พัฒนา", link: "/" },
      ],
    },
    {
      Header: "แหล่งข้อมูล",
      Content: [
        { title: "EN KKU", link: "/" },
        { title: "บล็อก", link: "/" },
        { title: "กิจกรรม", link: "/" },
        { title: "ข่าว", link: "/" },
      ],
    },
    {
      Header: "ช่วยเหลือ",
      Content: [
        { title: "คำถามที่พบบ่อย", link: "/" },
        { title: "รีวิว", link: "/" },
        { title: "วิธีใช้งาน", link: "/" },
        { title: "รายงานปัญหา", link: "/" },
      ],
    },
  ];

  return (
    <div className={styles.blog}>
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
              <h3 key={`header-${index}`} className={styles.right_heading}>
                {item.Header}
              </h3>
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
    </div>
  );
};

export default Footer;
