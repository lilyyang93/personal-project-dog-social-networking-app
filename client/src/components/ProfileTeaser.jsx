import PetProfileTeaser from './PetProfileTeaser';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardLink,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';

export default function ProfileTeaser(props) {

    const navigate = useNavigate()

    return (
        <div className="ProfileTeaser">
            <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={props.image_url}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Name: {props.myUser}</p>
                <p className="text-muted mb-4">City: {props.myCity}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn outline className="ms-1" onClick={()=>navigate("/editprofile")}>Edit Profile</MDBBtn>
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn outline className="ms-1" onClick={()=>navigate("/addpetprofile")}>Add Pet Profile</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol>
                    <MDBCardLink onClick={()=>navigate("/editprofile")}>View Requests</MDBCardLink>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                  <MDBCardLink onClick={()=>navigate("/editprofile")}>View Favorites</MDBCardLink>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                  <MDBCardLink onClick={()=>navigate("/findfriends")}>Find Friends</MDBCardLink>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBCard>
              <PetProfileTeaser myPets={props.myPets} />
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
        </div>
    )
}