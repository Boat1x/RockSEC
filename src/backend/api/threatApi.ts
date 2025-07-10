import { ThreatService } from '../services/threatService';
import { successResponse, errorResponse, handleApiError } from '../utils/apiResponse';
import { ActivityLogService } from '../services/activityLogService';

/**
 * API handler for threat-related operations
 */
export class ThreatApi {
  /**
   * Get all threats for a client
   * @param clientId - The client ID
   * @param userId - The user ID making the request
   */
  static async getThreats(clientId: string, userId: string) {
    try {
      const threats = await ThreatService.getThreatsByClient(clientId);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_THREATS',
        details: `Retrieved threats for client ${clientId}`
      });
      
      return successResponse(threats, 'Threats retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get threats by severity
   * @param clientId - The client ID
   * @param severity - The threat severity
   * @param userId - The user ID making the request
   */
  static async getThreatsBySeverity(clientId: string, severity: string, userId: string) {
    try {
      const threats = await ThreatService.getThreatsBySeverity(clientId, severity);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_THREATS_BY_SEVERITY',
        details: `Retrieved ${severity} threats for client ${clientId}`
      });
      
      return successResponse(threats, `${severity} threats retrieved successfully`);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get threats by status
   * @param clientId - The client ID
   * @param status - The threat status
   * @param userId - The user ID making the request
   */
  static async getThreatsByStatus(clientId: string, status: string, userId: string) {
    try {
      const threats = await ThreatService.getThreatsByStatus(clientId, status);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_THREATS_BY_STATUS',
        details: `Retrieved ${status} threats for client ${clientId}`
      });
      
      return successResponse(threats, `${status} threats retrieved successfully`);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Create a new threat
   * @param threatData - The threat data
   * @param userId - The user ID making the request
   */
  static async createThreat(threatData: {
    clientId: string;
    threatType: string;
    severity: string;
    status: string;
    affectedSystems?: string[];
    description?: string;
    remediationSteps?: string;
  }, userId: string) {
    try {
      const threat = await ThreatService.createThreat(threatData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'CREATE_THREAT',
        details: `Created new threat "${threatData.threatType}" for client ${threatData.clientId}`
      });
      
      return successResponse(threat, 'Threat created successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update a threat
   * @param id - The threat ID
   * @param threatData - The updated threat data
   * @param userId - The user ID making the request
   */
  static async updateThreat(id: string, threatData: {
    severity?: string;
    status?: string;
    affectedSystems?: string[];
    description?: string;
    remediationSteps?: string;
  }, userId: string) {
    try {
      const threat = await ThreatService.updateThreat(id, threatData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'UPDATE_THREAT',
        details: `Updated threat ${id}`
      });
      
      return successResponse(threat, 'Threat updated successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Delete a threat
   * @param id - The threat ID
   * @param userId - The user ID making the request
   */
  static async deleteThreat(id: string, userId: string) {
    try {
      const threat = await ThreatService.deleteThreat(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'DELETE_THREAT',
        details: `Deleted threat ${id}`
      });
      
      return successResponse(threat, 'Threat deleted successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get threat statistics for a client
   * @param clientId - The client ID
   * @param userId - The user ID making the request
   */
  static async getThreatStatistics(clientId: string, userId: string) {
    try {
      const statistics = await ThreatService.getThreatStatistics(clientId);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_THREAT_STATISTICS',
        details: `Retrieved threat statistics for client ${clientId}`
      });
      
      return successResponse(statistics, 'Threat statistics retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }
}
