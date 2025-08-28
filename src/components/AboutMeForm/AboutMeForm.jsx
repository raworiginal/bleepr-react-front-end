import { useState, useEffect } from "react";
import * as bleeprService from "../../services/bleeprService";
import styles from "./AboutMeForm.module.css";

const AboutMeForm = (props) => {
    const { profile } = props
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("")
    const [openTo, setOpenTo] = useState([]);
    const [notOpenTo, setNotOpenTo] = useState([]);
    const [relationshipStatus, setRelationshipStatus] = useState([])
    const [aboutMe, setAboutMe] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedProfile = {
            name,
            age,
            gender,
            location,
            bio,
            openTo,
            notOpenTo,
            relationshipStatus,
            aboutMe
        }

    };

    return (
        <form className={styles.editForm} onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            </label>

            <label>
                Age:
                <input type="number" value={age} onChange={(event) => setAge(event.target.value)} />
            </label>

            <label>
                Gender:
                <input type="text" value={gender} onChange={(event) => setGender(event.target.value)} />
            </label>

            <label>
                Location:
                <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
            </label>

            <label>
                Bio:
                <textarea value={bio} onChange={(event) => setBio(event.target.value)} />
            </label>

            <label>
                Relationship Status:
                <select value={relationshipStatus} onChange={(event) => setRelationshipStatus(event.target.value)}>
                    <option value="">Select...</option>
                    <option value="single">Single</option>
                    <option value="in a relationship">In a relationship</option>
                    <option value="married">Married</option>
                    <option value="it's complicated">It's complicated</option>
                    <option value="open">Open</option>
                </select>
            </label>

            <label>
                About Me:
                <textarea value={aboutMe} onChange={(event) => setAboutMe(event.target.value)} />
            </label>

            <button type="submit">Save</button>
        </form>
    );
}


export default AboutMeForm;