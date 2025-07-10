import { dataClient, handleDataError } from '../utils/dataClient';

/**
 * Service for handling activity logs
 */
export class ActivityLogService {
  /**
   * Get all activity logs
   * @param limit - Optional limit on the number of logs to return
   * @returns Promise with activity logs
   */
  static async getAllLogs(limit?: number) {
    try {
      const { data: logs } = await dataClient.models.ActivityLog.list({
        sort: {
          field: 'timestamp',
          direction: 'desc'
        },
        limit
      });
      return logs;
    } catch (error) {
      throw handleDataError(error, 'get all activity logs');
    }
  }

  /**
   * Get logs by user ID
   * @param userId - The user ID
   * @param limit - Optional limit on the number of logs to return
   * @returns Promise with activity logs
   */
  static async getLogsByUser(userId: string, limit?: number) {
    try {
      const { data: logs } = await dataClient.models.ActivityLog.list({
        filter: {
          userId: {
            eq: userId
          }
        },
        sort: {
          field: 'timestamp',
          direction: 'desc'
        },
        limit
      });
      return logs;
    } catch (error) {
      throw handleDataError(error, 'get logs by user');
    }
  }

  /**
   * Get logs by action type
   * @param action - The action type
   * @param limit - Optional limit on the number of logs to return
   * @returns Promise with activity logs
   */
  static async getLogsByAction(action: string, limit?: number) {
    try {
      const { data: logs } = await dataClient.models.ActivityLog.list({
        filter: {
          action: {
            eq: action
          }
        },
        sort: {
          field: 'timestamp',
          direction: 'desc'
        },
        limit
      });
      return logs;
    } catch (error) {
      throw handleDataError(error, 'get logs by action');
    }
  }

  /**
   * Get logs by date range
   * @param startDate - The start date
   * @param endDate - The end date
   * @param limit - Optional limit on the number of logs to return
   * @returns Promise with activity logs
   */
  static async getLogsByDateRange(startDate: string, endDate: string, limit?: number) {
    try {
      const { data: logs } = await dataClient.models.ActivityLog.list({
        filter: {
          timestamp: {
            between: [startDate, endDate]
          }
        },
        sort: {
          field: 'timestamp',
          direction: 'desc'
        },
        limit
      });
      return logs;
    } catch (error) {
      throw handleDataError(error, 'get logs by date range');
    }
  }

  /**
   * Create a new activity log
   * @param logData - The log data
   * @returns Promise with the created log
   */
  static async createLog(logData: {
    userId: string;
    action: string;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    try {
      const { data: log } = await dataClient.models.ActivityLog.create({
        ...logData,
        timestamp: new Date().toISOString()
      });
      return log;
    } catch (error) {
      throw handleDataError(error, 'create activity log');
    }
  }

  /**
   * Delete logs older than a specific date
   * @param date - The cutoff date
   * @returns Promise with the number of deleted logs
   */
  static async deleteOldLogs(date: string) {
    try {
      const { data: logs } = await dataClient.models.ActivityLog.list({
        filter: {
          timestamp: {
            lt: date
          }
        }
      });

      let deletedCount = 0;
      for (const log of logs) {
        await dataClient.models.ActivityLog.delete({
          id: log.id
        });
        deletedCount++;
      }

      return { deletedCount };
    } catch (error) {
      throw handleDataError(error, 'delete old logs');
    }
  }

  /**
   * Get log statistics
   * @param days - Number of days to include in statistics
   * @returns Promise with log statistics
   */
  static async getLogStatistics(days: number = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      const { data: logs } = await dataClient.models.ActivityLog.list({
        filter: {
          timestamp: {
            gt: cutoffDate.toISOString()
          }
        }
      });

      // Group by action
      const actionCounts = logs.reduce((acc, log) => {
        acc[log.action] = (acc[log.action] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Group by user
      const userCounts = logs.reduce((acc, log) => {
        acc[log.userId] = (acc[log.userId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Group by day
      const dailyCounts: Record<string, number> = {};
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        dailyCounts[dateString] = 0;
      }

      logs.forEach(log => {
        const dateString = log.timestamp.split('T')[0];
        if (dailyCounts[dateString] !== undefined) {
          dailyCounts[dateString]++;
        }
      });

      return {
        totalLogs: logs.length,
        byAction: actionCounts,
        byUser: userCounts,
        byDay: dailyCounts
      };
    } catch (error) {
      throw handleDataError(error, 'get log statistics');
    }
  }
}
