import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
      setTimeout(() => setInput(""), 1500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if (!isNaN(key) || key === ".") handleClick(key);
      else if (["+", "-", "*", "/"].includes(key)) handleClick(key);
      else if (key === "Enter" || key === "=") handleCalculate();
      else if (key === "Backspace") handleBackspace();
      else if (key === "Escape" || key === "c") handleClear();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  return (
    <div className="container py-5 d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="mb-4 fw-bold text-primary">React Calculator</h1>
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <input
          type="text"
          className="form-control form-control-lg text-end mb-4 border-3 border-primary fs-3 fw-semibold"
          value={input}
          readOnly
        />
        <div className="row g-2">
          {["7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "⌫", "+"].map((item, index) => (
              <div className="col-3" key={index}>
                <button
                  className="btn btn-secondary w-100 py-3 fs-5 fw-bold rounded-3"
                  onClick={() => item === "⌫" ? handleBackspace() : handleClick(item)}
                >
                  {item}
                </button>
              </div>
            ))}
          <div className="col-6">
            <button
              className="btn btn-danger w-100 py-3 fs-5 fw-bold rounded-3"
              onClick={handleClear}
            >
              AC
            </button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-success w-100 py-3 fs-5 fw-bold rounded-3"
              onClick={handleCalculate}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
