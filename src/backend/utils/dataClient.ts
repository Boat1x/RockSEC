import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

// Create a singleton data client to be used across the application
export const dataClient = generateClient<Schema>();

// Helper function to handle errors consistently
export const handleDataError = (error: any, operation: string): Error => {
  console.error(`Error in ${operation}:`, error);
  return new Error(`Failed to ${operation}: ${error.message || 'Unknown error'}`);
};
