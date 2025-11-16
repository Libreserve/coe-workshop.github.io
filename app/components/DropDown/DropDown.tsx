'use client'
import {use, useEffect, useState} from "react";
import styles from "./DropDown.module.scss"
import Image from "next/image";
function DropDown({value, onChange}:DropDown) {
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState("");
    const states = ["รออนุมัติ", "ระหว่างใช้", "ปฎิเสธ", "คืนแล้ว"]
    return (
        <>
            <div className={styles.dropdown}>
                <button className={styles.link} onClick={() => {setActive(!active);}}>
                    <div>
                        {value || "Pick Value"}
                    </div>
                    <Image
                        src={"arrow2.svg"}
                        alt={""}
                        width={20}
                        height={20}
                    >
                    </Image>
                </button >
                <div className={`${styles.dropdown_menu}${ active ? "_active" : ""}`}>
                    {
                        states.map((state, index) => { return(
                            <div 
                            key={`${index}-item`} 
                            className={`${styles.item}${state === value ? "_selected" : ""}`} 
                            onClick={() => {setSelected(state); onChange?.(state)}}
                            > 
                            {state} 
                            </div>
                        )})
                    }
                </div>
                
            </div>  
        </>
    );
};

export default DropDown;