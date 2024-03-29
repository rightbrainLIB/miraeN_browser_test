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

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
    
  const delImgFile = () => {
    if(imgRef.current.files.length > 0) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile("");
      };
    }
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
          height : {height}<br /><br />
          * 해상도는 스크롤영역 포함입니다.
        </div>
        <img
          className='testImg'
          src={imgFile}
        />
        <input
          type="file"
          accept="image/*"
          id="testImgInput"
          onChange={saveImgFile}
          ref={imgRef}
        />
        <img src={screenImg} />
        <button type='button' className='delImgBtn' onClick={delImgFile}>이미지 삭제하기</button>
      </div>
    </>
  )
}

export default App
