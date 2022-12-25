import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export default function FriendTeaser({friends}) {
    return (
    <div className="FriendTeaser">
    {friends.map((friend)=> (
     <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={friend.profile_image} />
        <Card.Body>
            <Card.Title>{friend.name}</Card.Title>
            <Card.Text>
            {friend.gender} / {friend.breed}<br/>
            spayed/neutered: {friend.spayed_neutered_status}<br/>
            </Card.Text>
            <Button variant="primary">view profile</Button>
        </Card.Body>
        </Card>
    ))} 
    </div>
    )
}

