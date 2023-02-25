import { useRef, useCallback, useState } from "react";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import stylePrint from "./print.module.css"
import style from "./style.module.css"
import Preloader from "./Preloader";
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
      link.download = "open_ai_image.jpg";
      link.href = canvas.toDataURL('image/pdf');
      link.target = '_blank';
      link.click();
    });


  }

  // let diw = props.images.map((el, index) => {
  //   return (
  //     <div className="page" key={index}>
  //       {/* {el} crossOrigin='Anonymous'*/}
  //       <img src={el} alt="image" crossOrigin='Anonymous' className={stylePrint.print_img}></img>
  //       <p className={stylePrint.print_text}>{text}</p>
  //       {/* <p className="text">{text[index].text}</p> */}
  //     </div>
  //   )
  // })
  return (
    <div className={style.block} >
      Результат:
      <div id='htmltoimage' className={stylePrint.print_block}>
        {props.isWaitImage ? <Preloader isFetching={props.isWaitImage} /> :
          <>
            {props.images ? <img src={props.images} alt="image" crossOrigin='Anonymous' className={stylePrint.print_img}></img> : ''}
          </>
        }

        {props.isWaitText ? <Preloader isFetching={props.isWaitText} /> :
          <>
            {props.text ? <p className={stylePrint.print_text}>{props.text}</p> : ''}
          </>
        }
      </div>
      <div>
      <button className={style.btn_active} onClick={downloadimage}>Сохранить</button>
      </div>
    </div>
  );
}

export default Print;
