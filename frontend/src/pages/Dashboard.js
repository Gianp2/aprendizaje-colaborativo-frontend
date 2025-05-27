import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notes', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/notes',
        { title, content },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNotes([...notes, res.data]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Mis Apuntes</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded mb-2 w-full"
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border rounded mb-2 w-full"
        />
        <button
          onClick={handleCreateNote}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Crear Apunte
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <div key={note._id} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl">{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

// ... (código anterior del Dashboard)
const [groups, setGroups] = useState([]);
const [groupName, setGroupName] = useState('');

useEffect(() => {
  const fetchGroups = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/groups', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setGroups(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchGroups();
}, []);

const handleCreateGroup = async () => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/groups',
      { name: groupName },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    setGroups([...groups, res.data]);
    setGroupName('');
  } catch (err) {
    console.error(err);
  }
};

// En el return, después del form de apuntes:
<div className="mt-6">
  <h2 className="text-2xl mb-4">Mis Grupos</h2>
  <input
    type="text"
    placeholder="Nombre del grupo"
    value={groupName}
    onChange={(e) => setGroupName(e.target.value)}
    className="p-2 border rounded mb-2 w-full"
  />
  <button
    onClick={handleCreateGroup}
    className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
  >
    Crear Grupo
  </button>
  <div className="mt-4">
    {groups.map(group => (
      <div key={group._id} className="p-4 bg-white rounded shadow mb-2">
        <h3 className="text-xl">{group.name}</h3>
      </div>
    ))}
  </div>
</div>