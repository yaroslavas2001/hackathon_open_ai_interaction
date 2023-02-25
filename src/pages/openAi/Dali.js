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
  const [size, setSize] = useState("256x256");
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
        'Authorization': 'Bearer ' + String("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")
      },
      body: JSON.stringify(imageParameters)
    };
    try {
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
    }
    // const data = await response.json();

  }

  // const generateImage = async () => {
  //   const imageParameters = {
  //     prompt: userPrompt,
  //     n: parseInt(number),
  //     size: size,
  //   };
  //   // fetch("http://localhost:3000/image/", {
  //   //   method: 'POST',
  //   //   headers: { 'Content-Type': 'application/json' },
  //   //   body: JSON.stringify(imageParameters)
  //   // }).then((res) => res.json()).then((data) => console.log("data", data))

  //   try {
  //     const response = await openai.createImage(imageParameters);
  //     let test = response.data.data.map((el) => el.url)
  //     setImageUrl(test);
  //     props.saveImage(test)
  //     setError('')

  //   } catch (e) {
  //     setImageUrl([]);
  //     setError(e.response.data.error.message)
  //   }


  // };
  let images = imageUrl.map((el, index) => <img key={index} src={el}></img>)
  return (
    <main >
      <div style={{ display: 'flex' }}>
        {images}
      </div>
      <div id="print">
        <p>123</p>
      </div>
      <div style={{ backgroundColor: 'red', color: 'white' }}>{error}</div>
      <InputBox label={"Description"} setAttribute={setUserPrompt} />
      <InputBox label={"Amount"} setAttribute={setNumber} />
      <InputBox label={"Size"} setAttribute={setSize} />
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
