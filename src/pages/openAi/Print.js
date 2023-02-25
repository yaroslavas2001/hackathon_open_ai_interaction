import { useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";

function Print(props) {
  const text = [
    {
      id: 0,
      text: "Lorem"
    },
    {
      id: 1,
      text: "Lorem 1"
    },
    {
      id: 2,
      text: "Lorem 2"
    },
  ]
  let downloadimage = () => {
    // var container = document.getElementById("image-wrap");
    /*specific element on page*/
    var container = document.getElementById("htmltoimage");; /* full page */
    html2canvas(container, { allowTaint: true,  useCORS: true, logging:true}).then(function (canvas) {
      //  useCORS: true, logging:true
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "html_image.jpg";
      link.href = canvas.toDataURL('image/pdf');
      link.target = '_blank';
      link.click();
    });


  }
  // const ref = useRef(null)
  // const filter = (node) => {
  //   // if (node) console.log("img", node)
  // }
  // const onButtonClick = useCallback(() => {
  //   if (ref.current === null) {
  //     return
  //   }

  //   toPng(ref.current, { cacheBust: true, filter: filter })
  //     .then((dataUrl) => {
  //       const link = document.createElement('a')
  //       link.download = 'my-image-name.png'
  //       link.href = dataUrl
  //       link.click()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [ref])

  let diw = props.images.map((el, index) => {
    return (
      <div className="page" key={index}>
        {/* {el} crossOrigin='Anonymous'*/}
        <img src={el} className="image" alt="image" crossOrigin='Anonymous'></img>
        <p className="text">{text[index].text}</p>
      </div>
    )
  })
  return (
    <main >
      {/* <div id="htmltoimage" className="row">
        {diw}
      </div> */}
      <div id='htmltoimage'>
        {diw}
        {/* DOM nodes you want to convert to PNG */}
      </div>
      {/* <button onClick={onButtonClick}>Click me</button> */}
      <button onClick={downloadimage}>Save</button>
    </main>
  );
}

export default Print;
