import { useState, useCallback } from "react"
import { cn } from "@/utils/cn"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ 
  onSearch, 
  onClear,
  placeholder = "Search datacenters...",
  suggestions = [],
  className,
  ...props 
}) => {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleInputChange = useCallback((e) => {
    const value = e.target.value
    setQuery(value)
    setSelectedIndex(-1)
    setShowSuggestions(value.length > 0 && suggestions.length > 0)
    
    if (onSearch) {
      onSearch(value)
    }
  }, [onSearch, suggestions.length])

  const handleKeyDown = useCallback((e) => {
    if (!showSuggestions) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex])
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }, [showSuggestions, selectedIndex, suggestions])

  const handleSuggestionClick = useCallback((suggestion) => {
    setQuery(suggestion.name || suggestion)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    if (onSearch) {
      onSearch(suggestion.name || suggestion)
    }
  }, [onSearch])

  const handleClear = useCallback(() => {
    setQuery("")
    setShowSuggestions(false)
    setSelectedIndex(-1)
    if (onClear) {
      onClear()
    }
  }, [onClear])

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="relative flex items-center">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <ApperIcon name="Search" className="h-4 w-4 text-gray-400" />
        </div>
        
        <Input
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-24"
          onFocus={() => setShowSuggestions(query.length > 0 && suggestions.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
        
        {query && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ApperIcon name="X" className="h-4 w-4" />
            </button>
          </div>
        )}
        
        <Button
          onClick={() => onSearch && onSearch(query)}
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8"
        >
          <ApperIcon name="Search" className="h-4 w-4" />
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.Id || index}
              className={cn(
                "px-4 py-2 cursor-pointer transition-colors flex items-center space-x-3",
                index === selectedIndex 
                  ? "bg-primary-50 text-primary-600" 
                  : "hover:bg-gray-50"
              )}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <ApperIcon name="Server" className="h-4 w-4 text-gray-400" />
              <div>
                <div className="font-medium text-sm">
                  {suggestion.name || suggestion}
                </div>
                {suggestion.location && (
                  <div className="text-xs text-gray-500">
                    {suggestion.location.city}, {suggestion.location.country}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar