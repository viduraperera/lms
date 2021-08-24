import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../../actions/Events";
import 'antd/dist/antd.css';
//import "./Notices.css";
//import Lottie from 'react-lottie';
//import noticeAnimation from './notice.json';
import { DatePicker } from "antd";

const AddEvent = () => {

    const dispatch = useDispatch();

    const [eventData, setEventData] = useState({
        title: '',
        date: '',
        time: '',
        description: '',
        venue: ''
    })

    const handleSubmit = async (e) => {

        //deletes data in input fields after hitting submit button
        e.preventDefault();

        const passData = {
            title: eventData.title,
            date: eventData.date,
            time: eventData.time,
            description: eventData.description,
            venue: eventData.venue
        }
        const res = await dispatch(createEvent({...passData}));
        setEventData({title: '', date: '', time: '', description: '', venue: ''});
    }

    //animation
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: noticeAnimation,
    //     rendererSettings: {
    //       preserveAspectRatio: "xMidYMid slice"
    //     }
    //   };

    return (
        <div className={"container"}>
            <h1 className="display-5 text-center my-5" fw-bold text-white >Create Notice</h1>
            <form className="rounded border p-5 bg-light w-75 d-flex flex-column mx-auto mb-4">
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="titleLabel" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="titleLabel"
                            value={eventData.title}
                            onChange={(e) => setEventData({...eventData, title: e.target.value})}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="dateLabel" className="form-label">
                            Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateLabel"
                            value={eventData.date}
                            onChange={(e) =>setEventData({...eventData, date: e.target.value})}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="timeLabel" className="form-label">
                           Time
                        </label>
                        <input
                            type="time"
                            className="form-control"
                            id="timeLabel"
                            value={eventData.time}
                            onChange={(e) =>setEventData({...eventData, time: e.target.value})}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="venueLabel" className="form-label">
                           Venue
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="venueLabel"
                            value={eventData.venue}
                            onChange={(e) =>setEventData({...eventData, venue: e.target.value})}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="descriptionLabel" className="form-label">
                           Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="descriptionLabel"
                            value={eventData.description}
                            onChange={(e) =>setEventData({...eventData, description: e.target.value})}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
            
        
    );
}

export default AddEvent;