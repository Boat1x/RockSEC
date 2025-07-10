import { ClientService } from '../services/clientService';
import { successResponse, handleApiError } from '../utils/apiResponse';
import { ActivityLogService } from '../services/activityLogService';

/**
 * API handler for client-related operations
 */
export class ClientApi {
  /**
   * Get all clients
   * @param userId - The user ID making the request
   */
  static async getAllClients(userId: string) {
    try {
      const clients = await ClientService.getAllClients();
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_ALL_CLIENTS',
        details: 'Retrieved all clients'
      });
      
      return successResponse(clients, 'Clients retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get client by ID
   * @param id - The client ID
   * @param userId - The user ID making the request
   */
  static async getClientById(id: string, userId: string) {
    try {
      const client = await ClientService.getClientById(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_CLIENT',
        details: `Retrieved client ${id}`
      });
      
      return successResponse(client, 'Client retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Create a new client
   * @param clientData - The client data
   * @param userId - The user ID making the request
   */
  static async createClient(clientData: {
    name: string;
    contactPerson: string;
    email: string;
    phone?: string;
    address?: string;
    industry?: string;
    size?: string;
  }, userId: string) {
    try {
      const client = await ClientService.createClient(clientData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'CREATE_CLIENT',
        details: `Created new client "${clientData.name}"`
      });
      
      return successResponse(client, 'Client created successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update a client
   * @param id - The client ID
   * @param clientData - The updated client data
   * @param userId - The user ID making the request
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
  }, userId: string) {
    try {
      const client = await ClientService.updateClient(id, clientData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'UPDATE_CLIENT',
        details: `Updated client ${id}`
      });
      
      return successResponse(client, 'Client updated successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Delete a client
   * @param id - The client ID
   * @param userId - The user ID making the request
   */
  static async deleteClient(id: string, userId: string) {
    try {
      const client = await ClientService.deleteClient(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'DELETE_CLIENT',
        details: `Deleted client ${id}`
      });
      
      return successResponse(client, 'Client deleted successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get client statistics
   * @param userId - The user ID making the request
   */
  static async getClientStatistics(userId: string) {
    try {
      const statistics = await ClientService.getClientStatistics();
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_CLIENT_STATISTICS',
        details: 'Retrieved client statistics'
      });
      
      return successResponse(statistics, 'Client statistics retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }
}
