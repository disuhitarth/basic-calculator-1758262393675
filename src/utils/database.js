```javascript
/**
 * database.js
 * Local storage utility functions for the calculator application.
 * Handles saving and retrieving calculation history and user preferences.
 */

// Constants
const STORAGE_KEYS = {
  HISTORY: 'calculator_history',
  PREFERENCES: 'calculator_preferences'
};

const MAX_HISTORY_ITEMS = 100;

/**
 * Save calculation to history
 * @param {Object} calculation - Object containing calculation details
 * @param {string} calculation.expression - The math expression
 * @param {number} calculation.result - The calculated result
 * @param {Date} calculation.timestamp - When calculation was performed
 * @returns {boolean} Success status
 */
export const saveCalculation = (calculation) => {
  try {
    let history = getHistory();
    history.unshift({
      ...calculation,
      id: Date.now().toString()
    });
    
    // Limit history size
    if (history.length > MAX_HISTORY_ITEMS) {
      history = history.slice(0, MAX_HISTORY_ITEMS);
    }

    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Error saving calculation:', error);
    return false;
  }
};

/**
 * Get calculation history
 * @returns {Array} Array of calculation objects
 */
export const getHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error retrieving history:', error);
    return [];
  }
};

/**
 * Clear calculation history
 * @returns {boolean} Success status
 */
export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    return true;
  } catch (error) {
    console.error('Error clearing history:', error);
    return false;
  }
};

/**
 * Save user preferences
 * @param {Object} preferences - User preference settings
 * @returns {boolean} Success status
 */
export const savePreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error saving preferences:', error);
    return false;
  }
};

/**
 * Get user preferences
 * @returns {Object} User preferences object
 */
export const getPreferences = () => {
  try {
    const preferences = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return preferences ? JSON.parse(preferences) : {};
  } catch (error) {
    console.error('Error retrieving preferences:', error);
    return {};
  }
};

/**
 * Check if local storage is available
 * @returns {boolean} Storage availability status
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  saveCalculation,
  getHistory,
  clearHistory,
  savePreferences,
  getPreferences,
  isStorageAvailable
};
```