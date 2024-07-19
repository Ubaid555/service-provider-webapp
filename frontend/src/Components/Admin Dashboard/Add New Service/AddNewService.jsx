import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import AdminNavbar from "../Admin Navbar/AdminNavbar";
import Footer from "../../Footer/Footer";
import styles from "./AddNewService.module.css";
import { storage } from '../../Firebase/firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminNewServiceModal from '../../AllModals/AdminNewServiceModal/AdminNewServiceModal'; // Import the modal component

const AddNewService = () => {
  const [title, setTitle] = useState('');
  const [sname, setSname] = useState('');
  const [description, setDescription] = useState('');
  const [imgsrc, setImgsrc] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    document.title = "Trusty Taskers - Add New Service";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Firebase storage
      const imageRef = ref(storage, `images/${imgsrc.name}`);
      await uploadBytes(imageRef, imgsrc);
      const imgURL = await getDownloadURL(imageRef);

      // Prepare data to send to backend
      const formData = {
        imgsrc: imgURL,
        title,
        sname,
        description,
      };

      // Send POST request to backend API
      const response = await fetch('http://localhost:5001/api/admin/setService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if(response.status === 400){
        // console.log(data.error);
        toast.error(data.error);
      }
      else{
        // console.log("Service Successfully Added");
        toast.success("Service Successfully Added");
        setShowModal(true); // Show the modal on successful service addition
        setTitle('');
        setSname('');
        setDescription('');
        setImgsrc(null);
      }

    } catch (error) {
      console.error('Error adding service:', error.message);
      // Optionally, handle errors and notify user
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImgsrc(e.target.files[0]); // Store selected image file
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <AdminNavbar />
      <ToastContainer />
      <h1 className={styles.headers}>Add New Service</h1>
      <div className={styles.all_content}>
        <div className={styles.addNewServiceContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.imageContainer}>
              <img src="/Images/addnew.jpg" alt="Service Illustration" className={styles.serviceImage} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="sname" className={styles.label}>Service Name</label>
                <input
                  type="text"
                  id="sname"
                  value={sname}
                  onChange={(e) => setSname(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.textareaField}
                  required
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="imgsrc" className={styles.label}>Upload Image</label>
                <input
                  type="file"
                  id="imgsrc"
                  onChange={handleImageChange}
                  accept="image/*"
                  className={styles.fileInput}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Add Service
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <AdminNewServiceModal show={showModal} onClose={handleCloseModal} /> {/* Add the modal component */}
    </>
  );
};

export default AddNewService;

