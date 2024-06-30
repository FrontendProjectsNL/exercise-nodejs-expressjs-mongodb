import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Record() {
  const [form, setForm] = useState({
    name: '',
    author: '',
    price: '',
    genre: '',
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { id } = params; // Destructure id from params
      if (id) {
        try {
          const response = await fetch(`http://localhost:5050/record/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const record = await response.json();
          setForm(record);
          setIsNew(false);
        } catch (error) {
          console.error('Error fetching record:', error);
        }
      } else {
        setIsNew(true);
      }
    };

    fetchData();
  }, [params]); // Depend on params to re-fetch when id changes

  const onSubmit = async (e) => {
    e.preventDefault();
    const { id } = params; // Destructure id from params
    const updatedRecord = { ...form };
    const url = id
      ? `http://localhost:5050/record/${id}`
      : 'http://localhost:5050/record/';
    const method = id ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate('/');
    } catch (error) {
      console.error(`Error ${isNew ? 'creating' : 'updating'} record:`, error);
    }
  };

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
          Author:
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">{isNew ? 'Create' : 'Update'}</button>
      </form>
    </>
  );
}
