import { useState } from "react";

function ChatGPTtext(props) {

    const [text, setText] = useState(props.text)
    console.log("test", text)
    let doneText = text.split("/n")
    console.log("test text", doneText)

    return (
        <div>
            {text}
        </div>
    );
}

export default ChatGPTtext;
