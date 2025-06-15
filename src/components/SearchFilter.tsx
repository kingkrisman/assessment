import React, { useState } from "react";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Task } from "../lib/data";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  totalTasks: number;
}

export interface FilterOptions {
  status: string[];
  priority: string[];
  assignee: string[];
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  onFilter,
  totalTasks,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    priority: [],
    assignee: [],
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleFilter = (type: keyof FilterOptions, value: string) => {
    const currentFilters = filters[type];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((item) => item !== value)
      : [...currentFilters, value];

    const updatedFilters = { ...filters, [type]: newFilters };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = { status: [], priority: [], assignee: [] };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  const activeFiltersCount = Object.values(filters).flat().length;

  return (
    <div className="mb-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-dark/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-dark/50 hover:text-brand-dark"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
            showFilters || activeFiltersCount > 0
              ? "border-brand-dark bg-brand-dark text-white"
              : "border-brand-gray-200 bg-white text-brand-dark hover:bg-brand-gray-50"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-semibold">Filter</span>
          {activeFiltersCount > 0 && (
            <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Results Count */}
        <div className="text-sm text-brand-dark/50 font-medium">
          {totalTasks} tasks found
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-brand-gray-200 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-brand-dark">Filters</h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-brand-dark/50 hover:text-brand-dark"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <h4 className="text-sm font-semibold text-brand-dark mb-2">
                Status
              </h4>
              <div className="space-y-2">
                {["todo", "inprogress", "done"].map((status) => (
                  <label
                    key={status}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => toggleFilter("status", status)}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">
                      {status === "inprogress" ? "In Progress" : status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div>
              <h4 className="text-sm font-semibold text-brand-dark mb-2">
                Priority
              </h4>
              <div className="space-y-2">
                {["low", "medium", "high"].map((priority) => (
                  <label
                    key={priority}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.priority.includes(priority)}
                      onChange={() => toggleFilter("priority", priority)}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">{priority}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="text-sm font-semibold text-brand-dark mb-2">
                Quick Filters
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setFilters({ ...filters, status: ["inprogress"] })
                  }
                  className="block w-full text-left text-sm text-brand-dark/70 hover:text-brand-dark"
                >
                  My active tasks
                </button>
                <button
                  onClick={() => setFilters({ ...filters, priority: ["high"] })}
                  className="block w-full text-left text-sm text-brand-dark/70 hover:text-brand-dark"
                >
                  High priority
                </button>
                <button
                  onClick={() => setFilters({ ...filters, status: ["done"] })}
                  className="block w-full text-left text-sm text-brand-dark/70 hover:text-brand-dark"
                >
                  Completed tasks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
