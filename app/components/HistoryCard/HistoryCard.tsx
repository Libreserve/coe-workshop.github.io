'use client'
import StatusBadge from "../StatusBadge/StatusBadge";
import AvataGroup from "../AvataGroup/AvatarGroup";
import TruncateTools from "../TruncateTools/TruncateTools";
import Image from "next/image";
import styles from "../HistoryCard/HistoryCard.module.scss";
import { useState } from "react";
import type { HistoryCardProps, ItemsProps } from "./HistoryCard.type";

const HistoryCard = ({ transaction, email }: HistoryCardProps) => {
    const [open, setOpen] = useState(false);
    const date = new Date(transaction.startDay);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const date_no = date.getDate();
    const items: ItemsProps = [];
    const imageList: string[] = [];
    const time = date.toLocaleTimeString("en-US", {hour:"2-digit", minute:"2-digit", hour12:false});

    transaction.toolList.forEach(tool => {
        items.push({ title: tool.name, quantity: tool.quantity });
        imageList.push(tool.image);
    });
    return (
        <>    
            <div className={styles.container}>
                <div className={styles.detail}>
                    <div className={styles.timestamp}>
                        <div className={styles.timestamp_left}>
                            <span className={styles.day}>
                                {day}
                            </span>
                            <span className={styles.date}>
                                {date_no}
                            </span>
                        </div>
                        <div className={styles.timestamp_right}>
                            <div className={styles.time}>
                                <Image src={"clock.svg"} alt={"clock"} width={16} height={16}></Image>            
                                <span>
                                    {time}
                                </span>
                            </div>
                            <div className={styles.gmail}>
                                <Image src={"avatar.svg"} alt={"clock"} width={16} height={16}></Image>            
                                <span>
                                    {email}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.thumnail}>
                        <div className={styles.what}>
                            <TruncateTools items={items}></TruncateTools>
                        </div>
                            <AvataGroup imageList={imageList} max={5}></AvataGroup>
                    </div>
                    </div>
                <div className={styles.status} >
                    <StatusBadge status={transaction.status}></StatusBadge>
                    <div className={styles.timestamp_right_toggle}>
                        <Image src={"info.svg"} 
                            alt={"info.svg"} 
                            width={30} height={30} 
                            className={styles.timestamp_right_toggle_image}
                            key={`${time}`}
                            onClick={() => {setOpen(!open); }}>
                        </Image>            
                        <div className={`${styles.timestamp_right_hidden}${open ? "_active" : ""}`}>
                            <span>
                                {time}           
                            </span>
                            <span>
                                {email}
                            </span>
                        </div>
                    </div>            
                </div>
            </div>
            {open && (
            <div className={styles.unfocus_overlay} onClick={() => setOpen(!open)}></div>)}
        </>
    );
};

export default HistoryCard;