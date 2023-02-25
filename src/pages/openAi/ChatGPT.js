import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import style from "./style.module.css"
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

function ChatGPT(props) {
    const [message, setMessage] = useState('')
    const [response, setRespones] = useState('')

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const DEFAULT_PARAMS = {
            "model": "text-davinci-003",
            "prompt": `${message}`,
            "max_tokens": 500,
            "temperature": 0,
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String("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"),
                'OpenAI-Organization': 'org-KtCIkY6TZ7MhbRNmAhvkkRWo'
            },
            body: JSON.stringify(DEFAULT_PARAMS)
        };
        props.setIsWaitText(true)
        const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
        const data = await response.json();
        console.log("data", data)
        // setRespones(data.choices[0].text)
        props.setIsWaitText(false)
        props.setText(data.choices[0].text)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={style.block}>
                <div>Запрос к тексту:</div>
                <textarea value={message} className={style.textarea} onChange={(e) => setMessage(e.target.value)}></textarea>
                <button className={style.btn} type="submit" onBlur={()=>props.isWaitText}>Загрузить текст</button>
            </form>
            {/* <span style={{ 'whiteSpace': 'pre-line' }}>{response}</span> */}
        </div>
    );
}

export default ChatGPT;
