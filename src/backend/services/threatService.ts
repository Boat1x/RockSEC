import { dataClient, handleDataError } from '../utils/dataClient';

/**
 * Service for handling threats
 */
export class ThreatService {
  /**
   * Get all threats for a client
   * @param clientId - The client ID
   * @returns Promise with threats
   */
  static async getThreatsByClient(clientId: string) {
    try {
      const { data: threats } = await dataClient.models.Threat.list({
        filter: {
          clientId: {
            eq: clientId
          }
        },
        sort: {
          field: 'detectedDate',
          direction: 'desc'
        }
      });
      return threats;
    } catch (error) {
      throw handleDataError(error, 'get threats');
    }
  }

  /**
   * Get threats by severity
   * @param clientId - The client ID
   * @param severity - The threat severity
   * @returns Promise with threats
   */
  static async getThreatsBySeverity(clientId: string, severity: string) {
    try {
      const { data: threats } = await dataClient.models.Threat.list({
        filter: {
          clientId: {
            eq: clientId
          },
          severity: {
            eq: severity
          }
        },
        sort: {
          field: 'detectedDate',
          direction: 'desc'
        }
      });
      return threats;
    } catch (error) {
      throw handleDataError(error, 'get threats by severity');
    }
  }

  /**
   * Get threats by status
   * @param clientId - The client ID
   * @param status - The threat status
   * @returns Promise with threats
   */
  static async getThreatsByStatus(clientId: string, status: string) {
    try {
      const { data: threats } = await dataClient.models.Threat.list({
        filter: {
          clientId: {
            eq: clientId
          },
          status: {
            eq: status
          }
        },
        sort: {
          field: 'detectedDate',
          direction: 'desc'
        }
      });
      return threats;
    } catch (error) {
      throw handleDataError(error, 'get threats by status');
    }
  }

  /**
   * Create a new threat
   * @param threatData - The threat data
   * @returns Promise with the created threat
   */
  static async createThreat(threatData: {
    clientId: string;
    threatType: string;
    severity: string;
    status: string;
    affectedSystems?: string[];
    description?: string;
    remediationSteps?: string;
  }) {
    try {
      const { data: threat } = await dataClient.models.Threat.create({
        ...threatData,
        detectedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      });
      return threat;
    } catch (error) {
      throw handleDataError(error, 'create threat');
    }
  }

  /**
   * Update a threat
   * @param id - The threat ID
   * @param threatData - The updated threat data
   * @returns Promise with the updated threat
   */
  static async updateThreat(id: string, threatData: {
    severity?: string;
    status?: string;
    affectedSystems?: string[];
    description?: string;
    remediationSteps?: string;
  }) {
    try {
      const { data: threat } = await dataClient.models.Threat.update({
        id,
        ...threatData,
        lastUpdated: new Date().toISOString(),
      });
      return threat;
    } catch (error) {
      throw handleDataError(error, 'update threat');
    }
  }

  /**
   * Delete a threat
   * @param id - The threat ID
   * @returns Promise with the deleted threat
   */
  static async deleteThreat(id: string) {
    try {
      const { data: threat } = await dataClient.models.Threat.delete({
        id
      });
      return threat;
    } catch (error) {
      throw handleDataError(error, 'delete threat');
    }
  }

  /**
   * Get threat statistics for a client
   * @param clientId - The client ID
   * @returns Promise with threat statistics
   */
  static async getThreatStatistics(clientId: string) {
    try {
      const { data: threats } = await dataClient.models.Threat.list({
        filter: {
          clientId: {
            eq: clientId
          }
        }
      });

      // Calculate statistics
      const totalThreats = threats.length;
      const criticalThreats = threats.filter(t => t.severity === 'critical').length;
      const highThreats = threats.filter(t => t.severity === 'high').length;
      const mediumThreats = threats.filter(t => t.severity === 'medium').length;
      const lowThreats = threats.filter(t => t.severity === 'low').length;
      
      const activeThreats = threats.filter(t => t.status === 'active').length;
      const mitigatedThreats = threats.filter(t => t.status === 'mitigated').length;
      const falsePositiveThreats = threats.filter(t => t.status === 'false_positive').length;

      return {
        totalThreats,
        bySeverity: {
          critical: criticalThreats,
          high: highThreats,
          medium: mediumThreats,
          low: lowThreats
        },
        byStatus: {
          active: activeThreats,
          mitigated: mitigatedThreats,
          falsePositive: falsePositiveThreats
        }
      };
    } catch (error) {
      throw handleDataError(error, 'get threat statistics');
    }
  }
}
