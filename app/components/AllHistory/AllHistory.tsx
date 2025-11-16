'use client'
import HistoryCard from "../HistoryCard/HistoryCard";
import { useState } from "react";

const imageList = [
    "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
    "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
    "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
    "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
    "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
]

const mock_from_api = {
  "transactions": [
    {
      "email": "kritsada.ba@kkumail.com",
      "toolList": [
        { "name": "Arduino", "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png", "quantity": 5 },
        { "name": "Hammer", "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png", "quantity": 1 }
      ],
      "status": "pending",
      "startDay": "2025-11-17T10:00:00.000Z"
    },
    {
      "email": "kritsada.ba@kkumail.com",
      "toolList": [
        { "name": "Saw", "image": "/saw.png", "quantity": 2 }
      ],
      "status": "returned",
      "startDay": "2025-11-15T14:30:00.000Z"
    }
  ]
}

const emai = "kritsada.ba@kkumail.com"
const transaction:Transaction = {
    toolList: [
        { "name": "Arduino", "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png", "quantity": 5 },
        { "name": "Hammer", "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png", "quantity": 1 },
        { "name": "Hammer", "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png", "quantity": 1 }
      ],
      status: "returned",
      startDay: "2025-11-17T10:00:00.000Z"
}


function AllHistory() {
    const [open, setOpen] = useState<boolean>(false);
    return(
        <>
            <HistoryCard setShowHiddenTimestamp={setOpen} showHiddenTimestamp={open} email={emai} transaction={transaction}></HistoryCard>
        </>

    );
};

export default AllHistory;