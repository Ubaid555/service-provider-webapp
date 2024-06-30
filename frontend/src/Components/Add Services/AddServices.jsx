import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./AddServices.module.css";
import ServiceConfirmModal from "../AllModals/ServiceConfirmModal/ServiceConfirmModal";

const AddServices = () => {
  const [userId, setUserId] = useState("");
  const [fullName, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setImage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    document.title = "Trusty Taskers - Add Services";
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loginusers"));
    if (userData) {
      setUserId(userData._id);
      setName(userData.fullName);
      setPhone(userData.phone);
      setImage(userData.profilePic);
    }
  }, []);

  useEffect(() => {
    if (category) {
      switch (category) {
        case "Plumber":
          setDescription("Expert plumbing services for residential and commercial needs.");
          break;
        case "Electrician":
          setDescription("Professional electrical services for your home and office.");
          break;
        case "Labor":
          setDescription("General labor services for various tasks and projects.");
          break;
        case "Mechanic":
          setDescription("Skilled mechanic services for vehicle maintenance and repair.");
          break;
        case "Carpenter":
          setDescription("Quality carpentry services for furniture and construction.");
          break;
        case "Cable Operator":
          setDescription("Reliable cable operator services for seamless connectivity.");
          break;
        default:
          setDescription("");
      }
    } else {
      setDescription("");
    }
  }, [category]);

  const handleService = async () => {
    let result = await fetch("http://localhost:5001/api/services/addservice", {
      method: "post",
      body: JSON.stringify({ fullName, phone, category, price, description, userId, profilePic}),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Service has been added successfully!");
    }
  };

  const handleAddServiceClick = () => {

    if (!fullName) {
      toast.error("Name is required", {
        className: styles.custom_error_toast,
      });
      return;
    }

    if (!category) {
      toast.error("Profession is required", {
        className: styles.custom_error_toast,
      });
      return;
    }

    if (!price) {
      toast.error("Price is required", {
        className: styles.custom_error_toast,
      });
      return;
    }

    if (!description) {
      toast.error("Description is required", {
        className: styles.custom_error_toast,
      });
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmAddService = () => {
    setShowConfirm(false);
    handleService();
  };

  const handleCancelAddService = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Navbar />
      <h1 className={styles.main_heading}>Add your service here</h1>
      <section className={styles.book_container}>
        <div className={styles.contact_form}>
          <form className={styles.form}>
            <div className={styles.form_control}>
              <label className={styles.formLabel} htmlFor="profession">Profession</label>
              <select
                id="profession"
                name="profession"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select_input}
              >
                <option value="">Select a profession</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Labor">Labor</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Cable Operator">Cable Operator</option>
              </select>
            </div>

            <div className={styles.form_control}>
              <label htmlFor="price">Price</label>
              <div className={styles.price_input}>
                <span className={styles.rupee_symbol}>Rs.</span>
                <input
                  type="Number"
                  name="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div className={styles.form_control}>
              <label htmlFor="text">Enter your Description here</label>
              <textarea
                name="text"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <button
                onClick={handleAddServiceClick}
                className={styles.bookbtn}
                type="button"
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
        <div className={styles.contact_image}>
          <img src="/Images/addservice.png" alt="Booking" />
        </div>
      </section>
      <ToastContainer />
      <Footer />
      
      <ServiceConfirmModal 
        show={showConfirm} 
        onConfirm={handleConfirmAddService} 
        onCancel={handleCancelAddService} 
        message="Are you sure you want to add this service?"
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </>
  );
};

export default AddServices;