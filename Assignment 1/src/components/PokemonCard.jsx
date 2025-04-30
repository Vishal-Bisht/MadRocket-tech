const PokemonCard = ({ id, name, image, types }) => {
  return (
    <div className="pokemon-card">
      <span style={{fontWeight:'bold', color:'#2d72fc'}}>#{id}</span>
      <img src={image} alt={name} className="pokemon-image" />
      <h3 className="pokemon-name">{name}</h3>
      <div className="pokemon-types">
        {types && types.map((type, idx) => (
          <span key={idx} className={`pokemon-type ${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;