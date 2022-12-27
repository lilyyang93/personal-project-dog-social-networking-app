import Card from 'react-bootstrap/Card'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
  }
  from 'mdb-react-ui-kit';

export default function MessagesComponent({messages}) {
    return (
    <div className="MessagesComponent">
    {messages.map((msg)=> (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
        <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
            <MDBCardText>title: {msg.title}</MDBCardText>
            <MDBCardText>message: {msg.message}</MDBCardText>
        </MDBCardBody>
        <div className='mask gradient-custom-3'></div>
        </MDBCard>
    </MDBContainer>
    ))}
    </div>
    )
}