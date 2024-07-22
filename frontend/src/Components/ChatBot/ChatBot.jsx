import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "./ChatBot.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// import ChatBox from "../ChatBox/ChatBox";


const ChatBot = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello! How may I assist you with our marketplace or services?",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: `
        You are an assistant for a service provider marketplace web app. Only respond to queries related to the web app, its services, user support, and other relevant information. If a query is unrelated, respond politely with 'I'm here to assist with queries related to our marketplace and services. Please ask something related to that.'
        `,
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch('http://localhost:5001/api/chat/openAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from backend');
      }

      const data = await response.json();
      const chatGPTResponse = data.choices[0].message.content;

      setMessages([
        ...chatMessages,
        { message: chatGPTResponse, sender: "ChatGPT", direction: "incoming" },
      ]);
      setTyping(false);
    } catch (error) {
      console.error("Error fetching response from OpenAI API:", error);
      setTyping(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="chatbot-container">
        <div className="landing-page">
          {/* Left Side (Landing Page) */}
          <h2>
            Welcome to <span className="trusty-span">Trusty Tasker's</span>{" "}
            ChatBot!
          </h2>
          <p>
            Our ChatBot is here to assist you with any questions related to our
            marketplace and services.
          </p>
          <img src="Images/chatbot2.png" alt="ChatBot Landing Img" />
        </div>
        <div className="chatbot-interface">
          {/* Right Side (ChatBot Interface) */}
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  typing ? <TypingIndicator content="ChatGPT is typing" /> : null
                }
              >
                {messages.map((message, i) => (
                  <Message
                    key={i}
                    model={message}
                    className={message.sender === "ChatGPT" ? "chatgpt-message" : "user-message"}
                  />
                ))}
              </MessageList>
              <MessageInput
                placeholder="Type your message here"
                onSend={handleSend}
                className="message-input"
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
      {/* <ChatBox/> */}
      <Footer />
    </>
  );
};

export default ChatBot;