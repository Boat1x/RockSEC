import { dataClient, handleDataError } from '../utils/dataClient';

/**
 * Service for handling security scans
 */
export class SecurityScanService {
  /**
   * Get all security scans for a client
   * @param clientId - The client ID
   * @returns Promise with security scans
   */
  static async getScansByClient(clientId: string) {
    try {
      const { data: scans } = await dataClient.models.SecurityScan.list({
        filter: {
          clientId: {
            eq: clientId
          }
        },
        sort: {
          field: 'startTime',
          direction: 'desc'
        }
      });
      return scans;
    } catch (error) {
      throw handleDataError(error, 'get security scans');
    }
  }

  /**
   * Get security scans by status
   * @param clientId - The client ID
   * @param status - The scan status
   * @returns Promise with security scans
   */
  static async getScansByStatus(clientId: string, status: string) {
    try {
      const { data: scans } = await dataClient.models.SecurityScan.list({
        filter: {
          clientId: {
            eq: clientId
          },
          status: {
            eq: status
          }
        },
        sort: {
          field: 'startTime',
          direction: 'desc'
        }
      });
      return scans;
    } catch (error) {
      throw handleDataError(error, 'get security scans by status');
    }
  }

  /**
   * Create a new security scan
   * @param scanData - The scan data
   * @returns Promise with the created scan
   */
  static async createScan(scanData: {
    clientId: string;
    scanType: string;
    initiatedBy: string;
    systemsCovered?: number;
  }) {
    try {
      const { data: scan } = await dataClient.models.SecurityScan.create({
        ...scanData,
        startTime: new Date().toISOString(),
        status: 'scheduled',
        findings: 0,
      });
      return scan;
    } catch (error) {
      throw handleDataError(error, 'create security scan');
    }
  }

  /**
   * Update a security scan
   * @param id - The scan ID
   * @param scanData - The updated scan data
   * @returns Promise with the updated scan
   */
  static async updateScan(id: string, scanData: {
    status?: string;
    endTime?: string;
    findings?: number;
    systemsCovered?: number;
    reportId?: string;
  }) {
    try {
      const { data: scan } = await dataClient.models.SecurityScan.update({
        id,
        ...scanData
      });
      return scan;
    } catch (error) {
      throw handleDataError(error, 'update security scan');
    }
  }

  /**
   * Delete a security scan
   * @param id - The scan ID
   * @returns Promise with the deleted scan
   */
  static async deleteScan(id: string) {
    try {
      const { data: scan } = await dataClient.models.SecurityScan.delete({
        id
      });
      return scan;
    } catch (error) {
      throw handleDataError(error, 'delete security scan');
    }
  }

  /**
   * Start a security scan
   * @param id - The scan ID
   * @returns Promise with the updated scan
   */
  static async startScan(id: string) {
    try {
      const { data: scan } = await dataClient.models.SecurityScan.update({
        id,
        status: 'in_progress',
        startTime: new Date().toISOString()
      });
      return scan;
    } catch (error) {
      throw handleDataError(error, 'start security scan');
    }
  }

  /**
   * Complete a security scan
   * @param id - The scan ID
   * @param findings - The number of findings
   * @param reportId - The report ID
   * @returns Promise with the updated scan
   */
  static async completeScan(id: string, findings: number, reportId?: string) {
    try {
      const { data: scan } = await dataClient.models.SecurityScan.update({
        id,
        status: 'completed',
        endTime: new Date().toISOString(),
        findings,
        reportId
      });
      return scan;
    } catch (error) {
      throw handleDataError(error, 'complete security scan');
    }
  }

  /**
   * Fail a security scan
   * @param id - The scan ID
   * @returns Promise with the updated scan
   */
  static async failScan(id: string) {
    try {
      const { data: scan } = await dataClient.models.SecurityScan.update({
        id,
        status: 'failed',
        endTime: new Date().toISOString()
      });
      return scan;
    } catch (error) {
      throw handleDataError(error, 'fail security scan');
    }
  }

  /**
   * Get scan statistics for a client
   * @param clientId - The client ID
   * @returns Promise with scan statistics
   */
  static async getScanStatistics(clientId: string) {
    try {
      const { data: scans } = await dataClient.models.SecurityScan.list({
        filter: {
          clientId: {
            eq: clientId
          }
        }
      });

      // Calculate statistics
      const totalScans = scans.length;
      const completedScans = scans.filter(s => s.status === 'completed').length;
      const failedScans = scans.filter(s => s.status === 'failed').length;
      const inProgressScans = scans.filter(s => s.status === 'in_progress').length;
      const scheduledScans = scans.filter(s => s.status === 'scheduled').length;
      
      const totalFindings = scans.reduce((sum, scan) => sum + (scan.findings || 0), 0);
      
      // Group by scan type
      const scanTypes = scans.reduce((acc, scan) => {
        acc[scan.scanType] = (acc[scan.scanType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalScans,
        byStatus: {
          completed: completedScans,
          failed: failedScans,
          inProgress: inProgressScans,
          scheduled: scheduledScans
        },
        totalFindings,
        byScanType: scanTypes
      };
    } catch (error) {
      throw handleDataError(error, 'get scan statistics');
    }
  }
}
