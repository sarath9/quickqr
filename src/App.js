import QRCode from 'qrcode'
import { useState } from 'react'
import { SketchPicker } from 'react-color';
import image from './img/quickqr.jpg'


function App() {
  const [url, setUrl] = useState('')
  const [quickQr, setQuickQr] = useState('')
  const [error, setError] = useState(null)
  const [color, setColor] = useState('#18978f')
  const [customWidth, setCustomWidth] = useState(800)
  const [isColorpaletOpen, setIsColorpaletOpen] = useState(false)
  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };
  const GenerateQRCode = () => {
    QRCode.toDataURL(url, {
      width: customWidth,
      margin: 1,
      color: {
        dark: color,
        light: '#ffffff'
      }
    }, (err, url) => {
      if (err) return setError(err)
      setQuickQr(url)
    })
  }

  return (
    <>
      <div className='nav'>
        <h1 className='title'>Quick QR</h1>
      </div>

      <div className='container'>
        <div className='left'>
          <div className='d-flex m-20'>
            <form className='form-main'>
<span className='mb-5'> Website URL</span>
            <input type="text" className='url' placeholder="e.g. https://google.com"
              value={url}
              onChange={e => setUrl(e.target.value)} />
</form>

          </div>
          <div className='d-flex m-20'>
          <form className='form-main'>
            <input type='number' className='url'  placeholder='Width and color for Download image' onChange={(e) => setCustomWidth(e.target.value)} />
            </form>
            <div>
              <div className='colorBox' style={{ backgroundColor: color }} onClick={() => setIsColorpaletOpen(() => !isColorpaletOpen)}></div>
              {
                isColorpaletOpen &&
                <>
                  <div className='popover'>
                    <SketchPicker
                      color={color}
                      onChangeComplete={handleChangeComplete}
                    />
                  </div>
                  <div className='cover' onClick={() => setIsColorpaletOpen(() => !isColorpaletOpen)}></div>
                </>
              }
            </div>

          </div>
          <div className='d-flex m-20'>
          <button onClick={GenerateQRCode} className={`${!url ? 'btn-disable' : ''}`}>Generate</button>
          </div>
        </div>
        <div className='right'>

          {quickQr && <>
          <h2>{url}</h2>
            <img src={quickQr} />
            <a href={quickQr} download="qrcode.png">Download</a>
          </>}
          {
            !quickQr && <img src={image} width='400px' />
          }
        </div>
      </div>


    </>
  )
}

export default App