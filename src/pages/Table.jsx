import React from "react";
import useQuery from "../utils/query";

function App() {
  const url = "https://fuseki.gagahpangeran.com/nobel/sparql";
  const query = `
  SELECT ?subject ?predicate ?object
  WHERE {
    ?subject ?predicate ?object
  }
  LIMIT 10
  `;

  const { loading, error, data } = useQuery(url, query);

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error!</>;
  }

  console.log(data);

  return (
    <div className="App">
      <table border="1">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Predicate</th>
            <th>Object</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ subject, predicate, object }) => (
            <tr>
              <td>{subject.value}</td>
              <td>{predicate.value}</td>
              <td>{object.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
