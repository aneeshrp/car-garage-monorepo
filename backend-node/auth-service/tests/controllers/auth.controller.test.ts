import { Request, Response } from "express";
import { login } from "../../src/controllers/auth.controller";
import { authenticateUser } from "../../src/services/user.service";
import { sendSuccess, sendError } from "../../common/responseHandler";

jest.mock('../../src/services/user.service');
jest.mock('../../common/responseHandler');

describe('Auth Controller', ()=> {
  
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

     beforeEach(() => {
        mockRequest = {
            body: {email: 'testuser', password: 'password'},
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call loginService and sendSuccess on valid login', async() => {
        (authenticateUser as jest.Mock).mockResolvedValue('mock-token');

        await login( mockRequest as Request, mockResponse as Response);
        
        expect(authenticateUser).toHaveBeenCalledWith({ email: 'testuser', password: 'password' });
        expect(sendSuccess).toHaveBeenCalledWith(mockResponse, 'User successfully Logged in', {token: 'mock-token'})
    });

    it('should call loginService and sendError on invalid login', async() => {
        const errorMessage = 'Invalid Credentials';
        const error = new Error(errorMessage);

        (authenticateUser as jest.Mock).mockRejectedValue(error);

        await login(mockRequest as Request, mockResponse as Response);

        expect(authenticateUser).toHaveBeenCalledWith({ email: 'testuser', password: 'password' });
        expect(sendError).toHaveBeenCalledWith(
            mockResponse,
            errorMessage,
            401,
            expect.any(Error)
        )
    })

})