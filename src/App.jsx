import { useState, useEffect } from "react";
import "./output.css";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({ text: "Loading...", author: "" });

  async function loadQuotes() {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);

      if (data.length > 0) {
        const initialQuote = data[Math.floor(Math.random() * data.length)];
        setQuote(initialQuote);
      }
    } catch (error) {
      console.error("Failed to load quotes:", error);
      setQuote({ text: "Failed to load quotes", author: "" });
    }
  }

  const random = () => {
    if (quotes.length > 0) {
      const select = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(select);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === "Enter") {
        random();
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [quotes]); 

  return (
    <div className="flex h-screen items-center bg-[#f8f5d7] font-openSans justify-center">
      <div className="h-1/2 w-[50%] flex flex-col items-center">
        <div className="text-5xl pb-10 font-semibold">Quote Generator</div>
        <div className="text-5xl font-[35px] pb-8 text-center">
          <span>＂</span>
          <span className="italic">{quote.text}</span>
          <span>＂</span>
        </div>
        <div className="line w-full h-1 bg-gray-400 mb-4"></div>
        <div className="bottom text-[20px] w-full flex flex-col items-center justify-center gap-4 font-light">
          <div className="author text-left">
            - {quote.author ? quote.author : "Unknown"}
          </div>
          <div className="icons flex space-x-4">
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-meta"></i>
            <i className="fa-solid fa-shield-halved"></i>
            <i
              className="fa-solid fa-rotate-right hover:scale-125 transition duration-150 ease-in-out cursor-pointer text-blue-900"
              onClick={random}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
