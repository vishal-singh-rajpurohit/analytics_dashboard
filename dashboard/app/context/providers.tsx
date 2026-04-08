'use client'
import React from "react";
import {APIContaxt} from "./context"
import axios from "axios";

export function ApiContext({children}: Readonly<{children: React.ReactNode}>){

    const apiInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/v1/',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        withCredentials: true
    })

    const data = {
        apiInstance
    }

    return(
        <APIContaxt.Provider value={data} >{children}</APIContaxt.Provider>
    )
}