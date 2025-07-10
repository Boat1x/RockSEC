import { ActivityLogService } from '../services/activityLogService';
import { successResponse, handleApiError } from '../utils/apiResponse';

/**
 * API handler for activity log-related operations
 */
export class ActivityLogApi {
  /**
   * Get all activity logs
   * @param limit - Optional limit on the number of logs to return
   * @param userId - The user ID making the request
   */
  static async getAllLogs(limit: number | undefined, userId: string) {
    try {
      const logs = await ActivityLogService.getAllLogs(limit);
      
      // Log this activity too
      await ActivityLogService.createLog({
        userId,
        action: 'GET_ALL_LOGS',
        details: 'Retrieved all activity logs'
      });
      
      return successResponse(logs, 'Activity logs retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get logs by user ID
   * @param targetUserId - The user ID to get logs for
   * @param limit - Optional limit on the number of logs to return
   * @param requestingUserId - The user ID making the request
   */
  static async getLogsByUser(targetUserId: string, limit: number | undefined, requestingUserId: string) {
    try {
      const logs = await ActivityLogService.getLogsByUser(targetUserId, limit);
      
      // Log this activity too
      await ActivityLogService.createLog({
        userId: requestingUserId,
        action: 'GET_USER_LOGS',
        details: `Retrieved activity logs for user ${targetUserId}`
      });
      
      return successResponse(logs, 'User activity logs retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get logs by action type
   * @param action - The action type
   * @param limit - Optional limit on the number of logs to return
   * @param userId - The user ID making the request
   */
  static async getLogsByAction(action: string, limit: number | undefined, userId: string) {
    try {
      const logs = await ActivityLogService.getLogsByAction(action, limit);
      
      // Log this activity too
      await ActivityLogService.createLog({
        userId,
        action: 'GET_ACTION_LOGS',
        details: `Retrieved logs for action type ${action}`
      });
      
      return successResponse(logs, `${action} logs retrieved successfully`);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get logs by date range
   * @param startDate - The start date
   * @param endDate - The end date
   * @param limit - Optional limit on the number of logs to return
   * @param userId - The user ID making the request
   */
  static async getLogsByDateRange(
    startDate: string, 
    endDate: string, 
    limit: number | undefined, 
    userId: string
  ) {
    try {
      const logs = await ActivityLogService.getLogsByDateRange(startDate, endDate, limit);
      
      // Log this activity too
      await ActivityLogService.createLog({
        userId,
        action: 'GET_DATE_RANGE_LOGS',
        details: `Retrieved logs from ${startDate} to ${endDate}`
      });
      
      return successResponse(logs, 'Date range logs retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Create a new activity log
   * @param logData - The log data
   */
  static async createLog(logData: {
    userId: string;
    action: string;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    try {
      const log = await ActivityLogService.createLog(logData);
      return successResponse(log, 'Activity log created successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Delete logs older than a specific date
   * @param date - The cutoff date
   * @param userId - The user ID making the request
   */
  static async deleteOldLogs(date: string, userId: string) {
    try {
      const result = await ActivityLogService.deleteOldLogs(date);
      
      // Log this activity
      await ActivityLogService.createLog({
        userId,
        action: 'DELETE_OLD_LOGS',
        details: `Deleted ${result.deletedCount} logs older than ${date}`
      });
      
      return successResponse(result, `Deleted ${result.deletedCount} logs older than ${date}`);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get log statistics
   * @param days - Number of days to include in statistics
   * @param userId - The user ID making the request
   */
  static async getLogStatistics(days: number, userId: string) {
    try {
      const statistics = await ActivityLogService.getLogStatistics(days);
      
      // Log this activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_LOG_STATISTICS',
        details: `Retrieved log statistics for the last ${days} days`
      });
      
      return successResponse(statistics, 'Log statistics retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }
}
