'use client'
import DatePicker from "../components/Datepicker/Datepicker";
import DropDown from "../components/DropDown/DropDown";
import AvatarGroup from "../components/AvataGroup/AvatarGroup";
import {useEffect, useState} from "react";
import TruncateTools from "../components/TruncateTools/TruncateTools";
import AllHistory from "../components/AllHistory/AllHistory";



function history() {
    const [selectedDate, setSelectedDate] = useState<Date | string |  undefined>("");
    const [what, setwhat] = useState('I herer')
    return (
        <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
            {/* <TruncateTools items={items}></TruncateTools> */}
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div></div>
        <div></div>
        <div style={{ display:'flex'}} >
            what
            {/* <DropDown value={what} onChange={(value) => {setwhat(value); console.log(value); console.log("what", what)}}></DropDown> */}
            {/* <AvatarGroup></AvatarGroup> */}
            {/* <AvatarGroup max={4} imageList={imageList}></AvatarGroup> */}
            {/* {result} */}
            <span>what the helll</span>
        </div >
            <span>what the helll</span>
            <AllHistory></AllHistory>
        </>
        
    );
}

export default history;