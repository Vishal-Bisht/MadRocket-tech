const BASE_URL = 'https://pokeapi.co/api/v2';

// Fetch a list of Pokémon with pagination
export async function fetchPokemonList(limit = 20, offset = 0) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  return response.json();
}

// Fetch details for a specific Pokémon by name or ID
export async function fetchPokemonDetails(nameOrId) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }
  return response.json();
}
