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
      if (!id) return;
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
        `http://localhost:5050/record${params.id ? '/' + params.id : ''}`,
        {
          method: `${params.id ? 'PATCH' : 'POST'}`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(person),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving record:', error);
    } finally {
      setForm({ name: '', position: '', level: '' });
      navigate('/');
    }
  }

  return (
    <>
      <h3>Create/Update Employee Record</h3>
      <form onSubmit={onSubmit}>{/* Form fields and inputs */}</form>
    </>
  );
}
