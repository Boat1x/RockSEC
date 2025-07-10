import { dataClient, handleDataError } from '../utils/dataClient';

/**
 * Service for handling users
 */
export class UserService {
  /**
   * Get all users
   * @returns Promise with users
   */
  static async getAllUsers() {
    try {
      const { data: users } = await dataClient.models.User.list({
        sort: {
          field: 'username',
          direction: 'asc'
        }
      });
      return users;
    } catch (error) {
      throw handleDataError(error, 'get all users');
    }
  }

  /**
   * Get user by ID
   * @param id - The user ID
   * @returns Promise with the user
   */
  static async getUserById(id: string) {
    try {
      const { data: user } = await dataClient.models.User.get({
        id
      });
      return user;
    } catch (error) {
      throw handleDataError(error, 'get user by ID');
    }
  }

  /**
   * Get user by username
   * @param username - The username
   * @returns Promise with the user
   */
  static async getUserByUsername(username: string) {
    try {
      const { data: users } = await dataClient.models.User.list({
        filter: {
          username: {
            eq: username
          }
        }
      });
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      throw handleDataError(error, 'get user by username');
    }
  }

  /**
   * Get user by email
   * @param email - The email
   * @returns Promise with the user
   */
  static async getUserByEmail(email: string) {
    try {
      const { data: users } = await dataClient.models.User.list({
        filter: {
          email: {
            eq: email
          }
        }
      });
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      throw handleDataError(error, 'get user by email');
    }
  }

  /**
   * Create a new user
   * @param userData - The user data
   * @returns Promise with the created user
   */
  static async createUser(userData: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    profileImage?: string;
  }) {
    try {
      const { data: user } = await dataClient.models.User.create({
        ...userData,
        isActive: true,
        lastLogin: new Date().toISOString(),
      });
      return user;
    } catch (error) {
      throw handleDataError(error, 'create user');
    }
  }

  /**
   * Update a user
   * @param id - The user ID
   * @param userData - The updated user data
   * @returns Promise with the updated user
   */
  static async updateUser(id: string, userData: {
    firstName?: string;
    lastName?: string;
    userType?: string;
    isActive?: boolean;
    profileImage?: string;
  }) {
    try {
      const { data: user } = await dataClient.models.User.update({
        id,
        ...userData
      });
      return user;
    } catch (error) {
      throw handleDataError(error, 'update user');
    }
  }

  /**
   * Update user login timestamp
   * @param id - The user ID
   * @returns Promise with the updated user
   */
  static async updateUserLoginTimestamp(id: string) {
    try {
      const { data: user } = await dataClient.models.User.update({
        id,
        lastLogin: new Date().toISOString()
      });
      return user;
    } catch (error) {
      throw handleDataError(error, 'update user login timestamp');
    }
  }

  /**
   * Delete a user
   * @param id - The user ID
   * @returns Promise with the deleted user
   */
  static async deleteUser(id: string) {
    try {
      const { data: user } = await dataClient.models.User.delete({
        id
      });
      return user;
    } catch (error) {
      throw handleDataError(error, 'delete user');
    }
  }

  /**
   * Get users by type
   * @param userType - The user type
   * @returns Promise with users
   */
  static async getUsersByType(userType: string) {
    try {
      const { data: users } = await dataClient.models.User.list({
        filter: {
          userType: {
            eq: userType
          }
        },
        sort: {
          field: 'lastName',
          direction: 'asc'
        }
      });
      return users;
    } catch (error) {
      throw handleDataError(error, 'get users by type');
    }
  }

  /**
   * Get active users
   * @returns Promise with active users
   */
  static async getActiveUsers() {
    try {
      const { data: users } = await dataClient.models.User.list({
        filter: {
          isActive: {
            eq: true
          }
        }
      });
      return users;
    } catch (error) {
      throw handleDataError(error, 'get active users');
    }
  }
}
