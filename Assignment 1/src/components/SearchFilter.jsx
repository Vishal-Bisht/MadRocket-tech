const SearchFilter = ({ value, onChange }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchFilter;