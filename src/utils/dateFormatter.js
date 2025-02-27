/**
 * @file Date and time formatting utilities
 * @module utils/dataFormatter
 * @description Provides utility functions for formatting dates and times.
 */

export const formatDate = () => {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return new Date().toLocaleDateString("en-US", options);
};

export const formatTime = (timestamp) => {
  if (!timestamp) {
    return "N/A";
  }
  return new Date(timestamp * 1000).toLocaleTimeString("default");
};
