import React, { useState, useEffect } from "react";
import "./ConferenceForm.css"; // Import CSS for styling

interface FormData {
  fullName: string;
  email: string;
  avatar: string;
}

const ConferenceForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    avatar: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [ticketGenerated, setTicketGenerated] = useState<boolean>(false);

  useEffect(() => {
    const savedData = localStorage.getItem("conferenceForm");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("conferenceForm", JSON.stringify(formData));
  }, [formData]);

  const validateEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validateForm = (): boolean => {
    let newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.avatar.trim()) newErrors.avatar = "Avatar URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valdateForm()) {
      setTickeitGenerated(true);
      console.log("Form submitted successfully", formData);
    }
  };

  return (
    <div className="form-container">
      {!ticketGenerated ? (
        <form onSubmit={handleSubmit} className="conference-form">
          <h2>Conference Ticket Generator</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="avatar">Avatar URL:</label>
            <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} className="form-input" />
            {errors.avatar && <p className="error">{errors.avatar}</p>}
          </div>

          <button type="submit" className="submit-button">Generate Ticket</button>
        </form>
      ) : (
        <div className="ticket">
          <div className="ticket-header">
            <h3>Conference Ticket</h3>
          </div>
          <div className="ticket-body">
            <img src={formData.avatar} alt="User Avatar" className="ticket-avatar" />
            <p><strong>Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
          </div>
          <div className="ticket-footer">
            <p>Event Date: 20th July 2025</p>
            <p>Venue: Grand Hall, City Center</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferenceForm;
