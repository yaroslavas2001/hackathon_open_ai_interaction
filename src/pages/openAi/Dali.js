import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { InputBox } from "./InputBox";
import style from "./style.module.css"
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
        'OpenAI-Organization': 'org-AgXJc26Nm6yxMI5j9Vk4sz9f'
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
        props.saveImage(test[0])
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
    <main className={style.block}>
      <div>
      <div>Запрос для картинки:</div>
      <div style={{ backgroundColor: 'red', color: 'white' }}>{error}</div>
      {/* <InputBox label={"Description"} setAttribute={setUserPrompt} /> */}
      <textarea value={userPrompt} className={style.textarea} onChange={(e) => setUserPrompt(e.target.value)}></textarea>

      <button className={style.btn}  onClick={() => handleSubmit()} onBlur={()=>props.isWaitImage}>
        Загрузить картинку
      </button>
      </div>
   

    </main>
  );
}

export default Dali;
