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

const BASE_URL = process.env.REACT_APP_BASE_URL;


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
      You are an assistant for a service provider marketplace web app. Only respond to queries related to the web app,greeting messages, its services, user support, and other relevant information. If a query is unrelated, respond politely with 'I'm here to assist with queries related to our marketplace and services. Please ask something related to that.'
    
      Respond politely and appropriately to greeting messages such as "Hello", "Hi", "Good morning", "Good afternoon", "Good evening", and "How are you?"
      
      Here's an overview of the web app's structure and functionalities:

      The name of website is Trusty Taskers
      Initially six services offering named as Carpenter, Plumber, Electrician, Cable Operator, Carpenter and Mechanic
    
      1. *Registration/Login:* Users must register or log in to access the web app. There is also a "Forgot Password" link on the login page for users to reset their password using an OTP.
    
      2. *Main Sections:*
         - *Home*
         - *About Us*
         - *Contact Us*
         - *Dashboard*
         - *Services* (Dropdown: My Services, View Services, Add Services)
           - *My Services:* Users can view, update, and delete their offered services.
           - *View Services:* Users can browse all available services (e.g., plumber, electrician) and book services from listed providers.
           - *Add Services:* Users can offer new services, which then appear in the My Services section for further management.
    
      3. *Dashboard Sections:*
         - *Overview:* General history of all offered, requested, confirmed, and completed services. Below the general history, there are account balance details with total balance, pending withdraw, and total withdraw. Users can request a withdrawal by selecting a payment method (JazzCash or EasyPaisa) and providing necessary details. Only one withdrawal request is allowed at a time, and users can view withdrawal details.
         - *Booking Requests:* History of bookings requested from others, categorized as Pending, Confirmed, Completed, Cancelled, Dispute, and Refund. Users can open disputes for services not provided, and the admin can refund or complete the booking based on the provided descriptions and images.
         - *Pending Requests:* Contains the service history of the service provider, including all statuses.Here Service Provider able to acept new service Complete the Ongoing service by putting the Completion Image.
    
      4. *Messaging:* Users can message service providers directly from their service offering page. Messages are saved in a conversation component accessible from the right of every page.
    
      5. *Profile Icon:* Located on the right of the navbar with dropdowns for:
         - *View Profile:* Users can see thetotal number of services they have offered, requested, and completed.
         - *Update Password:* Users can update their password.
         - *Logout*
    
      Provide clear and concise answers based on the above information when addressing user queries.
      `,
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(`${BASE_URL}/chat/openAI`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from backend");
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
                  typing ? (
                    <TypingIndicator content="ChatGPT is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => (
                  <Message
                    key={i}
                    model={message}
                    className={
                      message.sender === "ChatGPT"
                        ? "chatgpt-message"
                        : "user-message"
                    }
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
