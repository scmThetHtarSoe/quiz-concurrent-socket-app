import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:12345", { transports: ["websocket"] });

const App = () => {
  const [question, setQuestion] = useState("");
  const [errMsg, setErrorMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [next, setNext] = useState(false);
  const [clear, setClear] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const buttonStyle = {
    backgroundColor: "#00695c",
  };

  const submitQues = () => {
    socket.emit("submitAnswer", { question, answer });
    socket.on("answerResult", (res) => {
      if (res == "Correct") {
        setNext(true);
      } else {
        setIncorrect(true);
      }
    });
  };

  const goNext = () => {
    setNext(false);
    socket.emit("getQuestion");
    socket.on("clientQuestion", (question) => {
      setQuestion(question.question);
    });
  };

  const clickedOk = () => {
    window.location.reload();
  };

  const stop = () => {
    socket.disconnect();
  };

  useEffect(() => {
    socket.emit("originalQues");
    socket.on("originalClientQuestion", (question) => {
      setQuestion(question.question);
    });

    socket.on("noQuestion", (res) => {
      if (res == "cleared") {
        setClear(true);
      }
    });

    socket.on("disconnectError", (res) => {
      setErrorMessage(res);
    });

    return () => {
      socket.off("clientQuestion");
    };
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container shadow w-[800px] h-[300px] p-8 border border-gray-200">
        <h1 style={{ color: "#00695c" }} className="text-center text-4xl mb-9">
          Quiz Puzzle
        </h1>
        {errMsg ? (
          <div>
            <h1>Still Progressing!!!{errMsg}</h1>
          </div>
        ) : (
          <div>
            <h2 className="text-xl">Ques:{question}</h2>
            <div className="text-xl my-3">
              <span>Ans:</span>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-[300px] border-b-2 border-grey-900 focus:border-blue-500 focus:outline-none ms-4"
                autoFocus
              />
              {next && <p>Correct!!!</p>}
              {clear && <p>Congratulations!!!You cleared up all questions</p>}
              {incorrect && <p>Incorrect!!Please Try Again Later</p>}
            </div>
            <div className="my-9 flex justify-end mr-5">
              {next && (
                <button
                  onClick={goNext}
                  style={buttonStyle}
                  className="px-2 py-1 text-white rounded-md hover:bg-white hover:text-blue-300 hover:border-2 hover:border-blue-300"
                >
                  Next
                </button>
              )}
              {!next && !clear && !incorrect && (
                <button
                  onClick={submitQues}
                  style={buttonStyle}
                  className="px-2 py-1 text-white rounded-md hover:bg-white hover:text-blue-300 hover:border-2 hover:border-blue-300"
                >
                  Submit
                </button>
              )}
              {incorrect && (
                <>
                  <button
                    onClick={stop}
                    style={buttonStyle}
                    className="px-2 py-1 text-white rounded-md hover:bg-white hover:text-blue-300 hover:border-2 hover:border-blue-300"
                  >
                    Stop
                  </button>
                  <button
                    onClick={clickedOk}
                    style={buttonStyle}
                    className="px-2 py-1 text-white rounded-md hover:bg-white hover:text-blue-300 hover:border-2 hover:border-blue-300"
                  >
                    Try Again
                  </button>
                </>
              )}
              {clear && (
                <>
                  <button
                    onClick={stop}
                    style={buttonStyle}
                    className="px-2 py-1 text-white rounded-md hover:bg-white hover:text-blue-300 hover:border-2 hover:border-blue-300"
                  >
                    Stop
                  </button>
                  <button
                    onClick={clickedOk}
                    style={buttonStyle}
                    className="px-2 py-1 text-white rounded-md hover:bg-white hover:text-blue-300 hover:border-2 hover:border-blue-300"
                  >
                    Play Again
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
