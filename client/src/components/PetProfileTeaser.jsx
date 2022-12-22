export default function PetProfileTeaser({myPets}) {
    return (
    <div className="PetProfileTeaser">
        <h2>your pets</h2><hr/>
        {myPets.map((pet)=>{
            return <h4>{pet}</h4>
        })}
    </div>
    )
} 