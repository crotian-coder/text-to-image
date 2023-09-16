import React, { useState } from "react";
import "./App.css";
// import TshirtDesigner from "./TshirtDesigner";
// import axios from "axios";

function Test() {
  const [prompt , setPrompt] = useState("")
  const [imgData, setImgData] = useState(null)
  const convert = async () => {
    const url = "https://api-inference.huggingface.co/models/prompthero/openjourney"
    try{
      console.log(prompt)
      let res = await fetch(url,{
        method:"post",
        body:JSON.stringify({
          "inputs":prompt
        })
      })
      let blob = await res.blob()
      console.log(blob)
      let fileUrl = (window.URL || window.webkitURL).createObjectURL(blob);
      console.log(fileUrl)
      setImgData(fileUrl)
      
    }catch(e){
      console.log(e)
    }
    
  }

  const test = () => {
    console.log("test")
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>T-Shirt Designer</h1>
      </header>
      <main style={{display:"flex", justifyContent:"center", alignItems:"center"}} >
        {/* <TshirtDesigner /> */}
        <input  style={{background:"white"}} placeholder="prompt" onChange={(e) => setPrompt(e.target.value)} value={prompt}/>
        <button onClick={convert} >
          submit
        </button>
        {imgData ? <img src={imgData} /> : ""}
        <div className="" >

        </div>

      </main>
    </div>
  );
}

export default Test;
