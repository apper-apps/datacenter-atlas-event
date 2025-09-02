import { useState, useCallback, useRef, useEffect } from "react"
import { cn } from "@/utils/cn"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ 
  onSearch,
  suggestions = [],
  placeholder = "Search...",
  className,
  ...props 
}) => {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)

  const handleInputChange = useCallback((e) => {
    const value = e.target.value
    setQuery(value)
    setShowSuggestions(value.length > 0 && suggestions.length > 0)
    setSelectedIndex(-1)
  }, [suggestions.length])

  const handleSubmit = useCallback((searchQuery = query) => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim())
      setShowSuggestions(false)
      inputRef.current?.blur()
    }
  }, [query, onSearch])

  const handleSuggestionClick = useCallback((suggestion) => {
    setQuery(suggestion.name || suggestion)
    handleSubmit(suggestion.name || suggestion)
  }, [handleSubmit])

  const handleKeyDown = useCallback((e) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else {
          handleSubmit()
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }, [showSuggestions, suggestions, selectedIndex, handleSuggestionClick, handleSubmit])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(query.length > 0 && suggestions.length > 0)}
          placeholder={placeholder}
          className="pr-10"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="Search" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.Id || index}
              type="button"
              className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-3",
                selectedIndex === index && "bg-primary-50 text-primary-700"
              )}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <ApperIcon name="Search" className="h-4 w-4 text-gray-400" />
              <div>
                <div className="font-medium">
                  {suggestion.name || suggestion}
                </div>
                {suggestion.location && (
                  <div className="text-xs text-gray-500">
                    {suggestion.location.city}, {suggestion.location.country}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar