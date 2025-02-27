/**
 * @file API key and search query validation utilities
 * @module utils/validators
 * @description Provides utility functions for validating API keys and search queries before making requests.
 *
 */

export const validateApiKey = (apiKey) => {
  if (!apiKey) {
    throw new Error("API Key not configured");
  }
};

export const validateSearchQuery = (query) => {
  if (!query || typeof query !== "string" || query.length < 2) {
    throw new Error("Invalid search query");
  }
  return query.trim();
};
