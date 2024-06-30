import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Record() {
  const [form, setForm] = useState({
    name: '',
    position: '',
    level: '',
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) {
        setIsNew(true);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5050/record/${params.id.toString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const record = await response.json();
        if (!record) {
          console.warn(`Record with id ${id} not found`);
          navigate('/');
          return;
        }
        setForm(record);
        setIsNew(false);
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    }
    fetchData();
  }, [params.id, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      const response = await fetch(
        `http://localhost:5050/record${isNew ? '' : '/' + params.id}`,
        {
          method: `${isNew ? 'POST' : 'PATCH'}`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(person),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving record:', error);
    }
  }

  async function onDelete() {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5050/record/${params.id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate('/');
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <h3>{isNew ? 'Create New Record' : 'Update Record'}</h3>
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Level:
          <input
            type="text"
            name="level"
            value={form.level}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">{isNew ? 'Create' : 'Update'}</button>
        {!isNew && (
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        )}
      </form>
    </>
  );
}
