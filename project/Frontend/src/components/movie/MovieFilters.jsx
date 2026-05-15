import React from 'react'

/**
 * Barra de filtros para a listagem de filmes.
 *
 * Props:
 *   - search: string
 *   - onSearchChange: (string) => void
 *   - genderId: string | ''
 *   - onGenderChange: (string) => void
 *   - genders: Array<{ id, description }>
 *   - onClear: () => void
 *   - hasActiveFilters: boolean
 */
function MovieFilters({
  search,
  onSearchChange,
  genderId,
  onGenderChange,
  genders,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div className="filters-bar">
      <div className="filters-search">
        <span className="filters-search-icon">⌕</span>
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por título ou descrição..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button
            type="button"
            className="filters-clear-search"
            onClick={() => onSearchChange('')}
            aria-label="Limpar pesquisa"
          >
            ×
          </button>
        )}
      </div>

      <select
        className="form-select filters-gender"
        value={genderId}
        onChange={(e) => onGenderChange(e.target.value)}
      >
        <option value="">Todos os géneros</option>
        {genders.map(g => (
          <option key={g.id} value={g.id}>{g.description}</option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClear}
        >
          Limpar
        </button>
      )}
    </div>
  )
}

export default MovieFilters