import { dataClient, handleDataError } from '../utils/dataClient';

/**
 * Service for handling clients
 */
export class ClientService {
  /**
   * Get all clients
   * @returns Promise with clients
   */
  static async getAllClients() {
    try {
      const { data: clients } = await dataClient.models.Client.list({
        sort: {
          field: 'name',
          direction: 'asc'
        }
      });
      return clients;
    } catch (error) {
      throw handleDataError(error, 'get all clients');
    }
  }

  /**
   * Get client by ID
   * @param id - The client ID
   * @returns Promise with the client
   */
  static async getClientById(id: string) {
    try {
      const { data: client } = await dataClient.models.Client.get({
        id
      });
      return client;
    } catch (error) {
      throw handleDataError(error, 'get client by ID');
    }
  }

  /**
   * Create a new client
   * @param clientData - The client data
   * @returns Promise with the created client
   */
  static async createClient(clientData: {
    name: string;
    contactPerson: string;
    email: string;
    phone?: string;
    address?: string;
    industry?: string;
    size?: string;
  }) {
    try {
      const { data: client } = await dataClient.models.Client.create({
        ...clientData,
        status: 'active',
        registrationDate: new Date().toISOString(),
      });
      return client;
    } catch (error) {
      throw handleDataError(error, 'create client');
    }
  }

  /**
   * Update a client
   * @param id - The client ID
   * @param clientData - The updated client data
   * @returns Promise with the updated client
   */
  static async updateClient(id: string, clientData: {
    name?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
    industry?: string;
    size?: string;
    status?: string;
  }) {
    try {
      const { data: client } = await dataClient.models.Client.update({
        id,
        ...clientData
      });
      return client;
    } catch (error) {
      throw handleDataError(error, 'update client');
    }
  }

  /**
   * Delete a client
   * @param id - The client ID
   * @returns Promise with the deleted client
   */
  static async deleteClient(id: string) {
    try {
      const { data: client } = await dataClient.models.Client.delete({
        id
      });
      return client;
    } catch (error) {
      throw handleDataError(error, 'delete client');
    }
  }

  /**
   * Get client statistics
   * @returns Promise with client statistics
   */
  static async getClientStatistics() {
    try {
      const { data: clients } = await dataClient.models.Client.list();

      // Calculate statistics
      const totalClients = clients.length;
      const activeClients = clients.filter(c => c.status === 'active').length;
      const inactiveClients = clients.filter(c => c.status === 'inactive').length;
      const pendingClients = clients.filter(c => c.status === 'pending').length;

      const smallClients = clients.filter(c => c.size === 'small').length;
      const mediumClients = clients.filter(c => c.size === 'medium').length;
      const largeClients = clients.filter(c => c.size === 'large').length;
      const enterpriseClients = clients.filter(c => c.size === 'enterprise').length;

      // Group by industry
      const industries = clients.reduce((acc, client) => {
        if (client.industry) {
          acc[client.industry] = (acc[client.industry] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return {
        totalClients,
        byStatus: {
          active: activeClients,
          inactive: inactiveClients,
          pending: pendingClients
        },
        bySize: {
          small: smallClients,
          medium: mediumClients,
          large: largeClients,
          enterprise: enterpriseClients
        },
        byIndustry: industries
      };
    } catch (error) {
      throw handleDataError(error, 'get client statistics');
    }
  }
}
