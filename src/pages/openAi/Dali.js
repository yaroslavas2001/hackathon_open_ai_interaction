import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { InputBox } from "./InputBox";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

function Dali(props) {
  const [userPrompt, setUserPrompt] = useState("");
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState("512x512");
  const [imageUrl, setImageUrl] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const imageParameters = {
      prompt: userPrompt,
      n: parseInt(number),
      size: size,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String("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"),
        'OpenAI-Organization': 'org-KtCIkY6TZ7MhbRNmAhvkkRWo'
      },
      body: JSON.stringify(imageParameters)
    };
    try {
      props.setIsWaitImage(true)
      const response = await fetch('https://api.openai.com/v1/images/generations', requestOptions);
      const data = await response.json();
      console.log("data", data)
      if (data.data) {
        let test = data.data.map((el) => el.url)
        setImageUrl(test);
        props.saveImage(test)
        setError('')
      }
    } catch (e) {
      setImageUrl([]);
      console.log("response", e.response.json())
      setError(e.response.json().error.message)
    } finally {
      props.setIsWaitImage(false)
    }
  }

  // let images = imageUrl.map((el, index) => <img key={index} src={el}></img>)
  return (
    <main >
      <div style={{ backgroundColor: 'red', color: 'white' }}>{error}</div>
      <InputBox label={"Description"} setAttribute={setUserPrompt} />
      {/* <InputBox label={"Amount"} setAttribute={setNumber} /> */}
      {/* <InputBox label={"Size"} setAttribute={setSize} /> */}
      <button className="main-button" onClick={() => handleSubmit()}>
        Generate
      </button>
      {/* <button className="main-button" onClick={() => printImage()}>
        Test print
      </button> */}
    </main>
  );
}

export default Dali;
