import React, { useState } from "react";
import axios from "axios";
import FormData from "form-data";

function App() {
  const [file, setFile] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const removeBackground = () => {
    if (!file) {
      console.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", file);
    console.log(file, "file")

    axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        "X-Api-Key": "3S6Q4JSgmpSvpnsEt9R7NPyu",
      },
      encoding: null,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.error("Error:", response.status, response.statusText);
          return;
        }
        // Convert the array buffer response to a Blob
        const blob = new Blob([response.data], { type: "image/png" });
        setResultImage(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  return (
    <div className="App">
      <h1>Remove Background</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={removeBackground}>Remove Background</button>
      {resultImage && <img src={resultImage} alt="Result" />}
    </div>
  );
}

export default App;
