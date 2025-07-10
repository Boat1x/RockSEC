import { SecurityScanService } from '../services/securityScanService';
import { successResponse, handleApiError } from '../utils/apiResponse';
import { ActivityLogService } from '../services/activityLogService';

/**
 * API handler for security scan-related operations
 */
export class SecurityScanApi {
  /**
   * Get all security scans for a client
   * @param clientId - The client ID
   * @param userId - The user ID making the request
   */
  static async getScans(clientId: string, userId: string) {
    try {
      const scans = await SecurityScanService.getScansByClient(clientId);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_SECURITY_SCANS',
        details: `Retrieved security scans for client ${clientId}`
      });
      
      return successResponse(scans, 'Security scans retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get security scans by status
   * @param clientId - The client ID
   * @param status - The scan status
   * @param userId - The user ID making the request
   */
  static async getScansByStatus(clientId: string, status: string, userId: string) {
    try {
      const scans = await SecurityScanService.getScansByStatus(clientId, status);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_SCANS_BY_STATUS',
        details: `Retrieved ${status} scans for client ${clientId}`
      });
      
      return successResponse(scans, `${status} scans retrieved successfully`);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Create a new security scan
   * @param scanData - The scan data
   * @param userId - The user ID making the request
   */
  static async createScan(scanData: {
    clientId: string;
    scanType: string;
    systemsCovered?: number;
  }, userId: string) {
    try {
      const scan = await SecurityScanService.createScan({
        ...scanData,
        initiatedBy: userId
      });
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'CREATE_SECURITY_SCAN',
        details: `Created new ${scanData.scanType} scan for client ${scanData.clientId}`
      });
      
      return successResponse(scan, 'Security scan created successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update a security scan
   * @param id - The scan ID
   * @param scanData - The updated scan data
   * @param userId - The user ID making the request
   */
  static async updateScan(id: string, scanData: {
    status?: string;
    endTime?: string;
    findings?: number;
    systemsCovered?: number;
    reportId?: string;
  }, userId: string) {
    try {
      const scan = await SecurityScanService.updateScan(id, scanData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'UPDATE_SECURITY_SCAN',
        details: `Updated security scan ${id}`
      });
      
      return successResponse(scan, 'Security scan updated successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Delete a security scan
   * @param id - The scan ID
   * @param userId - The user ID making the request
   */
  static async deleteScan(id: string, userId: string) {
    try {
      const scan = await SecurityScanService.deleteScan(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'DELETE_SECURITY_SCAN',
        details: `Deleted security scan ${id}`
      });
      
      return successResponse(scan, 'Security scan deleted successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Start a security scan
   * @param id - The scan ID
   * @param userId - The user ID making the request
   */
  static async startScan(id: string, userId: string) {
    try {
      const scan = await SecurityScanService.startScan(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'START_SECURITY_SCAN',
        details: `Started security scan ${id}`
      });
      
      return successResponse(scan, 'Security scan started successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Complete a security scan
   * @param id - The scan ID
   * @param findings - The number of findings
   * @param reportId - The report ID
   * @param userId - The user ID making the request
   */
  static async completeScan(id: string, findings: number, reportId: string | undefined, userId: string) {
    try {
      const scan = await SecurityScanService.completeScan(id, findings, reportId);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'COMPLETE_SECURITY_SCAN',
        details: `Completed security scan ${id} with ${findings} findings`
      });
      
      return successResponse(scan, 'Security scan completed successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Fail a security scan
   * @param id - The scan ID
   * @param userId - The user ID making the request
   */
  static async failScan(id: string, userId: string) {
    try {
      const scan = await SecurityScanService.failScan(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'FAIL_SECURITY_SCAN',
        details: `Failed security scan ${id}`
      });
      
      return successResponse(scan, 'Security scan marked as failed');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get scan statistics for a client
   * @param clientId - The client ID
   * @param userId - The user ID making the request
   */
  static async getScanStatistics(clientId: string, userId: string) {
    try {
      const statistics = await SecurityScanService.getScanStatistics(clientId);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_SCAN_STATISTICS',
        details: `Retrieved scan statistics for client ${clientId}`
      });
      
      return successResponse(statistics, 'Scan statistics retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }
}
