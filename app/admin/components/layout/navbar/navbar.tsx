"use client";
import NavSlide from "./navslide";
import { useToast } from "@/app/Context/Toast/ToastProvider";
import useDisclosure from "@/app/hook/useDisclosure";
import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { AdminProps, BlogProps, MenuMapProps } from "./types";
import { useLogoutMutation } from "@/app/lib/features/admin/authApi";
import CreateItem from "../../modal/create_item/create";
import ModalContainer from "@/app/components/ModalContainer/modalContainer";
import { useRouter } from "next/navigation";

function Navbar() {
  const { addToastStack } = useToast();
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { opened, handle } = useDisclosure();
  const { opened: createItem, handle: handlecreateItem } = useDisclosure();
  const menuMapProps: MenuMapProps[] = [
    { title: "Quick Create", path: "/admin/create" },
    { title: "Transaction", path: "/admin/transactions" },
    { title: "Tools", path: "/admin/tools" },
  ];
  const BlogList: BlogProps[] = [
    {
      cover: "/admin/navbar/transaction.svg",
      title: "Transaction",
      url: "/admin/transactions",
    },
    {
      cover: "/admin/navbar/tools.svg",
      title: "Tools",
      url: "/admin/tools",
    },
    {
      cover: "/admin/navbar/account.svg",
      title: "Account",
      url: "/admin/account",
    },
  ];

  const Admin: AdminProps = {
    profile: "/admin/navbar/admin.svg",
    title: "Admin",
    name: "username",
    email: "Email@example.com",
    icon: "/admin/navbar/meatBalls.svg",
  };
  const handlerLogout = async () => {
    try {
      await logout();
      router.push("/admin/login");
    } catch {
      addToastStack(
        "Logout ผิดพลาด",
        "กรุณาลองใหม่อีกครั้ง และหากไม่สามารถ login ได้กรุณาติดต่อผู้ดูแลระบบ",
        "error",
      );
    }
  };

  const menuBlog = BlogList.map((item, index) => {
    return (
      <Link key={index} className={styles.button_list} href={item.url}>
        <SvgIconMono
          className={styles.blog_image}
          src={`${item.cover}`}
          width={22}
          height={22}
          alt={item.title}
        ></SvgIconMono>
        <h3>{item.title}</h3>
      </Link>
    );
  });

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navbar_inner}>
          <div>
            <Link href={"/admin"} className={styles.logo}>
              <p className={styles.logo_mark}>EN</p>
              <p className={styles.logo_dot}>.W</p>
              <p className={styles.logo_status}>Admin</p>
            </Link>
          </div>
          <div className={styles.box}>
            <button
              className={styles.button_create}
              onClick={() => handlecreateItem.open()}
            >
              <Image
                className={styles.action_plus}
                width={120}
                height={120}
                alt="plus_icon"
                src="/admin/navbar/plus.svg"
              ></Image>
              <h3 className={styles.quickCreate}>Quick Create</h3>
            </button>
            <div onClick={() => handle.open()}>
              <SvgIconMono
                className={styles.action_hamberger}
                width={120}
                height={120}
                alt="hamberger_icon"
                src={`/admin/navbar/hamberger.svg`}
                fixColor={true}
              ></SvgIconMono>
            </div>
            {menuBlog}
          </div>
        </div>
        <div className={styles.tab_admin}>
          <div className={styles.admin}>
            <div>
              <p className={styles.name}>{Admin.name}</p>
              <p className={styles.email}>{Admin.email}</p>
            </div>
            <div onClick={() => handlerLogout()}>
              <SvgIconMono
                width={18}
                height={18}
                src="/admin/icon/sign-out.svg"
              ></SvgIconMono>
            </div>
          </div>
          <SvgIconMono
            className={styles.blog_icon}
            src={`${Admin.icon}`}
            width={20}
            height={20}
            alt={Admin.title}
          ></SvgIconMono>
        </div>
        <ModalContainer opened={opened} onClose={handle.close}>
          <NavSlide
            menuMapPropsList={menuMapProps}
            onClose={handle.close}
          ></NavSlide>
        </ModalContainer>
      </div>
      <div>
        <ModalContainer
          opened={createItem}
          onClose={() => handlecreateItem.close()}
        >
          <CreateItem onClose={() => handlecreateItem.close()}></CreateItem>
        </ModalContainer>
      </div>
    </>
  );
}

export default Navbar;
//
