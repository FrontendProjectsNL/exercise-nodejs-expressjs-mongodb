import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>
      <div>
        <Link to={`/edit/${props.record._id}`}>Edit</Link>
        <button
          style={{ marginLeft: '1rem' }}
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  // Fetch records from API
  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5050/record/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const records = await response.json();
        setRecords(records);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecords();
  }, []); // Run once on mount

  // Delete record by ID
  async function deleteRecord(id) {
    try {
      await fetch(`http://localhost:5050/record/${id}`, {
        method: 'DELETE',
      });
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record._id !== id)
      );
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  }

  // Render list of records
  function renderRecords() {
    return records.map((record) => (
      <Record key={record._id} record={record} deleteRecord={deleteRecord} />
    ));
  }

  // Display loading indicator while fetching records
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display table with records
  return (
    <>
      <h3>Employee Records</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderRecords()}</tbody>
        </table>
      </div>
    </>
  );
}
