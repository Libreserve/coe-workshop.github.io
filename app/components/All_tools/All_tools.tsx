'use client';
import {useEffect, useState} from "react";
import Image from "next/image";
import styles from "./All_tools.module.scss";
import {Pagination} from "@mantine/core";
import "./pagination.css";
function AllToolsAction({ Url,Title,Description,Available, Quatity}:AllToolsMatches){
    return (
        <div className={styles.column_layout}>
            <div className={styles.box_products}>
                <Image
                    src={Url}
                    alt={Title}
                    width={100}
                    height={100}
                    className={styles.img}
                />
                <div className={styles.details}>
                    <h2>{Title}</h2>
                    <p>{Description}</p>
                </div>
            </div>
            <div className={styles.stoke}>
                <h3>{Available}</h3>
                <h4>/ {Quatity}</h4>
            </div>
        </div>
    );
}

function All_tools(){
    const [tools, setTools] = useState<AllToolsMatches[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemPerPage = 15;
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = tools.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tools.length / itemPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setTools(data));
    }, [])
    return(
        <div>
            <div className={styles.title_banner}>
                <div className={styles.title_layout}>
                    <h1>All Tools</h1>
                    <p>(Match with {tools.length})</p>
                </div>
                <div className={styles.icon}>
                    <Image
                        width={22}
                        height={22}
                        alt="search_icon"
                        src={"/tools/heart.png"}
                        className={styles.icon_size}
                    ></Image>
                    <Image
                        width={22}
                        height={22}
                        alt="search_icon"
                        src={"/tools/search.png"}
                        className={styles.icon_size}
                    ></Image>
                    <Image
                        width={22}
                        height={22}
                        alt="search_icon"
                        src={"/tools/bag.png"}
                        className={styles.icon_size}
                    ></Image>
                </div>
            </div>
            <div className={styles.box}>
            {currentItems.map((item, id)  => (
                <AllToolsAction
                    key={id}
                    Url={item.image}
                    Title={item.category}
                    Description={item.title}
                    Available={item.rating?.count-1 || 0} //ค่อยแก้ตอนดึงข้อมูล
                    Quatity={item.rating?.count || 0}
                ></AllToolsAction>
            ))}
            </div>
            <div className="pagination-wrapper">
                <Pagination
                    total={totalPages}
                    value={currentPage}
                    onChange={handlePageChange}
                    withControls={false}
                    siblings={1}
                    boundaries={1}
                />
            </div>
        </div>
    );
}
export default All_tools;