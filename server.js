const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("Chat Server\n");
});
const io = socketIo(server);
const originalQuestions = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is 1 + 1?", answer: "2" },
    { question: "What is 3 + 1?", answer: "4" },
    { question: "What is 5 + 1?", answer: "6" },
    { question: "What is 5 + 5?", answer: "10" },
  ];
  const one = { question: "What is 1+0?", answer: "1" };
  
  io.on("connection", (clientSocket) => {
      let remainingQues = [...originalQuestions];
      console.log("Client Connected", clientSocket.id);
      clientSocket.on("originalQues", (question) => {
        clientSocket.emit("originalClientQuestion", one);
      });
      clientSocket.on("getQuestion", (question) => {
        if (remainingQues.length > 0) {
          const randomIndex = Math.floor(Math.random() * remainingQues.length);
          const randomSingleQues = remainingQues[randomIndex];
          remainingQues.splice(randomIndex, 1);
          clientSocket.emit("clientQuestion", randomSingleQues);
        }  else {
          clientSocket.emit("noQuestion","cleared");
          clientSocket.disconnect();
          clientSocket = null;
        }
      });
      clientSocket.on('submitAnswer',(answer)=>{
          const getQuestion = originalQuestions.find((q)=>q.question==answer.question);
          if((getQuestion && getQuestion.answer == answer.answer) || (one.question == answer.question && one.answer == answer.answer)) {
              clientSocket.emit("answerResult", "Correct");
          } else {
              clientSocket.emit("answerResult","Incorrect");
          }
      })
      clientSocket.on("disconnect", () => {
        console.log("Client disconnected:", clientSocket.id);
        clientSocket.disconnect();
        clientSocket = null;
      });
  });
  
  const PORT = 12345;
  server.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
  });
  