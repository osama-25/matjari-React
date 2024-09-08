"use client";
import { Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios";
export default function TestPage() {
    return <>
        <h1>HI</h1>
        <Button onClick={async () => {

            const res = await axios.get("http://localhost:8080/auth/home");
            const data = res.data;
            console.log("Data: ------------ : " + data.success + "   " + data.message);

        }}> CLICK </Button>
    </>
}