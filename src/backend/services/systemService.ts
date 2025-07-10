import { dataClient, handleDataError } from '../utils/dataClient';

/**
 * Service for handling systems (protected devices/servers)
 */
export class SystemService {
  /**
   * Get all systems for a client
   * @param clientId - The client ID
   * @returns Promise with systems
   */
  static async getSystemsByClient(clientId: string) {
    try {
      const { data: systems } = await dataClient.models.System.list({
        filter: {
          clientId: {
            eq: clientId
          }
        },
        sort: {
          field: 'name',
          direction: 'asc'
        }
      });
      return systems;
    } catch (error) {
      throw handleDataError(error, 'get systems');
    }
  }

  /**
   * Get systems by status
   * @param clientId - The client ID
   * @param status - The system status
   * @returns Promise with systems
   */
  static async getSystemsByStatus(clientId: string, status: string) {
    try {
      const { data: systems } = await dataClient.models.System.list({
        filter: {
          clientId: {
            eq: clientId
          },
          status: {
            eq: status
          }
        }
      });
      return systems;
    } catch (error) {
      throw handleDataError(error, 'get systems by status');
    }
  }

  /**
   * Get system by ID
   * @param id - The system ID
   * @returns Promise with the system
   */
  static async getSystemById(id: string) {
    try {
      const { data: system } = await dataClient.models.System.get({
        id
      });
      return system;
    } catch (error) {
      throw handleDataError(error, 'get system by ID');
    }
  }

  /**
   * Create a new system
   * @param systemData - The system data
   * @returns Promise with the created system
   */
  static async createSystem(systemData: {
    clientId: string;
    name: string;
    systemType: string;
    ipAddress?: string;
    macAddress?: string;
    operatingSystem?: string;
  }) {
    try {
      const { data: system } = await dataClient.models.System.create({
        ...systemData,
        status: 'protected',
        vulnerabilities: 0,
        securityScore: 100,
      });
      return system;
    } catch (error) {
      throw handleDataError(error, 'create system');
    }
  }

  /**
   * Update a system
   * @param id - The system ID
   * @param systemData - The updated system data
   * @returns Promise with the updated system
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
  }) {
    try {
      const { data: system } = await dataClient.models.System.update({
        id,
        ...systemData
      });
      return system;
    } catch (error) {
      throw handleDataError(error, 'update system');
    }
  }

  /**
   * Delete a system
   * @param id - The system ID
   * @returns Promise with the deleted system
   */
  static async deleteSystem(id: string) {
    try {
      const { data: system } = await dataClient.models.System.delete({
        id
      });
      return system;
    } catch (error) {
      throw handleDataError(error, 'delete system');
    }
  }

  /**
   * Update system security score
   * @param id - The system ID
   * @param securityScore - The new security score
   * @param vulnerabilities - The number of vulnerabilities
   * @returns Promise with the updated system
   */
  static async updateSystemSecurityScore(id: string, securityScore: number, vulnerabilities: number) {
    try {
      const { data: system } = await dataClient.models.System.update({
        id,
        securityScore,
        vulnerabilities,
        lastScanDate: new Date().toISOString()
      });
      return system;
    } catch (error) {
      throw handleDataError(error, 'update system security score');
    }
  }

  /**
   * Get system statistics for a client
   * @param clientId - The client ID
   * @returns Promise with system statistics
   */
  static async getSystemStatistics(clientId: string) {
    try {
      const { data: systems } = await dataClient.models.System.list({
        filter: {
          clientId: {
            eq: clientId
          }
        }
      });

      // Calculate statistics
      const totalSystems = systems.length;
      const protectedSystems = systems.filter(s => s.status === 'protected').length;
      const atRiskSystems = systems.filter(s => s.status === 'at_risk').length;
      const compromisedSystems = systems.filter(s => s.status === 'compromised').length;
      const inactiveSystems = systems.filter(s => s.status === 'inactive').length;
      
      const totalVulnerabilities = systems.reduce((sum, system) => sum + (system.vulnerabilities || 0), 0);
      
      // Calculate average security score
      const averageSecurityScore = systems.length > 0
        ? systems.reduce((sum, system) => sum + (system.securityScore || 0), 0) / systems.length
        : 0;
      
      // Group by system type
      const systemTypes = systems.reduce((acc, system) => {
        acc[system.systemType] = (acc[system.systemType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Group by operating system
      const operatingSystems = systems.reduce((acc, system) => {
        if (system.operatingSystem) {
          acc[system.operatingSystem] = (acc[system.operatingSystem] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return {
        totalSystems,
        byStatus: {
          protected: protectedSystems,
          atRisk: atRiskSystems,
          compromised: compromisedSystems,
          inactive: inactiveSystems
        },
        totalVulnerabilities,
        averageSecurityScore,
        bySystemType: systemTypes,
        byOperatingSystem: operatingSystems
      };
    } catch (error) {
      throw handleDataError(error, 'get system statistics');
    }
  }
}
