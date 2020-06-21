import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories',
      {
        title: `Projeto criado na Aplicação${Date.now()}`,
        url: "https://github.com/eddyfrancisco",
        techs: [
          "Java", "SQL", "Node", "React"
        ]
      }
    );

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {

      if (response.status === 204) {
        const newRespositories = repositories.filter(repository => repository.id !== id);

        setRepositories(newRespositories);
      }
    });
  }
  
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => <li key={repositorie.id}>{repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
          Remover
          </button>
        </li>)}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
