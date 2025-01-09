import { generateAuthOTP } from "../../src/controllers/company.controller";
import { CompanyService } from "../../src/services/company.service";
import { sendSuccess, sendError } from "../../src/common/responseHandler";
import { afterEach, describe } from "node:test";

jest.mock("../../src/services/company.service");
jest.mock("../../src/common/responseHandler", () => ({
    sendSuccess: jest.fn(),
    sendError: jest.fn()
}));

const mockCreateCompanyAccount = jest.fn();
const mockgetCompanyProfileFromDB = jest.fn();
jest.spyOn(CompanyService.prototype, "createCompanyAccount").mockImplementation(mockCreateCompanyAccount);
jest.spyOn(CompanyService.prototype, "getCompanyProfileFromDB").mockImplementationOnce(mockgetCompanyProfileFromDB);


describe('genereateOTP Auth Contreoller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should call sendSuccess with the correct response when OTP is generated successfully', async () => {
        //Arrange
        const mockRequest = {
            body: {
                email: "test@company.com",
                status: undefined
            }
        }

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockInsertedId = '677edf170ee8831fc50a414b';

        const mockCompanyData = {
            _id: mockInsertedId,
            email: "nine@three.com",
            status: 0,
            otp: "853339",
            updatedAt: "2025-01-08T20:24:55.768Z",
        };

        mockCreateCompanyAccount.mockResolvedValue ({insertedId: mockInsertedId});
        mockgetCompanyProfileFromDB.mockResolvedValueOnce(mockCompanyData);

        //Act
        await generateAuthOTP(mockRequest as any, mockResponse as any);

        //Assert
        expect(mockCreateCompanyAccount).toHaveBeenCalledWith({
            email: "test@company.com",
            status: 0
        });

        expect(mockgetCompanyProfileFromDB).toHaveBeenCalledWith(mockInsertedId);

        expect(sendSuccess).toHaveBeenCalledWith(mockResponse,200, "OTP generated", mockCompanyData);

    });

    it("Should call sendError with the correct response when system failed to generate OTP", async() => {
        //Arrange 
        const mockRequest = {
            body: {
                email: "test@company.com",
                status: undefined
            }
        }

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockError = new Error("Database error");
        mockCreateCompanyAccount.mockRejectedValue(mockError);

        //Act
        await generateAuthOTP(mockRequest as any, mockResponse as any);

        //Assert
        expect(mockCreateCompanyAccount).toHaveBeenCalledWith({
            email: "test@company.com",
            status: 0            
        });

        expect(sendError).toHaveBeenCalledWith(mockResponse, 500, "Unable to generate OTP", mockError.message);
    });
});
