import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";



function App() {
  const [repositories, setRepository] = useState([])

  useEffect(() => {
    api.get('repositories').then (response => {
      console.log(response);
      setRepository(response.data);
    })
  }, []);
  async function handleAddRepository() {
    //setRepository([...repositories, `Novo repositorio ${Date.now()}`])

    const response = await api.post('repositories', {
      title: `Novo repositorio`,
      url: `http://github.com/`
    })
    //console.log(repositories);
    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
     await api.delete(`repositories/${id}`);

     const filteredRepositories = repositories.filter(
       repository => repository.id !== id
       );

    setRepository(filteredRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map((repository) => (
      <li key={repository.id}>
          Repositório 1
           {repository.title} 
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
