import { dataClient, handleDataError } from '../utils/dataClient';

/**
 * Service for handling security metrics
 */
export class SecurityMetricService {
  /**
   * Get all security metrics for a client
   * @param clientId - The client ID
   * @returns Promise with security metrics
   */
  static async getMetricsByClient(clientId: string) {
    try {
      const { data: metrics } = await dataClient.models.SecurityMetric.list({
        filter: {
          clientId: {
            eq: clientId
          }
        }
      });
      return metrics;
    } catch (error) {
      throw handleDataError(error, 'get security metrics');
    }
  }

  /**
   * Get security metrics by category
   * @param clientId - The client ID
   * @param category - The metric category
   * @returns Promise with security metrics
   */
  static async getMetricsByCategory(clientId: string, category: string) {
    try {
      const { data: metrics } = await dataClient.models.SecurityMetric.list({
        filter: {
          clientId: {
            eq: clientId
          },
          category: {
            eq: category
          }
        }
      });
      return metrics;
    } catch (error) {
      throw handleDataError(error, 'get security metrics by category');
    }
  }

  /**
   * Create a new security metric
   * @param metricData - The metric data
   * @returns Promise with the created metric
   */
  static async createMetric(metricData: {
    clientId: string;
    metricName: string;
    metricValue: number;
    previousValue?: number;
    changePercentage?: number;
    category: string;
  }) {
    try {
      const { data: metric } = await dataClient.models.SecurityMetric.create({
        ...metricData,
        lastUpdated: new Date().toISOString(),
      });
      return metric;
    } catch (error) {
      throw handleDataError(error, 'create security metric');
    }
  }

  /**
   * Update a security metric
   * @param id - The metric ID
   * @param metricData - The updated metric data
   * @returns Promise with the updated metric
   */
  static async updateMetric(id: string, metricData: {
    metricValue?: number;
    previousValue?: number;
    changePercentage?: number;
  }) {
    try {
      const { data: metric } = await dataClient.models.SecurityMetric.update({
        id,
        ...metricData,
        lastUpdated: new Date().toISOString(),
      });
      return metric;
    } catch (error) {
      throw handleDataError(error, 'update security metric');
    }
  }

  /**
   * Delete a security metric
   * @param id - The metric ID
   * @returns Promise with the deleted metric
   */
  static async deleteMetric(id: string) {
    try {
      const { data: metric } = await dataClient.models.SecurityMetric.delete({
        id
      });
      return metric;
    } catch (error) {
      throw handleDataError(error, 'delete security metric');
    }
  }

  /**
   * Get historical metrics for a client
   * @param clientId - The client ID
   * @param metricName - The metric name
   * @param startDate - The start date
   * @param endDate - The end date
   * @returns Promise with historical metrics
   */
  static async getHistoricalMetrics(
    clientId: string,
    metricName: string,
    startDate: string,
    endDate: string
  ) {
    try {
      const { data: metrics } = await dataClient.models.MetricHistory.list({
        filter: {
          clientId: {
            eq: clientId
          },
          metricName: {
            eq: metricName
          },
          timestamp: {
            between: [startDate, endDate]
          }
        },
        sort: {
          field: 'timestamp',
          direction: 'asc'
        }
      });
      return metrics;
    } catch (error) {
      throw handleDataError(error, 'get historical metrics');
    }
  }
}
