import { useState, useCallback } from "react"
import { cn } from "@/utils/cn"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import ApperIcon from "@/components/ApperIcon"

const Header = ({ 
  onSearch,
  onToggleFilters,
  showFilters,
  searchSuggestions = [],
  className,
  ...props 
}) => {
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = useCallback((query) => {
    if (onSearch) {
      onSearch(query)
    }
  }, [onSearch])

  return (
    <header 
      className={cn(
        "bg-white border-b border-gray-200 shadow-sm z-40",
        className
      )} 
      {...props}
    >
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
              <ApperIcon name="Globe" className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">DataCenter Atlas</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Global Infrastructure Map</p>
            </div>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 max-w-lg mx-8">
          <SearchBar
            onSearch={handleSearch}
            suggestions={searchSuggestions}
            placeholder="Search datacenters, cities, operators..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden"
          >
            <ApperIcon name="Search" className="h-4 w-4" />
          </Button>

          {/* Filter Toggle */}
          <Button
            variant={showFilters ? "primary" : "ghost"}
            size="sm"
            onClick={onToggleFilters}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Filter" className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>

          {/* View Options */}
          <div className="hidden lg:flex items-center space-x-1 border border-gray-200 rounded-lg p-1">
            <Button variant="primary" size="sm" className="h-7 px-2">
              <ApperIcon name="Map" className="h-3 w-3 mr-1" />
              Map
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <ApperIcon name="List" className="h-3 w-3 mr-1" />
              List
            </Button>
          </div>

          {/* Help/Info */}
          <Button variant="ghost" size="sm">
            <ApperIcon name="Info" className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="px-4 pb-4 md:hidden animate-slide-up">
          <SearchBar
            onSearch={handleSearch}
            suggestions={searchSuggestions}
            placeholder="Search datacenters..."
          />
        </div>
      )}
    </header>
  )
}

export default Header