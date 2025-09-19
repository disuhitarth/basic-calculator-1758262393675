```javascript
// src/models/User.js
/**
 * Basic user model for storing calculator history and preferences
 * Implemented as a class for better encapsulation and future extensibility
 */
class User {
  constructor() {
    this.history = [];
    this.preferences = {
      theme: 'light',
      precision: 8, // Max decimal places
      useKeyboard: true,
      maxHistoryItems: 100
    };
  }

  /**
   * Add a calculation to history
   * @param {string} expression - The math expression
   * @param {number} result - The calculated result
   * @returns {void}
   */
  addToHistory(expression, result) {
    const historyItem = {
      expression,
      result,
      timestamp: new Date().toISOString()
    };

    this.history.unshift(historyItem);

    // Maintain max history size
    if (this.history.length > this.preferences.maxHistoryItems) {
      this.history = this.history.slice(0, this.preferences.maxHistoryItems);
    }
  }

  /**
   * Get calculation history
   * @param {number} limit - Optional limit of items to return
   * @returns {Array} Array of history items
   */
  getHistory(limit = null) {
    if (limit && limit > 0) {
      return this.history.slice(0, limit);
    }
    return [...this.history];
  }

  /**
   * Clear all history
   * @returns {void}
   */
  clearHistory() {
    this.history = [];
  }

  /**
   * Update user preferences
   * @param {Object} newPrefs - Object containing new preference values
   * @returns {void}
   */
  updatePreferences(newPrefs) {
    this.preferences = {
      ...this.preferences,
      ...newPrefs
    };
  }

  /**
   * Get current preferences
   * @returns {Object} User preferences object
   */
  getPreferences() {
    return { ...this.preferences };
  }

  /**
   * Reset preferences to defaults
   * @returns {void}
   */
  resetPreferences() {
    this.preferences = {
      theme: 'light',
      precision: 8,
      useKeyboard: true,
      maxHistoryItems: 100
    };
  }

  /**
   * Export user data
   * @returns {Object} User data for storage/export
   */
  toJSON() {
    return {
      history: this.history,
      preferences: this.preferences
    };
  }

  /**
   * Import user data
   * @param {Object} data - User data to import
   * @returns {void}
   */
  fromJSON(data) {
    if (data.history) {
      this.history = data.history;
    }
    if (data.preferences) {
      this.preferences = {
        ...this.preferences,
        ...data.preferences
      };
    }
  }
}

export default User;
```