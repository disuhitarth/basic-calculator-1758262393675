```javascript
// userController.js
// Handles user preferences and settings for the calculator

import { useState, useCallback } from 'react';

const USER_PREFERENCES_KEY = 'calculatorPreferences';

/**
 * Custom hook to manage user preferences
 * @returns {Object} User preferences and methods to update them
 */
export const useUserPreferences = () => {
  // Initialize state from localStorage or defaults
  const [preferences, setPreferences] = useState(() => {
    try {
      const savedPrefs = localStorage.getItem(USER_PREFERENCES_KEY);
      return savedPrefs ? JSON.parse(savedPrefs) : {
        theme: 'light',
        decimalPlaces: 8,
        showHistory: true,
        useKeyboardInput: true,
        scientificNotation: false
      };
    } catch (err) {
      console.error('Error loading preferences:', err);
      return {
        theme: 'light',
        decimalPlaces: 8,
        showHistory: true,
        useKeyboardInput: true,
        scientificNotation: false
      };
    }
  });

  /**
   * Updates user preferences and saves to localStorage
   * @param {Object} newPreferences - New preference values to update
   */
  const updatePreferences = useCallback((newPreferences) => {
    try {
      const updatedPreferences = { ...preferences, ...newPreferences };
      setPreferences(updatedPreferences);
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
    } catch (err) {
      console.error('Error saving preferences:', err);
    }
  }, [preferences]);

  /**
   * Resets preferences to default values
   */
  const resetPreferences = useCallback(() => {
    const defaultPreferences = {
      theme: 'light',
      decimalPlaces: 8,
      showHistory: true,
      useKeyboardInput: true,
      scientificNotation: false
    };
    
    try {
      setPreferences(defaultPreferences);
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(defaultPreferences));
    } catch (err) {
      console.error('Error resetting preferences:', err);
    }
  }, []);

  /**
   * Validates decimal places input
   * @param {number} value - Number of decimal places
   * @returns {boolean} Whether the value is valid
   */
  const isValidDecimalPlaces = useCallback((value) => {
    return Number.isInteger(value) && value >= 0 && value <= 10;
  }, []);

  /**
   * Updates decimal places if valid
   * @param {number} value - New decimal places value
   */
  const updateDecimalPlaces = useCallback((value) => {
    if (isValidDecimalPlaces(value)) {
      updatePreferences({ decimalPlaces: value });
    }
  }, [isValidDecimalPlaces, updatePreferences]);

  /**
   * Toggles theme between light and dark
   */
  const toggleTheme = useCallback(() => {
    updatePreferences({ theme: preferences.theme === 'light' ? 'dark' : 'light' });
  }, [preferences.theme, updatePreferences]);

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    updateDecimalPlaces,
    toggleTheme,
    isValidDecimalPlaces
  };
};

export default useUserPreferences;
```