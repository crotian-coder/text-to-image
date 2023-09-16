import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import tshirt from "./tshirt-rmbg.png"
import cap from "./cap-removebg-preview.png"
import cup from "./cup-removebg-preview.png"
import sweatshirt from "./sweatshirt.png"
// import cat from "./cat-rmbg.png"
import monkey from "./monkey-rmbg.png"
import Test2 from "./Test2"
import axios from "axios";
// import TshirtDesigner from "./TshirtDesigner";
// import axios from "axios";

function App() {
  const [prompt, setPrompt]= useState("")
  const [promptImg, setPromptImg] = useState(null);
  const [rmbgImg, setRmbgImg] = useState(null);
  const [promptBlob, setPromptBlob] = useState(null);

  const removeBg = async () => {
    const url = "https://api.remove.bg/v1.0/removebg"
    const formData = new FormData();
    formData.append("image_file", promptBlob);
    try {
      let res = await fetch(url, {
        method: "post",
        headers: {
          "X-Api-Key":"wtiAizZ2ku36qa8rL49ATdfr"
        },
        body: formData
      })
      let blob = await res.blob()
      console.log(blob, "bg blob")
      console.log(res, "res")
      let fileUrl = (window.URL || window.webkitURL).createObjectURL(blob);
      setRmbgImg(fileUrl)

    } catch (e) {
      console.log(e, "error")
    }

  }
  

  const getImage = async () => {
    const url = "https://api-inference.huggingface.co/models/prompthero/openjourney"
    try {
      let res = await fetch(url, {
        method: "post",
        body: JSON.stringify({
          "inputs": prompt
        })
      })
      let blob = await res.blob()
      console.log(blob)
      setPromptBlob(blob)
      let fileUrl = (window.URL || window.webkitURL).createObjectURL(blob);
      setPromptImg(fileUrl)
      
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    if(promptBlob){
      removeBg()
    }
  }, [promptBlob])
  

  return (
    <div className="App  flex flex-col h-screen ">
      <Navbar />
      <div className="upper  h-[60%] flex flex-row items-center px-5 py-5" >
        <div className="upper-left w-1/5 flex flex-col justify-center items-center h-2/3 gap-5">
          <textarea value={prompt} onInput={e => setPrompt(e.target.value)} placeholder="prompt..." className="prompt  border border-gray-700 h-full rounded-lg text-left p-5 resize-none" />
          <button onClick={getImage} className="border-none bg-gray-700 hover:bg-gray-800 w-[100px] flex justify-center items-center rounded" >
            <span className="mb-1 text-md text-white" >get</span>
          </button>
        </div>
        <div className="upper-right  w-full flex flex-row justify-around items-center gap-5 h-full">

          <div className="upper-right-left border border-gray-500 w-full h-full rounded-lg text-center  p-5 bg-gray-700">
            {rmbgImg ? 
              <img onClick={() => setPromptImg(rmbgImg)} src={rmbgImg} className="h-full " alt="prompt-img" />
            : ""}
          </div>
          <div className="upper-right-right relative border border-gray-500 w-full h-full rounded-lg text-center flex justify-center bg-gray-700 py-2">
            <img src={tshirt} alt="tshirt" className="h-full" />
            <div className="prompt-img-container">
              {promptImg ? <img src={promptImg} className="h-[100px]" alt="prompt-img" /> : ""}

            </div>
          </div>
        </div>
      </div>
      <div className="lower  h-[60%] py-5 flex flex-row justify-around items-center">
        <div className="design border w-[220px] text-center h-full rounded-lg border-gray-500 cursor-pointer flex justify-center items-center bg-gray-700">
          <img src={cap} alt="" />
        </div>
        <div className="design border w-[220px] text-center h-full  rounded-lg border-gray-500 cursor-pointer flex justify-center items-center bg-gray-700">
          <img src={cup} alt="" />
        </div>
        <div className="design border w-[220px] text-center h-full rounded-lg border-gray-500 cursor-pointer flex justify-center items-center bg-gray-700">
          <img src={sweatshirt} alt="" />
        </div>
        <div className="design border w-[220px] text-center h-full rounded-lg border-gray-500 cursor-pointer flex justify-center items-center bg-gray-700">
          {/* <img src="" alt="" /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
