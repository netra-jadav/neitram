import React, { useState, useEffect } from 'react';
import './Civil.css'; // Include styling here or use Tailwind
import * as XLSX from 'xlsx';

function Civil() {
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("civilEntries");
    return saved ? JSON.parse(saved) : [];
  });
  

  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEntry = {
      sn: entries.length ? entries[entries.length - 1].sn + 1 : 1,
      submission: form.submission.value,
      time: form.time.value,
      target: form.target.value,
      completed: form.completed.value,
      category: form.category.value,
      deptNo: form.deptNo.value,
      deptName: form.deptName.value,
      drawingNo: form.drawingNo.value,
      title: form.title.value,
      version: form.version.value,
    };
    setEntries([...entries, newEntry]);
    setShowModal(false);
    form.reset(); // Optional: reset form
  };
  
  useEffect(() => {
    localStorage.setItem("civilEntries", JSON.stringify(entries));
  }, [entries]);
  
  
  useEffect(() => {
    localStorage.setItem("civilEntries", JSON.stringify(entries));
  }, [entries]);
  
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Civil Entries");
    XLSX.writeFile(wb, "civil_entries.xlsx");
  };
  
  return (
    <div className="civil-container">
      <h2>Civil Projects Details</h2>
      <div className="buttons">
        <button onClick={() => setShowModal(true)}>Add Entry</button>
        <button className="export-btn" onClick={handleExport}>Export</button>

      </div>
      <table>
        <thead>
          <tr>
            <th>SN number</th>
            <th>Date Submission</th>
            <th>Time Available</th>
            <th>Target Date</th>
            <th>Date Completed</th>
            <th>Category</th>
            <th>Department No.</th>
            <th>Department Name</th>
            <th>Drawing No.</th>
            <th>Drawing Title</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.sn}</td>
              <td>{entry.submission}</td>
              <td>{entry.time}</td>
              <td>{entry.target}</td>
              <td>{entry.completed}</td>
              <td>{entry.category}</td>
              <td>{entry.deptNo}</td>
              <td>{entry.deptName}</td>
              <td>{entry.drawingNo}</td>
              <td>{entry.title}</td>
              <td>{entry.version}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <form className="modal-content" onSubmit={handleAdd}>
            <h3>Add Drawing Details</h3>
            <input name="sn" disabled placeholder="SN Number (auto)" />
            <input name="time" placeholder="Time Available" />
            <input name="submission" type="date" placeholder="Date Submission" />
            <input name="target" type="date" placeholder="Target Date" />
            <input name="completed" type="date" placeholder="Date Completed" />
            <select name="category">
              <option value="">Select Category</option>
              <option value="Civil">Civil</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
            </select>
            <input name="deptNo" placeholder="Department No." />
            <input name="deptName" placeholder="Department Name" />
            <input name="drawingNo" placeholder="Drawing No." />
            <input name="title" placeholder="Drawing Title" />
            <input name="version" placeholder="Version" />
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Civil;
