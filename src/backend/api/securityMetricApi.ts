import { SecurityMetricService } from '../services/securityMetricService';
import { successResponse, handleApiError } from '../utils/apiResponse';
import { ActivityLogService } from '../services/activityLogService';

/**
 * API handler for security metric-related operations
 */
export class SecurityMetricApi {
  /**
   * Get all security metrics for a client
   * @param clientId - The client ID
   * @param userId - The user ID making the request
   */
  static async getMetrics(clientId: string, userId: string) {
    try {
      const metrics = await SecurityMetricService.getMetricsByClient(clientId);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_SECURITY_METRICS',
        details: `Retrieved security metrics for client ${clientId}`
      });
      
      return successResponse(metrics, 'Security metrics retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get security metrics by category
   * @param clientId - The client ID
   * @param category - The metric category
   * @param userId - The user ID making the request
   */
  static async getMetricsByCategory(clientId: string, category: string, userId: string) {
    try {
      const metrics = await SecurityMetricService.getMetricsByCategory(clientId, category);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_METRICS_BY_CATEGORY',
        details: `Retrieved ${category} metrics for client ${clientId}`
      });
      
      return successResponse(metrics, `${category} metrics retrieved successfully`);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Create a new security metric
   * @param metricData - The metric data
   * @param userId - The user ID making the request
   */
  static async createMetric(metricData: {
    clientId: string;
    metricName: string;
    metricValue: number;
    previousValue?: number;
    changePercentage?: number;
    category: string;
  }, userId: string) {
    try {
      const metric = await SecurityMetricService.createMetric(metricData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'CREATE_SECURITY_METRIC',
        details: `Created new metric "${metricData.metricName}" for client ${metricData.clientId}`
      });
      
      return successResponse(metric, 'Security metric created successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update a security metric
   * @param id - The metric ID
   * @param metricData - The updated metric data
   * @param userId - The user ID making the request
   */
  static async updateMetric(id: string, metricData: {
    metricValue?: number;
    previousValue?: number;
    changePercentage?: number;
  }, userId: string) {
    try {
      const metric = await SecurityMetricService.updateMetric(id, metricData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'UPDATE_SECURITY_METRIC',
        details: `Updated security metric ${id}`
      });
      
      return successResponse(metric, 'Security metric updated successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Delete a security metric
   * @param id - The metric ID
   * @param userId - The user ID making the request
   */
  static async deleteMetric(id: string, userId: string) {
    try {
      const metric = await SecurityMetricService.deleteMetric(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'DELETE_SECURITY_METRIC',
        details: `Deleted security metric ${id}`
      });
      
      return successResponse(metric, 'Security metric deleted successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get historical metrics for a client
   * @param clientId - The client ID
   * @param metricName - The metric name
   * @param startDate - The start date
   * @param endDate - The end date
   * @param userId - The user ID making the request
   */
  static async getHistoricalMetrics(
    clientId: string,
    metricName: string,
    startDate: string,
    endDate: string,
    userId: string
  ) {
    try {
      const metrics = await SecurityMetricService.getHistoricalMetrics(
        clientId,
        metricName,
        startDate,
        endDate
      );
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_HISTORICAL_METRICS',
        details: `Retrieved historical metrics for ${metricName} (client ${clientId})`
      });
      
      return successResponse(metrics, 'Historical metrics retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }
}
