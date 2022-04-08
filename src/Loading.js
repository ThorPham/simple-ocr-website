import React from 'react'
import { TailSpin } from "react-loader-spinner";
import "./Loading.css"

export default function Loading() {
  return (
   <div className="loading">
   <TailSpin
     height="100px"
     width="100px"
     color="rgb(38, 153, 251)"
     ariaLabel="loading"
   />
 </div>
  )
}
