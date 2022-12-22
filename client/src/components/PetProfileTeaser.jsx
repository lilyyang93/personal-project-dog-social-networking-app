export default function PetProfileTeaser({myPets}) {
    return (
    <div className="PetProfileTeaser">
        <h2>your pets</h2>
        <br/><hr/>
        {myPets.map((pet)=>{
            return <h4>{pet}</h4>
        })}
    </div>
    )
} 