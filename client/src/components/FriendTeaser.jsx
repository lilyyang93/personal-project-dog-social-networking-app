import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
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

export default function FriendTeaser({friends}) {

    const navigate = useNavigate()

    return (
    <div className="FriendTeaser">
    {friends.map((friend)=> (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
            <MDBCard className='m-5' style={{maxWidth: '600px'}}>
            {/* <Card.Img variant="top" src={friend.profile_image} /> */}
            <MDBCardBody className='px-5'>
                <MDBCardTitle>{friend.name}</MDBCardTitle>
                <MDBCardText>
                {friend.gender} {friend.breed}<br/>
                spayed/neutered: {friend.spayed_neutered_status}<br/>
                </MDBCardText>
            </MDBCardBody>
            <MDBCardBody>
                <MDBBtn onClick={()=>navigate(`/viewfriend${friend.id}`)}>view profile</MDBBtn><br/><br/>
            </MDBCardBody>
            <div className='mask gradient-custom-3'></div>
            </MDBCard>
        </MDBContainer>
    ))} 
    </div>
    )
}

