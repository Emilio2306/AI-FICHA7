import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/list-genders/test')
    .then(response => setData(response.data)
    )
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((gender) => (
              <tr key={gender.id}>
                <td>{gender.id}</td>
                <td>{gender.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Home