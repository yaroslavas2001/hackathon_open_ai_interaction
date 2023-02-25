import { useState } from "react";
import ChatGPT from "./ChatGPT";
import ChatGPTtext from "./ChatGPTtext";
import Dali from "./Dali";
import Print from "./Print";
import Preloader from "./Preloader"
function MainOpenAi() {
    const [images, setImages] = useState([]);
    const [text, setText] = useState('');
    const [isWaitText, setIsWaitText] = useState(false);
    const [isWaitImage, setIsWaitImage] = useState(false);

    let saveImage = (images) => {
        setImages(images)
    }
    return (
        <div className="App">
            <ChatGPT setText={setText} setIsWaitText={setIsWaitText} isWaitText={isWaitText} />
            {isWaitText ? <Preloader isFetching={isWaitText} /> : <ChatGPTtext text={text} isWaitImage={isWaitText} />}
            <Dali saveImage={saveImage} isWaitImage={isWaitImage} setIsWaitImage={setIsWaitImage} />
            {isWaitImage ? <Preloader isFetching={isWaitImage} /> : <Print images={images} text={text} isWaitImage={isWaitImage} />}

    

        </div >
    );
}

export default MainOpenAi;
