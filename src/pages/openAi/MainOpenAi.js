import { useState } from "react";
import ChatGPT from "./ChatGPT";
import ChatGPTtext from "./ChatGPTtext";
import Dali from "./Dali";
import Print from "./Print";

function MainOpenAi() {
    const [images, setImages] = useState([]);
    const [text, setText] = useState([]);

    let saveImage = (images) => {
        setImages(images)
    }
    return (
        <div className="App">
            <ChatGPT />
            <ChatGPTtext />
            <Dali saveImage={saveImage} />
            <Print images={images}></Print>
        </div >
    );
}

export default MainOpenAi;
