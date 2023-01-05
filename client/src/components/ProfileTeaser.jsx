import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardLink,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';

export default function ProfileTeaser(props) {

    const navigate = useNavigate()

    return (
        <div className="ProfileTeaser">
            <section style={{ backgroundColor: '#AEBDCA' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4" style={{ backgroundColor: '#F5EFE6' }}>
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={props.image_url} alt="avatar" className="rounded-circle" style={{ width: '150px' }}fluid /><br/>
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
            <MDBCard style={{ backgroundColor: '#F5EFE6' }}className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol>
                    <MDBCardLink onClick={()=>navigate("/viewmypets")}>View My Pets</MDBCardLink>
                  </MDBCol>
                </MDBRow>
                <hr />
                {/* <MDBRow>
                  <MDBCol>
                    <MDBCardLink onClick={()=>navigate("/viewmessages")}>View Messages</MDBCardLink>
                  </MDBCol>
                </MDBRow>
                <hr /> */}
                {/* <MDBRow>
                  <MDBCol>
                  <MDBCardLink onClick={()=>navigate("/editprofile")}>View Favorites</MDBCardLink>
                  </MDBCol>
                </MDBRow>
                <hr /> */}
                <MDBRow>
                  <MDBCol>
                  <MDBCardLink onClick={()=>navigate("/findfriends")}>Find Friends</MDBCardLink>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
        </div>
    )
}