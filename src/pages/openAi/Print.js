import { useRef, useCallback, useState } from "react";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import stylePrint from "./print.module.css"
function Print(props) {
  const [text, setText] = useState(props.text);
  // const [text, setText] = useState("Lorem Ipsum является текст-заполнитель обычно используется в графических, печать и издательской индустрии для предварительного просмотра макета и визуальных макетах.");

  let downloadimage = () => {
    // var container = document.getElementById("image-wrap");
    /*specific element on page*/
    var container = document.getElementById("htmltoimage");; /* full page */
    html2canvas(container, { allowTaint: true, useCORS: true, logging: true }).then(function (canvas) {
      //  useCORS: true, logging:true
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "html_image.jpg";
      link.href = canvas.toDataURL('image/pdf');
      link.target = '_blank';
      link.click();
    });


  }

  let diw = props.images.map((el, index) => {
    return (
      <div className="page" key={index}>
        {/* {el} crossOrigin='Anonymous'*/}
        <img src={el} alt="image" crossOrigin='Anonymous' className={stylePrint.print_img}></img>
        <p className={stylePrint.print_text}>{text}</p>
        {/* <p className="text">{text[index].text}</p> */}
      </div>
    )
  })
  return (
    <div >

      <div id='htmltoimage' className={stylePrint.print_block}>
                      {diw}

        {/* <img src="https://dl-media.viber.com/5/share/2/long/vibes/icon/image/0x0/324a/4525e51d3f9b1ae09cbba9d7b4600920bf878d4fd66cb1fe90c8760a1f34324a.jpg"/> */}
        {/* <p className={stylePrint.print_text}>{text}</p> */}
      </div>
      <button onClick={downloadimage}>Save</button>
    </div>
  );
}

export default Print;
