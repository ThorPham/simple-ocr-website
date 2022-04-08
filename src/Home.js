import React from "react";
import "./Home.css";
import { useState } from "react";
import Card from "./Card"
export default function Home() {
  const navHome = [
    {
      id: "001",
      title: "General OCR",
    },
    {
      id: "002",
      title: "Receipts",
    },
    {
      id: "003",
      title: "Credit Cards",
    },
    {
      id: "004",
      title: "Business Licenses",
    },
    {
      id: "005",
      title: "Bills",
    },
    {
      id: "006",
      title: "ID Cards",
    },
    {
      id: "007",
      title: "Business Cards",
    },
  ];
  const [navActive, setNavActive] = useState("General OCR");
  const handleNavbar = (item) => {
    setNavActive(item.title);
  };
  return (
    <div className="home-container">
      <div className="home-header">
        <h2>
          <strong
            style={{ borderBottom: "10px solid #2ed573", fontWeight: "bold" ,marginRight:"10px"}}
          >
            ThorPham 
          </strong>
          OCR
        </h2>
      </div>
      <div className="home-content">
        <ul>
          {navHome.map((item) => {
            return (
              <li
                key={item.id}
                className={item.title === navActive ? "active-nav" : ""}
                onClick={() => handleNavbar(item)}
              >
                <span>{item.title}</span>
              </li>
            );
          })}
        </ul>
           
      <Card />

      </div>
    </div>
  );
}
