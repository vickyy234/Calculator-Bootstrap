import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [input, setInput] = useState("")

  const handleClick = (value) => {
    setInput(input + value)
  }

  const handleClear = () => {
    setInput("")
  }

  const handleBackspace = () => {
    setInput(input.slice(0, -1))
  }

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString())
    } catch (error) {
      setInput("Error")
      setTimeout(() => {
        setInput("")
      }, 1500)
    }
  }

  return (
    <div className='container text-center'>
      <h1 className='my-5 fw-bold text-primary'>Calculator</h1>
      <div className='card p-4 shadow-lg mx-auto' style={{ maxWidth: '450px', backgroundColor: "#979090" }}>
        <input type="text"
          className='form-control text-end mb-4 fs-1 fw-semibold rounded-4'
          value={input}
        />
        <div className='row g-2'>
          {["7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "⌫", "+"].map((item, index) => (
              <div className='col-3' key={index}>
                <button className={`w-100 btn btn-outline-dark py-3 shadow fw-semibold rounded-5`}
                  onClick={() => {
                    if (item === "⌫") {
                      handleBackspace();
                    } else {
                      handleClick(item);
                    }
                  }}>{item}</button>
              </div>
            ))
          }
          <div className='col-6'>
            <button className='btn btn-outline-danger w-100 py-3 fw-bold shadow rounded-5'
              onClick={() => {
                handleClear();
              }}>AC</button>
          </div>
          <div className='col-6'>
            <button className='btn btn-outline-success w-100 py-3 fw-bold shadow rounded-5'
              onClick={() => {
                handleCalculate();
              }}>=</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;