import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import AdminNavbar from "../Admin Navbar/AdminNavbar";
import Footer from "../../Footer/Footer";
import styles from "./AddNewService.module.css";
import { storage } from '../../Firebase/firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewService = () => {
  const [title, setTitle] = useState('');
  const [sname, setSname] = useState('');
  const [description, setDescription] = useState('');
  const [imgsrc, setImgsrc] = useState(null);

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

      if(response.status==400){
        console.log(data.error);
        toast.error(data.error);
      }
      else{
        console.log("Service Successfully Added")
        toast.success("Service Successfully Added")
      }



    } catch (error) {
      console.error('Error adding service:', error.message);
      // Optionally, handle errors and notify user
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImgsrc(e.target.files[0]); // Store selected image file
    } // Added missing closing curly brace
  };

  return (
    <div className={styles.addNewServiceContainer}>
      <AdminNavbar />
      <ToastContainer />
      <h1>Add New Service</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
          <label htmlFor="sname" className={styles.label}>Service Name:</label>
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

          <label htmlFor="title" className={styles.label}>Title:</label>
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
          <label htmlFor="description" className={styles.label}>Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textareaField}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="imgsrc" className={styles.label}>Upload Image:</label>
          <input
            type="file"
            id="imgsrc"
            onChange={handleImageChange}
            accept="image/*"
            className={styles.fileInput}
            required
          />
          {/* {imgsrc && typeof imgsrc === 'string' ? (
            <img src={imgsrc} alt="Preview" className={styles.previewImage} />
          ) : (
            <img src={imgsrc ? URL.createObjectURL(imgsrc) : ''} alt="Preview" className={styles.previewImage} />
          )} */}
        </div>
        <button type="submit" className={styles.submitBtn}>
          Add Service
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddNewService;
