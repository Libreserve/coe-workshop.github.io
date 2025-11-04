import React from 'react';
import styles from "@/app/page.module.scss";
import All_tools from "@/app/components/All_tools/All_tools";
function tools(){
    return (
        <div className={styles.landing}>
            <All_tools></All_tools>
        </div>
    );
}
export default tools;