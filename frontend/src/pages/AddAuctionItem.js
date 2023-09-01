import React, { useState,useRef,useEffect } from 'react';

const AddAuctionItem = () => {

  const hasEffectRun = useRef(false); // Create a ref to track whether the effect has run

  useEffect(() => {
    if (!hasEffectRun.current) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please join us to explore!");
        window.location.href = '/login'; 
        hasEffectRun.current = true; // Set the ref to true to indicate that the effect has run
      }
    }
  }, []);
  // State to store the form input values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingBid: 0,
    startTime: '',
    endTime: '',
  });

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form data to the backend
    fetch('http://localhost:8000/auction-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem("token"),
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Item visible for Auction");
        window.location.href = '/auctions';
      })
      .catch((error) => console.error('Error adding auction item:', error));
  };
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center">Add Auction Item</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="startingBid">Starting Bid</label>
                    <input
                      type="number"
                      className="form-control"
                      id="startingBid"
                      name="startingBid"
                      value={formData.startingBid}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="startTime">Start Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endTime">End Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Add Item
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AddAuctionItem;

