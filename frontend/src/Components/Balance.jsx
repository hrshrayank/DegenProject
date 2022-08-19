import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export const Balance = () => {

  return (
    <div >
            <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Balance</Card.Title>
        <Card.Text>
        57
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  </div>
  )
}

