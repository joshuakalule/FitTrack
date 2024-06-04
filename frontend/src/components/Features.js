import React, { Component } from 'react'
import { Container, CardGroup, Card } from 'react-bootstrap'
import '../assets/styles/Features.scss'


export default class Features extends Component {
  render() {
    return (
      <Container className="features">
        <h1>Features</h1>
        <CardGroup className='row, flex-col-center'>
          <Card>
            <Card.Img variant="top" src={require('../assets/images/wellness.png')} />
            <Card.Body>
              <Card.Title>Track Your Fitness</Card.Title>
              <Card.Text>
                Stay on track! Log your workouts, monitor progress, and crush your fitness goals.
                <br />
                Track every step, rep, and calorie burned. Your fitness journey starts here.”
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={require('../assets/images/weightloss.png')} />
            <Card.Body>
              <Card.Title>Set Your Goals</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{' '}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={require('../assets/images/competition.png')} />
            <Card.Body>
              <Card.Title>Monitor Progress</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This card has even longer content than the
                first to show that equal height action.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    )
  }
}
