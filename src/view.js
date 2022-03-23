import React from 'react';
// import Table from 'react-bootstrap/Table';
// import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import './App.css';
import './card.scss';

function View(props){
    // const todos = [{ id: 1, task: "make static data", complete: false },
    // { id: 2, task: "make dynamic data", complete: false }]

  // const buildRows = () =>  {
  //   return props.socmedpost.map((current) => (
  //     <tr key={current.username}>
  //       <td>
  //         {current.username}
  //       </td>
  //       <td>
  //         {current.description}
  //       </td>
  //       <td>
  //         {current.like}          
  //       </td>
  //     </tr>
  //   )
  //   )
  // }

  const buildCards = () => {
    return props.socmedpost.map((current) => (
      <div className="container cardMain">
          <Card>
            <Card.Header className="cardHeader">{current.username}</Card.Header>
            <Card.Body className="cardBody">
              <blockquote className="blockquote mb-0">
                <p>
                  {' '}
                  {current.description}{' '}
                </p>
                <footer className="cardFooter blockquote-footer">
                  Post was liked by {current.like} user(s).
                </footer>
              </blockquote>
            </Card.Body>
          </Card>    
        </div>
    ))
  }


    return (
      <>
        {buildCards()}
        {/* <Table striped bordered hover>
          <thead>
            <tr>
              <th>username</th>
              <th>description</th>
              <th>like</th>
            </tr>
          </thead>
          <tbody>
            {buildRows()}
          </tbody>
        </Table> */}
      </>
    );

}
export default View;
