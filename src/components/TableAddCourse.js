import React, { useState, useEffect } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [newEcts, setNewEcts] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [gpa, setGpa] = useState(0);
  const [previousGpa, setPreviousGpa] = useState(0);
  const [previousCredits, setPreviousCredits] = useState(0);
  const [isNight, setNight] = useState(false);
  useEffect(() => {
    calculateGpa(data);
  }, [data]);
  function isFloat(value) {
    if (
      typeof value === "number" &&
      !Number.isNaN(value) &&
      !Number.isInteger(value)
    ) {
      return true;
    }

    return false;
  }
  function handleInputChange(event) {
    const inputValue = event.target.value;

    // Check if the input value is a valid number or a dot
    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === ".") {
      setPreviousGpa(parseFloat(inputValue));
    }
    setPreviousGpa(event.target.value);
  }
  useEffect(() => {
    // let isFloatresult = isFloat(previousGpa);

    calculateGpa(data);
  }, [previousGpa, previousCredits]);

  const calculateGpa = (data) => {
    const totalCredits =
      previousCredits + data.reduce((sum, entry) => sum + entry.ects, 0);
    let totalGradePoints = previousGpa * previousCredits;

    data.forEach((entry) => {
      let gradePoints = 0;
      if (entry.grade === "AA") {
        gradePoints = 4;
      } else if (entry.grade === "BA") {
        gradePoints = 3.5;
      } else if (entry.grade === "BB") {
        gradePoints = 3.0;
      } else if (entry.grade === "CB") {
        gradePoints = 2.5;
      } else if (entry.grade === "CC") {
        gradePoints = 2.0;
      } else if (entry.grade === "DC") {
        gradePoints = 1.5;
      } else if (entry.grade === "DD") {
        gradePoints = 1;
      } else if (entry.grade === "FF") {
        gradePoints = 0;
      }
      totalGradePoints += gradePoints * entry.ects;
    });
    if (totalGradePoints === 0 || totalCredits === 0) {
      setGpa(0);
      return;
    }
    const calculatedGpa = totalGradePoints / totalCredits;
    setTimeout(() => {
      setGpa(calculatedGpa);
    }, 50);
    setTimeout(() => {
      if (isNaN(calculatedGpa)) {
        setGpa(0);
        return;
      }
    }, 100);
  };

  const handleCourseChange = (index, event) => {
    const newData = [...data];
    newData[index].course = event.target.value;
    setData(newData);
  };

  const handleEctsChange = (index) => (event) => {
    const newEctsValue = parseInt(event.target.value);
    if (!isNaN(newEctsValue) && newEctsValue >= 0) {
      const newData = [...data];
      newData[index].ects = newEctsValue;
      setData(newData);
      calculateGpa(newData);
    }
  };

  const handleGradeChange = (index, event) => {
    const newData = [...data];
    newData[index].grade = event.target.value;
    setData(newData);
    calculateGpa(newData);
  };

  const handleAddEntry = () => {
    if (newCourse && newEcts >= 0 && newGrade) {
      const newData = {
        course: newCourse,
        ects: parseInt(newEcts),
        grade: newGrade,
      };
      setData([...data, newData]);
      setNewCourse("");
      setNewEcts("");
      setNewGrade("");
    }
  };
  useEffect(() => {
    if (isNight) {
      document.body.classList.add("night-mode");
    } else {
      document.body.classList.remove("night-mode");
    }
  }, [isNight]);
  return (
    <div className={`table-container ${isNight ? "night-mode" : ""}`}>
      <div class="container">
        <div class="switch">
          <label for="toggle">
            <input
              id="toggle"
              class="toggle-switch"
              type="checkbox"
              checked={isNight}
              onChange={() => setNight(!isNight)}
            />
            <div class="sun-moon">
              <div class="dots"></div>
            </div>
            <div class="background">
              <div class="stars1"></div>
              <div class="stars2"></div>
            </div>
            <div class="fill"></div>
          </label>
        </div>
      </div>
      <h1 className="h1GPA">GPA Calculator</h1>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>ECTS</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.course}
                  onChange={(event) => handleCourseChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.ects}
                  onChange={handleEctsChange(index)}
                  onBlur={(event) => {
                    if (event.target.value === "") {
                      handleEctsChange(index)({ target: { value: "0" } });
                    }
                  }}
                />
              </td>
              <td>
                <select
                  value={row.grade}
                  onChange={(event) => handleGradeChange(index, event)}
                >
                  <option value="">Select Grade</option>
                  <option value="AA">AA</option>
                  <option value="BA">BA</option>
                  <option value="BB">BB</option>
                  <option value="CB">CB</option>
                  <option value="CC">CC</option>
                  <option value="DC">DC</option>
                  <option value="DD">DD</option>
                  <option value="FF">FF</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-entry">
        <input
          type="text"
          placeholder="Course"
          value={newCourse}
          onChange={(event) => setNewCourse(event.target.value)}
        />
        <input
          type="number"
          placeholder="ECTS"
          value={newEcts}
          onChange={(event) => setNewEcts(event.target.value)}
        />
        <select
          value={newGrade}
          onChange={(event) => setNewGrade(event.target.value)}
        >
          <option value="">Select Grade</option>
          <option value="AA">AA</option>
          <option value="BA">BA</option>
          <option value="BB">BB</option>
          <option value="CB">CB</option>
          <option value="CC">CC</option>
          <option value="DC">DC</option>
          <option value="DD">DD</option>
          <option value="FF">FF</option>
        </select>
        <button className="buttonCalculator" onClick={handleAddEntry}>
          Add
        </button>
      </div>

      <div className="previous-info">
        <h3>Previous GPA and Credits</h3>
        <label htmlFor="previousGpa">PREVIOUS GPA</label>
        <input
          type="number"
          placeholder="Previous GPA"
          value={previousGpa}
          step="0.1"
          inputMode="decimal"
          onChange={handleInputChange}
        />
        <label htmlFor="previouscredit">Previous Credits</label>

        <input
          type="number"
          placeholder="Previous Credits"
          value={previousCredits}
          pattern="[0-9]*[.,]?[0-9]+"
          onChange={(event) => setPreviousCredits(parseInt(event.target.value))}
        />
      </div>

      <div className="gpa">
        <p>GPA: {gpa.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Table;
