import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const errors = {};
    const today = new Date();
    const enteredDate = new Date(`${year}-${month}-${day}`);

    if (!day) errors.day = "This field is required";
    else if (day < 1 || day > 31) errors.day = "Must be a valid day";

    if (!month) errors.month = "This field is required";
    else if (month < 1 || month > 12) errors.month = "Must be a valid month";

    if (!year) errors.year = "This field is required";
    else if (new Date(`${year}-01-01`) > today) errors.year = "Must be in past";

    if (!errors.day && !errors.month && !errors.year) {
      if (enteredDate.toString() === "Invalid Date" || enteredDate > today) {
        errors.general = "Must be a valid date";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateAge = () => {
    if (!validateInputs()) return;

    const today = new Date();
    let birthDate = new Date(`${year}-${month}-${day}`);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div>
      <div className="content">
        <div className="inputs">
          <div>
            <input
              type="number"
              id="dayIn"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="DD"
            />
            {errors.day && <p className="error">{errors.day}</p>}
          </div>
          <div>
            <input
              type="number"
              id="monthIn"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
            />
            {errors.month && <p className="error">{errors.month}</p>}
          </div>
          <div>
            <input
              type="number"
              id="yearIn"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
            />
            {errors.year && <p className="error">{errors.year}</p>}
          </div>
        </div>
        {errors.general && <p className="error">{errors.general}</p>}

        <div className="button">
          <button id="calculateBtn" onClick={calculateAge}>
            Calculate
          </button>
        </div>

        <div>
          <div className="output">
            <p>{age.years}</p>
            <p style={{ color: "black" }}>years</p>
          </div>
          <div className="output">
            <p>{age.months}</p>
            <p style={{ color: "black" }}>months</p>
          </div>
          <div className="output">
            <p>{age.days}</p>
            <p style={{ color: "black" }}>days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
