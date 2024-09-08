"use client";
import NavBar from "./NavBar";
import Categories from "./Categories";
import ItemsDisplay from "./ItemsDisplay";
import AdDisplay from "./AdDisplay";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Home() {

  async function handleClick() {


    const res = await axios.get("http://localhost:8080/auth/home");
    console.log(res.data.message);

    // const data = res.data();
  }
  return (
    <>
      <NavBar />
      <AdDisplay imageUrl={'https://opensooqui2.os-cdn.com/prod/public/images/homePage/spotlight/desktop/en/11-v2.webp'} altText={'AD'} />
      <Categories />
      <ItemsDisplay />

      <Button onClick={handleClick}> Testing Something </Button>
    </>
  );
}
