// ChatbotApp.tsx

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, X, Mic, ArrowRight } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

interface Message {
  text: string;
  sender: "user" | "ai";
}

const ChatbotApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tempmessages, tempsetMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [started]);

  const fetchQuestions = async () => {
    const fetchedQuestions = [
      "What is your name?",
      "How old are you?",
      "What is your favorite color?"
    ];
    setQuestions(fetchedQuestions);
  };

  const handleStart = async () => {
    await fetchQuestions();
    setStarted(true);
  };

  const handleSendMessage = () => {
    if (!userInput.trim() && !transcript.trim()) return;

    const input = userInput || transcript;

    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    // tempsetMessages(prev => [...prev, { text: input, sender: "user" }]);
    setUserResponses(prev => [...prev, input]);
    setUserInput("");
    setLoading(true);

    setTimeout(() => {
      // here comes the logic where we will send the question and answer to backend


      const response = "Alright proceed to next question" ;
      setMessages(prev => [...prev, { text: response, sender: "ai" }]);
      setLoading(false);
      resetTranscript(); // Clear transcript only after processing
    }, 1000);
  };

  const handleVoiceInput = () => {
    SpeechRecognition.startListening();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([]);
      setUserInput("");
    } else {
      setFinished(true);
    }
  };

  // Enhanced Result Page
if (finished) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Responses</h2>
        <div className="max-h-[400px] overflow-y-auto space-y-4">
          {userResponses.map((response, index) => (
            <div key={index} className="bg-gray-700 text-white p-4 rounded-lg">
              <p className="font-semibold text-blue-300">{questions[index]}</p>
              <p className="mt-2">{response}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Restart
          </button>
        </div>
      </motion.div>
    </div>
  );
}

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={handleStart} className="bg-blue-600 text-white rounded-lg px-6 py-3">
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="h-[400px] overflow-y-auto flex flex-col space-y-4 p-4">
            <div className="text-white">{questions[currentQuestionIndex]}</div>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === "user" ? "bg-blue-600" : "bg-gray-700"} text-white`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={handleVoiceInput} 
              className={`bg-blue-600 text-white rounded-full p-2 ${listening ? "animate-pulse" : ""}`}
            >
              <Mic size={24} />
            </button>
            <input
              type="text"
              ref={messageInputRef}
              value={transcript}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white"
              placeholder="Type your answer..."
            />
            <button onClick={handleSendMessage} className="bg-blue-600 text-white rounded-full p-2">
              <Send size={24} />
            </button>
            <button onClick={handleNextQuestion} className="bg-green-600 text-white rounded-full p-2">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatbotApp;
