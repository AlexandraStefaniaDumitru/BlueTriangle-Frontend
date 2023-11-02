import React from "react";
import "./History.css";

function History({ data }) {
  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Nume copil</th>
          <th>Data</th>
          <th>Durata</th>
          <th>Descriere</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id.timestamp}>
            <td>{item.child && item.child.name}</td>
            <td>{item.date}</td>
            <td>{item.duration}</td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default History;
