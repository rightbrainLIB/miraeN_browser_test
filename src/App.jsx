import { useState } from 'react';
import './App.css'
import screenImg from './img/Browser_Screen_Ratio.jpg';
import { useEffect, useRef } from 'react';

function App() {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const handleResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }


// 이미지 업로드 input의 onChange
const saveImgFile = () => {
	const file = imgRef.current.files[0];
	const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setImgFile(reader.result);
   	};
};

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return ()=> {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return (
    <>
      <div className='wrap'>
        <div className='screenSize'>
          현재 브라우저 해상도<br />
          width : {width}<br />
          height : {height}
        </div>
        <img
          className='testImg'
          src={imgFile}
          onError="this.style.visibility='hidden'"
        />
        <input
          type="file"
          accept="image/*"
          id="testImgInput"
          onChange={saveImgFile}
          ref={imgRef}
        />
      <img src={screenImg} alt='' />
      </div>
    </>
  )
}

export default App
