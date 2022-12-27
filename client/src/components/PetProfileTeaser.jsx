import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
  }
  from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';

export default function PetProfileTeaser({pets}) {

    const navigate = useNavigate()

    return (
    <div className="PetProfileTeaser">
    {pets.map((pet)=> (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
        <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        {/* <Card.Img variant="top" src={pet.profile_image} /> */}
        <MDBCardBody className='px-5'>
            <MDBCardTitle>{pet.name}</MDBCardTitle>
            <MDBCardText>
            {pet.gender} {pet.breed}<br/>
            spayed/neutered: {pet.spayed_neutered_status}<br/>
            birthdate: {pet.birthdate}<br/>
            </MDBCardText>
        </MDBCardBody>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>personality: {pet.personality}</ListGroup.Item>
            <ListGroup.Item>{pet.name} likes {pet.likes}</ListGroup.Item>
        </ListGroup>
        <MDBCardBody>
            <MDBBtn onClick={()=>navigate(`/editpetprofile${pet.id}`)}>edit profile</MDBBtn><br/><br/>
            <MDBBtn onClick={()=>navigate(`/viewmessages${pet.id}`)}>view messages</MDBBtn>
        </MDBCardBody>
        <div className='mask gradient-custom-3'></div>
        </MDBCard>

        </MDBContainer>
    ))} 
    </div>
    )
} 