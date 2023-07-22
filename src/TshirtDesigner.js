import React, { useState } from "react";

const TshirtDesigner = () => {
  const [inputText, setInputText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerateImage = async () => {
    try {
      const API_BASE_URL = "https://api.replicate.ai/v1/jobs/";
      const API_TOKEN = process.env.REACT_APP_REPLICATE_API_TOKEN;
      const MODEL_VERSION = "prompthero/openjourney:ad59ca21177f9e217b9075e7300cf6e14f7e5b4505b87b9689dbd866e9768969";

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          version: MODEL_VERSION,
          input: {
            text: inputText,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Poll for results (you can customize the polling interval and max tries)
      const result = await pollForResult(data.id);
      setImageUrl(result.output.image);

      // You can also set up a webhook to be notified when the prediction is complete
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const pollForResult = async (jobId, tries = 0, maxTries = 10, interval = 2000) => {
    if (tries >= maxTries) {
      throw new Error("Exceeded maximum number of tries to get the result.");
    }

    try {
      const response = await fetch(`https://api.replicate.ai/v1/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_REPLICATE_API_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.status === "completed") {
        return data.result;
      } else {
        await new Promise((resolve) => setTimeout(resolve, interval));
        return pollForResult(jobId, tries + 1, maxTries, interval);
      }
    } catch (error) {
      throw new Error("Error polling for result:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text here"
      />
      <button onClick={handleGenerateImage}>Generate T-Shirt Design</button>
      {imageUrl && <img src={imageUrl} alt="T-Shirt Design" />}
    </div>
  );
};

export default TshirtDesigner;
