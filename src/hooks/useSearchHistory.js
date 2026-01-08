import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing search history with localStorage
 * @param {number} maxItems - Maximum number of items to store in history (default: 5)
 * @returns {Object} - { history, addToHistory, clearHistory }
 */
export function useSearchHistory(maxItems = 5) {
  const [history, setHistory] = useLocalStorage('searchHistory', []);

  /**
   * Add a search query to history
   * @param {string} query - The search query to add
   */
  const addToHistory = useCallback((query) => {
    // Don't add empty or whitespace-only queries
    if (!query || query.trim().length === 0) {
      return;
    }

    const trimmedQuery = query.trim();

    setHistory(prev => {
      // Remove duplicate if it exists (case-insensitive)
      const filtered = prev.filter(
        item => item.toLowerCase() !== trimmedQuery.toLowerCase()
      );

      // Add new query at the beginning and limit to maxItems
      return [trimmedQuery, ...filtered].slice(0, maxItems);
    });
  }, [maxItems, setHistory]);

  /**
   * Clear all search history
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return {
    history,
    addToHistory,
    clearHistory
  };
}
