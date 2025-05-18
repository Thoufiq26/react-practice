import axios from "axios";
import React, { useEffect, useState } from "react";
import './ImageDB.css'
function ImageDB() {
  const [image, setImage] = useState(null);

  const [allImage, setAllImage] = useState(null);

  useEffect(()=>{
    getImage()
  })

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }; 
  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("http://localhost:3000/data", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

 const getImage = async () => {
    try {
        const result = await axios.get('http://localhost:3000/get-image');
        console.log('Response:', result.data);
        setAllImage(result.data.data);
    } catch (err) {
        console.error('Error fetching images:', err.message);
    }
};

  return (
    <div>
      <form action="" encType="multipart/form-data" method="POST" onSubmit={submitImage}>
        <label htmlFor="image">Image</label>
        <input type="file" name="image" id="image" onChange={onInputChange} />
        <button type="submit">Submit</button>
      </form>
      {allImage==null ? ' ':
      allImage.map(data=>{
        return < img src={`http://localhost:3000/uploads/${data.image} `} />
      }
      )
      }
    </div>
  );
}

export default ImageDB;
