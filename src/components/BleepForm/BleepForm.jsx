import { useState } from "react"

const BleepForm = (props) => {
  const [formData, setFormData] = useState({
    text: "",
    hashtags: [],
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleAddBleep(formData)
  };


  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">bleep:</label>
        <input
          required
          type="text"
          name="text"
          id="bleep"
          maxLength={128}
          value={formData.text}
          onChange={handleChange}
        />
        
        <label htmlFor="hashtags">hastags#</label>
        <input
          type="text"
          name="hashtags"
          id="hashtags"
          maxLength={128}
          value={formData.hastags}
          onChange={handleChange}
        />
        <button type="submit">Submit Bleep</button>
      </form>
    </main>
  )

}

export default BleepForm;