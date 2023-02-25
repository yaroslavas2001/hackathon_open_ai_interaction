import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

function ChatGPTtext() {
    const [message, setMessage] = useState('')
    const [response, setRespones] = useState('')

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const DEFAULT_PARAMS = {
            "model": "text-davinci-003",
            "prompt": `${message}`,
            "max_tokens": 1000,
            "temperature": 0,
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String("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")
            },
            body: JSON.stringify(DEFAULT_PARAMS)
        };
        const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
        const data = await response.json();
        console.log("data", data)
        setRespones(data.choices[0].text)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <button type="submit">onSubmit</button>
            </form>
            <span style={{ 'whiteSpace': 'pre-line' }}>{response}</span>
        </div>
    );
}

export default ChatGPTtext;
