import { UserService } from '../services/userService';
import { successResponse, handleApiError } from '../utils/apiResponse';
import { ActivityLogService } from '../services/activityLogService';

/**
 * API handler for user-related operations
 */
export class UserApi {
  /**
   * Get all users
   * @param userId - The user ID making the request
   */
  static async getAllUsers(userId: string) {
    try {
      const users = await UserService.getAllUsers();
      
      // Log the activity
      await ActivityLogService.createLog({
        userId,
        action: 'GET_ALL_USERS',
        details: 'Retrieved all users'
      });
      
      return successResponse(users, 'Users retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get user by ID
   * @param id - The user ID
   * @param requestingUserId - The user ID making the request
   */
  static async getUserById(id: string, requestingUserId: string) {
    try {
      const user = await UserService.getUserById(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId: requestingUserId,
        action: 'GET_USER',
        details: `Retrieved user ${id}`
      });
      
      return successResponse(user, 'User retrieved successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Create a new user
   * @param userData - The user data
   * @param requestingUserId - The user ID making the request
   */
  static async createUser(userData: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    profileImage?: string;
  }, requestingUserId: string) {
    try {
      const user = await UserService.createUser(userData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId: requestingUserId,
        action: 'CREATE_USER',
        details: `Created new user "${userData.username}"`
      });
      
      return successResponse(user, 'User created successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update a user
   * @param id - The user ID
   * @param userData - The updated user data
   * @param requestingUserId - The user ID making the request
   */
  static async updateUser(id: string, userData: {
    firstName?: string;
    lastName?: string;
    userType?: string;
    isActive?: boolean;
    profileImage?: string;
  }, requestingUserId: string) {
    try {
      const user = await UserService.updateUser(id, userData);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId: requestingUserId,
        action: 'UPDATE_USER',
        details: `Updated user ${id}`
      });
      
      return successResponse(user, 'User updated successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Delete a user
   * @param id - The user ID
   * @param requestingUserId - The user ID making the request
   */
  static async deleteUser(id: string, requestingUserId: string) {
    try {
      const user = await UserService.deleteUser(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId: requestingUserId,
        action: 'DELETE_USER',
        details: `Deleted user ${id}`
      });
      
      return successResponse(user, 'User deleted successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get users by type
   * @param userType - The user type
   * @param requestingUserId - The user ID making the request
   */
  static async getUsersByType(userType: string, requestingUserId: string) {
    try {
      const users = await UserService.getUsersByType(userType);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId: requestingUserId,
        action: 'GET_USERS_BY_TYPE',
        details: `Retrieved ${userType} users`
      });
      
      return successResponse(users, `${userType} users retrieved successfully`);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update user login timestamp
   * @param id - The user ID
   */
  static async updateUserLoginTimestamp(id: string) {
    try {
      const user = await UserService.updateUserLoginTimestamp(id);
      
      // Log the activity
      await ActivityLogService.createLog({
        userId: id,
        action: 'USER_LOGIN',
        details: `User ${id} logged in`
      });
      
      return successResponse(user, 'User login timestamp updated successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }
}
