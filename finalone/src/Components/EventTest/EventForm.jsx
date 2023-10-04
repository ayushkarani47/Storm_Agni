import React, { useState } from 'react';

const EventForm = () => {
    // Define initial state for form fields
    const [formData, setFormData] = useState({
        eventName: '',
        eventDescription: '',
        eventPoster: '',
        eventAttachment: '',
        eventType: '',
        location: '',
        maxAttendees: '',
        whatsAppLink: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        organisorName: '',
        organisorContact: '',
        totalBudget: '',
        category: '',
        isCertified: false,
        isWalkInallowed: false,
        virtualCoins: '',
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can process the form data here
        console.log(formData);
    };

   

        return (
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSubmit}>
                {/* Event Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="eventName">
                    Event Name
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter event name"
                  />
                </div>
          
                {/* Event Description */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="eventDescription">
                    Event Description
                  </label>
                  <textarea
                    id="eventDescription"
                    name="eventDescription"
                    value={formData.eventDescription}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter event description"
                  />
                </div>
          
                {/* Event Poster (PDF Upload) */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="eventPoster">
                    Event Poster (PDF)
                  </label>
                  <input
                    type="file"
                    id="eventPoster"
                    name="eventPoster"
                    accept=".pdf"
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
          
                {/* Event Attachment (PDF Upload) */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="eventAttachment">
                    Event Attachment (PDF)
                  </label>
                  <input
                    type="file"
                    id="eventAttachment"
                    name="eventAttachment"
                    accept=".pdf"
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
          
                {/* Event Type */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="eventType">
                    Event Type (Online/Offline)
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Event Type</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
          
                {/* Location */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="location">
                    Location (Address)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter event location (address)"
                  />
                </div>
          
                {/* Max Attendees */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="maxAttendees">
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    id="maxAttendees"
                    name="maxAttendees"
                    value={formData.maxAttendees}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter maximum attendees"
                  />
                </div>
          
                {/* WhatsApp Link */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="whatsAppLink">
                    WhatsApp Link
                  </label>
                  <input
                    type="text"
                    id="whatsAppLink"
                    name="whatsAppLink"
                    value={formData.whatsAppLink}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter WhatsApp link"
                  />
                </div>
          
                {/* Start Date */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="startDate">
                    Event Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
          
                {/* Start Time */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="startTime">
                    Event Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
          
                {/* End Date */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="endDate">
                    Event End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
          
                {/* End Time */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="endTime">
                    Event End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
          
                {/* Organisor Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="organisorName">
                    Organisor Name
                  </label>
                  <input
                    type="text"
                    id="organisorName"
                    name="organisorName"
                    value={formData.organisorName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter organisor name"
                  />
                </div>
          
                {/* Organisor Contact */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="organisorContact">
                    Organisor Contact
                  </label>
                  <input
                    type="text"
                    id="organisorContact"
                    name="organisorContact"
                    value={formData.organisorContact}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter organisor contact"
                  />
                </div>
          
                {/* Total Budget */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="totalBudget">
                    Total Budget
                  </label>
                  <input
                    type="text"
                    id="totalBudget"
                    name="totalBudget"
                    value={formData.totalBudget}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter total budget"
                  />
                </div>
          
                {/* Category */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                    Category (Amount)
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter category amount"
                  />
                </div>
          
                {/* Is Certified (Checkbox) */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    <input
                      type="checkbox"
                      name="isCertified"
                      checked={formData.isCertified}
                      onChange={handleChange}
                      className="mr-2 leading-tight"
                    />
                    Certified Event
                  </label>
                </div>
          
                {/* Is Walk-In Allowed (Checkbox) */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    <input
                      type="checkbox"
                      name="isWalkInallowed"
                      checked={formData.isWalkInallowed}
                      onChange={handleChange}
                      className="mr-2 leading-tight"
                    />
                    Walk-In Allowed
                  </label>
                </div>
          
                {/* Virtual Coins */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="virtualCoins">
                    Virtual Coins
                  </label>
                  <input
                    type="text"
                    id="virtualCoins"
                    name="virtualCoins"
                    value={formData.virtualCoins}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter virtual coins"
                  />
                </div>
          
                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          );
};

export default EventForm;
