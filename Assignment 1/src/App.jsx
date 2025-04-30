import { useEffect, useState } from 'react';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
import SearchFilter from './components/SearchFilter';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const details = await Promise.all(
          data.results.map(async (pokemon) => {
            const resp = await fetch(pokemon.url);
            const pokeData = await resp.json();
            return {
              id: pokeData.id,
              name: pokeData.name,
              image: pokeData.sprites.front_default,
              types: pokeData.types.map(t => t.type.name)
            };
          })
        );
        setPokemons(details);
        // Fetch all types for dropdown
        const typeRes = await fetch('https://pokeapi.co/api/v2/type');
        const typeData = await typeRes.json();
        setTypes(typeData.results.map(t => t.name).filter(t => t !== 'unknown' && t !== 'shadow'));
      } catch (err) {
        setError('Failed to fetch Pokémon data. Please try again.');
        setPokemons([]);
      }
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (type ? p.types.includes(type) : true)
  );

  return (
    <div>
      <Header />
      <SearchFilter value={search} onChange={setSearch} />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value=''>All Types</option>
          {types.map(t => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : filteredPokemons.length === 0 ? (
        <p>No Pokémon found.</p>
      ) : (
        <div className="pokemon-list">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
export default App;