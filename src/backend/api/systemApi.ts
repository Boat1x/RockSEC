import { SystemService } from '../services/systemService';
import { successResponse, handleApiError } from '../utils/apiResponse';
import { ActivityLogService } from '../services/activityLogService';

/**
 * API handler for system-related operations
 */
export class SystemApi {
  /**
   * Get all systems for a client
   * @param clientId - The client ID
   * @param userId - The user ID making the request
   */
  static async getSystems(clientId: string, userId: string) {
    try {
      const systems = await SystemService.getSystemsByClient(clientId);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_SYSTEMS',
        details: `Retrieved systems for client ${clientId}`
      });
      
      return successResponse(systems, 'Systems retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get systems by status
   * @param clientId - The client ID
   * @param status - The system status
   * @param userId - The user ID making the request
   */
  static async getSystemsByStatus(clientId: string, status: string, userId: string) {
    try {
      const systems = await SystemService.getSystemsByStatus(clientId, status);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_SYSTEMS_BY_STATUS',
        details: `Retrieved ${status} systems for client ${clientId}`
      });
      
      return successResponse(systems, `${status} systems retrieved successfully`);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get system by ID
   * @param id - The system ID
   * @param userId - The user ID making the request
   */
  static async getSystemById(id: string, userId: string) {
    try {
      const system = await SystemService.getSystemById(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_SYSTEM',
        details: `Retrieved system ${id}`
      });
      
      return successResponse(system, 'System retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Create a new system
   * @param systemData - The system data
   * @param userId - The user ID making the request
   */
  static async createSystem(systemData: {
    clientId: string;
    name: string;
    systemType: string;
    ipAddress?: string;
    macAddress?: string;
    operatingSystem?: string;
  }, userId: string) {
    try {
      const system = await SystemService.createSystem(systemData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'CREATE_SYSTEM',
        details: `Created new system "${systemData.name}" for client ${systemData.clientId}`
      });
      
      return successResponse(system, 'System created successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update a system
   * @param id - The system ID
   * @param systemData - The updated system data
   * @param userId - The user ID making the request
   */
  static async updateSystem(id: string, systemData: {
    name?: string;
    systemType?: string;
    ipAddress?: string;
    macAddress?: string;
    operatingSystem?: string;
    lastScanDate?: string;
    securityScore?: number;
    vulnerabilities?: number;
    status?: string;
  }, userId: string) {
    try {
      const system = await SystemService.updateSystem(id, systemData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'UPDATE_SYSTEM',
        details: `Updated system ${id}`
      });
      
      return successResponse(system, 'System updated successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Delete a system
   * @param id - The system ID
   * @param userId - The user ID making the request
   */
  static async deleteSystem(id: string, userId: string) {
    try {
      const system = await SystemService.deleteSystem(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'DELETE_SYSTEM',
        details: `Deleted system ${id}`
      });
      
      return successResponse(system, 'System deleted successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update system security score
   * @param id - The system ID
   * @param securityScore - The new security score
   * @param vulnerabilities - The number of vulnerabilities
   * @param userId - The user ID making the request
   */
  static async updateSystemSecurityScore(
    id: string, 
    securityScore: number, 
    vulnerabilities: number, 
    userId: string
  ) {
    try {
      const system = await SystemService.updateSystemSecurityScore(id, securityScore, vulnerabilities);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'UPDATE_SYSTEM_SECURITY_SCORE',
        details: `Updated security score for system ${id} to ${securityScore}`
      });
      
      return successResponse(system, 'System security score updated successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get system statistics for a client
   * @param clientId - The client ID
   * @param userId - The user ID making the request
   */
  static async getSystemStatistics(clientId: string, userId: string) {
    try {
      const statistics = await SystemService.getSystemStatistics(clientId);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_SYSTEM_STATISTICS',
        details: `Retrieved system statistics for client ${clientId}`
      });
      
      return successResponse(statistics, 'System statistics retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }
}
