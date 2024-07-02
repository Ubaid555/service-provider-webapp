// import React, { useState, useEffect } from "react";
// import styles from "./Chat.module.css";
// //import Message from "../Message/Message";
// import ReactScrollToBottom from "react-scroll-to-bottom";
// import { useLocation } from "react-router-dom";

// const Chat = () => {
//     const [message,setMessage]=useState("");

//     const location = useLocation();
// const { serviceProviderId, serviceTakerId } = location.state || {};

// console.log(serviceProviderId,serviceTakerId);
//     // const messages = [
//     //     { id: 1, user: 'User A', message: 'Hello!' },
//     //     { id: 2, user: 'User B', message: 'Hi there!' },
//     //     { id: 1, user: 'User A', message: 'How are you?' },
//     // ];

//     const send = async () => {
//         let result = await fetch("http://localhost:5001/api/messages/send", {
//             method: "POST",
//             body: JSON.stringify({ serviceProviderId, serviceTakerId }), // Include both IDs
//             headers: { "Content-Type": "application/json" },
//         });

//         // Optional: handle the response
//         if (result.ok) {
//             const data = await result.json();
//             console.log("Message sent successfully:", data);
//         } else {
//             console.error("Error sending message:", result.statusText);
//         }
//     };

//     return (
//         <div className={styles.chatPage}>
//             <div className={styles.chatContainer}>
//                 <div className={styles.header}>
                    
//                     <img src="/Images/app-logo.jpeg" alt="app-logo" width="85" height="41"/>
//                     <a href="/services"> <img src="/Images/closeIcon.png" alt="Close"/></a>
//                 </div>
//                 <ReactScrollToBottom className={styles.chatBox}>
//                     {/* {messages.map((item, i) => (
//                         <Message
//                             key={i}
//                             user={item.user}
//                             message={item.message}
//                             classs={item.id === 1 ? styles.right : styles.left} // Adjust class based on user id for UI display
//                         />
//                     ))} */}
//                 </ReactScrollToBottom>
//                 <div className={styles.inputBox}>
//                     <input type="text" className={styles.chatInput} placeholder="Type your message..." />
//                     <button onClick={send} className={styles.sendBtn}>Send<img src="/Images/send.png" alt="Send" /></button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chat;





// import React, { useState, useEffect } from "react";
// import styles from "./Chat.module.css";
// import ReactScrollToBottom from "react-scroll-to-bottom";
// import { useLocation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const Chat = () => {
//     const [message, setMessage] = useState("");

//     const location = useLocation();
//     const { serviceProviderId, serviceTakerId } = location.state || {};

//     useEffect(() => {
//         console.log(serviceProviderId, serviceTakerId);
//     }, [serviceProviderId, serviceTakerId]);

//     const send = async () => {
//         if (message.trim() === "") {
//             toast.error("Message cannot be empty");
//             return;
//         }

//         let result = await fetch("http://localhost:5001/api/messages/send", {
//             method: "POST",
//             body: JSON.stringify({ serviceProviderId, serviceTakerId, message }),
//             headers: { "Content-Type": "application/json" },
//         });

//         if (result.ok) {
//             const data = await result.json();
//             console.log("Message sent successfully:", data);
//             setMessage(""); // Clear the message input after sending
//             toast.success("Message sent successfully");
//         } else {
//             console.error("Error sending message:", result.statusText);
//             toast.error("Error sending message");
//         }
//     };

//     return (
//         <div className={styles.chatPage}>
//             <ToastContainer />
//             <div className={styles.chatContainer}>
//                 <div className={styles.header}>
//                     <img src="/Images/app-logo.jpeg" alt="app-logo" width="85" height="41"/>
//                     <a href="/services"><img src="/Images/closeIcon.png" alt="Close" /></a>
//                 </div>
//                 <ReactScrollToBottom className={styles.chatBox}>
//                     {/* {messages.map((item, i) => (
//                         <Message
//                             key={i}
//                             user={item.user}
//                             message={item.message}
//                             classs={item.id === 1 ? styles.right : styles.left} // Adjust class based on user id for UI display
//                         />
//                     ))} */}
//                 </ReactScrollToBottom>
//                 <div className={styles.inputBox}>
//                     <input 
//                         type="text" 
//                         className={styles.chatInput} 
//                         placeholder="Type your message..." 
//                         value={message} 
//                         onChange={(e) => setMessage(e.target.value)} 
//                     />
//                     <button onClick={send} className={styles.sendBtn}>
//                         Send<img src="/Images/send.png" alt="Send" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chat;





// import React, { useState, useEffect } from "react";
// import styles from "./Chat.module.css";
// import ReactScrollToBottom from "react-scroll-to-bottom";
// import { useLocation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const Chat = () => {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);
    
//     const location = useLocation();
//     const { serviceProviderId, serviceTakerId } = location.state || {};

//     console.log(serviceProviderId, serviceTakerId);

//     // Fetch previous messages when the component mounts
//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5001/api/messages/${serviceProviderId}`, {
//                     method: "GET",
//                     headers: {
//                         'Content-Type': 'application/json', // Assuming the token is stored in localStorage
//                         'serviceTakerId': serviceTakerId // Add serviceTakerId as a custom header
//                     }
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
                  
//     const extractedMessages = data.map(item => item.message); 
//     console.log(extractedMessages);
                 
//                     setMessages(extractedMessages);
//                 } else {
//                     console.error("Failed to fetch previous messages:", response.statusText);
//                 }
//             } catch (error) {
//                 console.error("Error fetching previous messages:", error);
//             }
//         };

//         if (serviceProviderId && serviceTakerId) {
//             fetchMessages();
//         }
//     }, [serviceProviderId, serviceTakerId]);

//     const send = async () => {
//                 if (message.trim() === "") {
//                     toast.error("Message cannot be empty");
//                     return;
//                 }
        
//                 let result = await fetch("http://localhost:5001/api/messages/send", {
//                     method: "POST",
//                     body: JSON.stringify({ serviceProviderId, serviceTakerId, message }),
//                     headers: { "Content-Type": "application/json" },
//                 });
        
//                 if (result.ok) {
//                     const data = await result.json();
//                     console.log("Message sent successfully:", data);
//                     setMessage(""); // Clear the message input after sending
//                     toast.success("Message sent successfully");
//                 } else {
//                     console.error("Error sending message:", result.statusText);
//                     toast.error("Error sending message");
//                 }
//             };
        

//     return (
//         <div className={styles.chatPage}>
//             <ToastContainer />
//             <div className={styles.chatContainer}>
//                 <div className={styles.header}>
//                     <img src="/Images/app-logo.jpeg" alt="app-logo" width="85" height="41" />
//                     <a href="/services"><img src="/Images/closeIcon.png" alt="Close" /></a>
//                 </div>
//                 <ReactScrollToBottom className={styles.chatBox}>
//                     {messages.map((msg, i) => (
//                         <div key={i} className={msg.senderId === serviceTakerId ? styles.right : styles.left}>
//                             <p>{msg.content}</p>
//                         </div>
//                     ))}
//                 </ReactScrollToBottom>
//                 <div className={styles.inputBox}>
//                     <input 
//                         type="text" 
//                         className={styles.chatInput} 
//                         placeholder="Type your message..." 
//                         value={message} 
//                         onChange={(e) => setMessage(e.target.value)} 
//                     />
//                     <button onClick={send} className={styles.sendBtn}>
//                         Send<img src="/Images/send.png" alt="Send" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chat;


// import React, { useState, useEffect } from "react";
// import styles from "./Chat.module.css";
// import ReactScrollToBottom from "react-scroll-to-bottom";
// import { useLocation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const Chat = () => {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);
    
//     const location = useLocation();
//     const { serviceProviderId, serviceTakerId ,serviceProviderImage} = location.state || {};
//     console.log(serviceProviderImage);

//     // Fetch previous messages when the component mounts or when IDs change
//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5001/api/messages/${serviceProviderId}`, {
//                     method: "GET",
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'serviceTakerId': serviceTakerId
//                     }
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     const extractedMessages = data.map(item => ({
//                         content: item.message, // Ensure 'message' matches the field name in your API response
//                         senderId: item.senderId // Assuming you have senderId in your API response
//                     }));
//                     console.log(data);
//                     console.log(extractedMessages)
//                     setMessages(extractedMessages);
//                 } else {
//                     console.error("Failed to fetch previous messages:", response.statusText);
//                 }
//             } catch (error) {
//                 console.error("Error fetching previous messages:", error);
//             }
//         };

//         if (serviceProviderId && serviceTakerId) {
//             fetchMessages();
//         }
//     }, [serviceProviderId, serviceTakerId]);

//     const send = async () => {
//         if (message.trim() === "") {
//             toast.error("Message cannot be empty");
//             return;
//         }

//         try {
//             const result = await fetch("http://localhost:5001/api/messages/send", {
//                 method: "POST",
//                 body: JSON.stringify({ serviceProviderId, serviceTakerId, message }),
//                 headers: { "Content-Type": "application/json" },
//             });

//             if (result.ok) {
//                 const data = await result.json();
//                 console.log("Message sent successfully:", data);
//                 setMessage(""); // Clear the message input after sending
//                 toast.success("Message sent successfully");
//             } else {
//                 console.error("Error sending message:", result.statusText);
//                 toast.error("Error sending message");
//             }
//         } catch (error) {
//             console.error("Error sending message:", error);
//             toast.error("Error sending message");
//         }
//     };

//     return (
//         <div className={styles.chatPage}>
//             <ToastContainer />
//             <div className={styles.chatContainer}>
//                 <div className={styles.header}>
//                     <img src="/Images/app-logo.jpeg" alt="app-logo" width="85" height="41" />
//                     <a href="/services"><img src="/Images/closeIcon.png" alt="Close" /></a>
//                 </div>
//                 <ReactScrollToBottom className={styles.chatBox}>
//                     {messages.map((msg, i) => (
//                         <div key={i} className={msg.senderId === serviceTakerId ? styles.right : styles.left}>
//                             <p>{msg.content}</p>
//                         </div>
//                     ))}
//                 </ReactScrollToBottom>
//                 <div className={styles.inputBox}>
//                     <input 
//                         type="text" 
//                         className={styles.chatInput} 
//                         placeholder="Type your message..." 
//                         value={message} 
//                         onChange={(e) => setMessage(e.target.value)} 
//                     />
//                     <button onClick={send} className={styles.sendBtn}>
//                         Send<img src="/Images/send.png" alt="Send" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chat;


import React, { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [serviceTakerImage,setServiceTakerImage] = useState("");
    
    const location = useLocation();
    const { serviceProviderId, serviceTakerId, serviceProviderImage } = location.state || {};
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loginusers"));
        if (storedUser && storedUser._id) {
          setServiceTakerImage(storedUser.profilePic);
        }
      }, []);

    // Fetch previous messages when the component mounts or when IDs change
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/messages/${serviceProviderId}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'serviceTakerId': serviceTakerId
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    const extractedMessages = data.map(item => ({
                        content: item.message, // Ensure 'message' matches the field name in your API response
                        senderId: item.senderId // Assuming you have senderId in your API response
                    }));
                    setMessages(extractedMessages);
                } else {
                    console.error("Failed to fetch previous messages:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching previous messages:", error);
            }
        };

        if (serviceProviderId && serviceTakerId) {
            fetchMessages();
        }
    }, [serviceProviderId, serviceTakerId]);

    const send = async () => {
        if (message.trim() === "") {
            toast.error("Message cannot be empty");
            return;
        }

        try {
            const result = await fetch("http://localhost:5001/api/messages/send", {
                method: "POST",
                body: JSON.stringify({ serviceProviderId, serviceTakerId, message }),
                headers: { "Content-Type": "application/json" },
            });

            if (result.ok) {
                const data = await result.json();
                setMessage(""); // Clear the message input after sending
                setMessages(prevMessages => [...prevMessages, { senderId: serviceTakerId, content: data.message }]);
                toast.success("Message sent successfully");
            } else {
                console.error("Error sending message:", result.statusText);
                toast.error("Error sending message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Error sending message");
        }
    };

    return (
        <div className={styles.chatPage}>
            <ToastContainer />
            <div className={styles.chatContainer}>
                <div className={styles.header}>
                    <img src="/Images/app-logo.jpeg" alt="app-logo" width="85" height="41" />
                    <a href="/services"><img src="/Images/closeIcon.png" alt="Close" /></a>
                </div>
                <ReactScrollToBottom className={styles.chatBox}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`${styles.message} ${msg.senderId === serviceTakerId ? styles.right : styles.left}`}>
                            <img 
                                src={msg.senderId === serviceTakerId ? serviceTakerImage : serviceProviderImage} 
                                alt="Avatar" 
                                className={styles.avatar} 
                            />
                            <p>{msg.content}</p>
                        </div>
                    ))}
                </ReactScrollToBottom>
                <div className={styles.inputBox}>
                    <input 
                        type="text" 
                        className={styles.chatInput} 
                        placeholder="Type your message..." 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                    />
                    <button onClick={send} className={styles.sendBtn}>
                        Send<img src="/Images/send.png" alt="Send" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;