/**
 * Standard API response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Default export to ensure it's available
export default ApiResponse;

/**
 * Create a success response
 * @param data - The data to include in the response
 * @param message - Optional success message
 * @returns API response object
 */
export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  message
});

/**
 * Create an error response
 * @param error - The error message
 * @returns API response object
 */
export const errorResponse = (error: string): ApiResponse<null> => ({
  success: false,
  error
});

/**
 * Handle API errors consistently
 * @param error - The error object
 * @returns API response object
 */
export const handleApiError = (error: any): ApiResponse<null> => {
  console.error('API Error:', error);
  return errorResponse(error.message || 'An unexpected error occurred');
};
