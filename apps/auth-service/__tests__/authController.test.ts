import { registerUser } from "../src/controllers/authController";
import {Request, Response} from "express";
import { registerUserService } from "../src/services/authService";

jest.mock('../services/authService');

describe('Auth Controller - registerUser', () => {
    it('Should return 201 and a token on successful registration', async() => {
        const mockRequest = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                role: 'BranchAdmin'
            }
        } as Request;

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        (registerUserService as jest.Mock).mockResolvedValue({ token: 'mockToken'});

        await registerUser(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect( mockResponse.json).toHaveBeenCalledWith({
            success: true,
            message: 'User registered successfully',
            data: {token: 'mockToken'}
        });
    });
});