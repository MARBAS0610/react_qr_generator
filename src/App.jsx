import React, { useState } from 'react';
import './index.css';
import QRCode from "react-qr-code";
import html2canvas from 'html2canvas';

const download = (uri) => {
  const downloadLink = document.createElement("a");
  if (typeof downloadLink.download === "string") {
    downloadLink.href = uri;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }else{
    window.open(uri);
  }
}

const Export = () => {
  const target = document.getElementById("qrcode");
  html2canvas(target).then(canvas => {
    const targetImgUri = canvas.toDataURL("img/png");
    download(targetImgUri);
})};

function App() {
  // アプリ本体
  // usestate:変数とその値を更新する関数名のセット
  // textという変数とtextの値を更新するsetText()メソッドがあるよという意味
  const [text, setText] = useState("");
  const [inputText, setInputElement] = useState("");
  const [size, setSize] = useState("200px");
  const [sizeval, setSizeval] = useState("200px");

  // テキストの表示(関数コンポーネント)
  const printText = () => {
    if(inputText !== "") {
      setText(inputText);
      setSize(sizeval);
      // console.log(size);
    }
    else
    {
      setText("");
    }
  }

  return (
    <div>
      <div class="centering_block">
        <h1 class="centering_inline">QRコード生成</h1>
      </div>

      <div class="centering_block">
        <p class="centering_inline">
          QRコード化したい文字列を入力してください。
        </p>
      </div>

      <div class="centering_block_gray">
        {/* textarea: テキストボックス(複数行) */}
        <textarea value={inputText} onChange={(e) => setInputElement(e.target.value)} type="text" placeholder="入力してボタンを押してください。" />
      </div>
      
      {/* サイズ選択、ボタン */}
      <div class="centering_block">
        サイズ:
        <select onChange={(e) => setSizeval(e.target.value)}>
          <option value="100px">100×100</option>
          <option value="200px" selected>200×200(デフォルト)</option>
          <option value="300px">300×300</option>
        </select>

        <button onClick={printText}>表示</button>
      </div>

      {/* QRコード表示 */}
      <div class="centering_block" id='qrcode'>
        {/* textの長さが>0ならQR表示。&&使う。 */}
        {(text.length > 0) && (
        <QRCode
          // size={256}
          style={{ height: size, width: size }}
          value={text}
          viewBox={`0 0 256 256`}
        />
        )}
      </div>

      <div class="centering_block">
        {text} <br />
      </div>

      <div class="centering_block">
        <button onClick={() => Export()}>保存</button>
      </div>

    </div>
  );

}

export default App;