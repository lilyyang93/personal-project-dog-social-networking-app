import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';

export default function PetProfileTeaser({pets}) {

    const navigate = useNavigate()

    return (
    <div className="PetProfileTeaser">
    {pets.map((pet)=> (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={pet.profile_image} />
        <Card.Body>
            <Card.Title>{pet.name}</Card.Title>
            <Card.Text>
            DOB: {pet.birthdate}<br/>
            {pet.gender}<br/>
            spayed/neutered: {pet.spayed_neutered_status}<br/>
            breed: {pet.breed}
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>personality: {pet.personality}</ListGroup.Item>
            <ListGroup.Item>{pet.name} likes {pet.likes}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            <Card.Link onClick={()=>navigate(`/editpetprofile${pet.id}`)}>edit profile</Card.Link>
        </Card.Body>
        </Card>
    ))} 
    </div>
    )
} 