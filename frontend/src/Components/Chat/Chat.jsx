// import React, { useState, useEffect } from "react";
// import styles from "./Chat.module.css";
// import ReactScrollToBottom from "react-scroll-to-bottom";
// import { useLocation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const Chat = () => {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);
//     const [serviceTakerImage, setServiceTakerImage] = useState("");
    
//     const location = useLocation();
//     const { serviceProviderId, serviceTakerId, serviceProviderImage } = location.state || {};

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("loginusers"));
//         if (storedUser && storedUser._id) {
//           setServiceTakerImage(storedUser.profilePic);
//         }
//     }, []);

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
//                 setMessage(""); // Clear the message input after sending
//                 setMessages(prevMessages => [...prevMessages, { senderId: serviceTakerId, content: data.message }]);
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

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault(); // Prevent default behavior of form submission
//             send();
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
//                         <div key={i} className={`${styles.message} ${msg.senderId === serviceTakerId ? styles.right : styles.left}`}>
//                             <img 
//                                 src={msg.senderId === serviceTakerId ? serviceTakerImage : serviceProviderImage} 
//                                 alt="Avatar" 
//                                 className={styles.avatar} 
//                             />
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
//                         onKeyPress={handleKeyPress} // Call handleKeyPress on key press
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
// import { useLocation,useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from "../Navbar/Navbar";
// import Footer from '../Footer/Footer';

// import io from 'socket.io-client';


// const socket = io('http://localhost:5001');


// const Chat = () => {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);
//     const [serviceTakerImage, setServiceTakerImage] = useState("");
    
//     const location = useLocation();
//     const { serviceProviderId, serviceTakerId, serviceProviderImage } = location.state || {};

//     const navigate = useNavigate();
  
//     useEffect(() => {
//       if (!serviceProviderId ||
//         !serviceProviderImage ||
//         !serviceTakerId)
//         {
//           navigate('/services');
//         }
//     }, []);

//     // useEffect(() => {
//     //     const fetchUserData = async (userId) => {
//     //       try {
//     //         const response = await fetch(`http://localhost:5001/api/auth/getUser?userId=${userId}`, {
//     //           method: 'GET',
//     //           headers: {
//     //             'Content-Type': 'application/json',
//     //           },
//     //         });
//     //         if (response.ok) {
//     //           const data = await response.json();
//     //           return data[0].fullName; // Return the full name from the fetched data
//     //         } else {
//     //           console.error('Failed to fetch user:', response.statusText);
//     //         }
//     //       } catch (error) {
//     //         console.error('Error fetching user:', error);
//     //       }
//     //     };
    
//     //     const handleReceiveMessage = async (message) => {
//     //       if (message.senderId) {
//     //         const senderName = await fetchUserData(message.senderId);
//     //         const currentUser = JSON.parse(localStorage.getItem('loginusers'))._id;
//     //         if (message.receiverId === currentUser) {
//     //           toast.success(`New Message From ${senderName}`);
    

//     //           const audio = new Audio('/Tones/tone.mp3');
//     //           audio.play();
              
//     //         }
//     //       }
//     //     };
    
//     //     socket.on('receiveMessage', handleReceiveMessage);
    
//     //     return () => {
//     //       socket.off('receiveMessage', handleReceiveMessage);
//     //     };
//     //   }, []);

//     useEffect(() => {
//         socket.on('receiveMessage', (message) => {
//             console.log(message.message)
//             const currentUser = JSON.parse(localStorage.getItem("loginusers"))._id;
//             if (message.receiverId === currentUser) {
//                 setMessages((prevMessages) => [...prevMessages, message.message]);
//             }
//         });

//         return () => {
//             socket.off('receiveMessage');
//         };
//     }, [serviceTakerId]);

//     useEffect(() => {
//         document.title = "Trusty Taskers - Messaging";
//       }, []);

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("loginusers"));
//         if (storedUser && storedUser._id) {
//             setServiceTakerImage(storedUser.profilePic);
//         }
//     }, []);

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
//                         content: item.message,
//                         senderId: item.senderId
//                     }));
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
//                 setMessage("");
//                 setMessages(prevMessages => [...prevMessages, { senderId: serviceTakerId, content: data.message }]);
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

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             send();
//         }
//     };

//     return (
//         <>
//         <Navbar/>
//         <div className={styles.chatPage}>
//             <ToastContainer />
//             <div className={styles.leftSection}>
//                 <img src="Images/messaging-pic.png" alt="message img"/>
//                 <h2>Trusty Tasker's <span className={styles.blackSpan}>Messaging System</span></h2>
//                 <p>Communicate with your service provider efficiently using our messaging system.</p>
//             </div>
//             <div className={styles.rightSection}>
//                 <div className={styles.chatContainer}>
//                     <div className={styles.header}>
//                         <img src="/Images/app-logo.jpeg" alt="app-logo" width="85" height="41" />
//                         <a href="/services"><img src="/Images/closeIcon.png" alt="Close" /></a>
//                     </div>
//                     <ReactScrollToBottom className={styles.chatBox}>
//                         {messages.map((msg, i) => (
//                             <div key={i} className={`${styles.message} ${msg.senderId === serviceTakerId ? styles.right : styles.left}`}>
//                                 <img 
//                                     src={msg.senderId === serviceTakerId ? serviceTakerImage : serviceProviderImage} 
//                                     alt="Avatar" 
//                                     className={styles.avatar} 
//                                 />
//                                 <p>{msg.content}</p>
//                             </div>
//                         ))}
//                     </ReactScrollToBottom>
//                     <div className={styles.inputBox}>
//                         <input 
//                             type="text" 
//                             className={styles.chatInput} 
//                             placeholder="Type your message..." 
//                             value={message} 
//                             onChange={(e) => setMessage(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <button onClick={send} className={styles.sendBtn}>
//                             Send<img src="/Images/send.png" alt="Send" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <Footer className={styles.main_foot}/>
//         </>
//     );
// }

// export default Chat;

import React, { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.css";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";
import Footer from '../Footer/Footer';

import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [serviceTakerImage, setServiceTakerImage] = useState("");
    const messagesEndRef = useRef(null); // Create a ref for the messages container

    const location = useLocation();
    const { serviceProviderId, serviceTakerId, serviceProviderImage } = location.state || {};

    const navigate = useNavigate();

    useEffect(() => {
        if (!serviceProviderId || !serviceProviderImage || !serviceTakerId) {
            navigate('/services');
        }
    }, []);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loginusers"));
        if (storedUser && storedUser._id) {
            setServiceTakerImage(storedUser.profilePic);
        }
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const conversation = JSON.parse(localStorage.getItem("loginusers"));
                const response = await fetch(`http://localhost:5001/api/messages/${conversation._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'currentuser': serviceProviderId
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
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

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            const currentUser = JSON.parse(localStorage.getItem("loginusers"))._id;
            if (message.receiverId === currentUser || message.senderId === currentUser) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [serviceTakerId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const send = async () => {
        const loginUser = JSON.parse(localStorage.getItem("loginusers"))._id
        if (message.trim() === "") {
            toast.error("Message cannot be empty");
            return;
        }

        const newMessage = {
            senderId:loginUser,
            receiverId:serviceProviderId,
            message: message,
            createdAt: new Date().toISOString()
        };

        try {
            const response = await fetch("http://localhost:5001/api/messages/send", {
                method: "POST",
                body: JSON.stringify({newMessage}),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("");
                // setMessages(prevMessages => [...prevMessages, newMessage]);
                toast.success("Message sent successfully");
            } else {
                console.error("Error sending message:", response.statusText);
                toast.error("Error sending message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Error sending message");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            send();
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.chatPage}>
                <ToastContainer />
                <div className={styles.leftSection}>
                    <img src="Images/messaging-pic.png" alt="message img" />
                    <h2>Trusty Tasker's <span className={styles.blackSpan}>Messaging System</span></h2>
                    <p>Communicate with your service provider efficiently using our messaging system.</p>
                </div>
                <div className={styles.rightSection}>
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
                                    <p>{msg.message}</p>
                                </div>
                            ))}
                            <div ref={messagesEndRef} /> {/* Add a ref to the end of the messages list */}
                        </ReactScrollToBottom>
                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                className={styles.chatInput}
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button onClick={send} className={styles.sendBtn}>
                                Send<img src="/Images/send.png" alt="Send" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer className={styles.main_foot} />
        </>
    );
};

export default Chat;
