import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import { sendError, sendSuccess } from "../common/responseHandler";
import { CompanyRepository } from "../repositories/CompanyRepository";
import { BasicOTPGenerator } from "../utlis/OTPGenerator";

interface CompanyRequest {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
    email?: string;
    status?: string;
}

const companyService = new CompanyService(new CompanyRepository(), new BasicOTPGenerator());

export const generateAuthOTP = async (req: Request, res: Response) => {
    try {
        const companyData: CompanyRequest = { ...req.body, status: req.body.status ?? 0 };
        let company: any = await companyService.createCompanyAccount(companyData);
        if( company ){
            company = await companyService.getCompanyProfileFromDB(company.insertedId);     
        }
        sendSuccess(res, 200, "OTP generated", company);

    } catch (error: any) {
        sendError(res, 500, "Unable to generate OTP", error.message);
        //throw new Error("Operation failed: " + error.message);
    }
}

export const verifyAuthOTP = async (req: Request, res: Response) => {
    try {
        const otp_verified = await companyService.verifyOTP(req.body);
        sendSuccess(res, 200, "OTP Verified Successfully", otp_verified);
    } catch (error: any) {
        sendError(res, 500, "OTP verfiication failed", error.message);
    }
}

export const createProfile = async (req: Request, res: Response) => {
    try {
        const company = await companyService.createCompanyProfile(req.body, req.params.id);
        sendSuccess(res, 201, "Company profile has been created", company);
    } catch (error: any) {
        sendError(res, 500, "Unable to create company", error.message);
    }
}

export const getCompanyProfile = async (req: Request, res: Response) => {
    try {
        const company_profile = await companyService.getCompanyProfileFromDB(req.params.id);
        sendSuccess(res, 200, "Company profile fetched successfully!!", company_profile);
    } catch (error: any) {
        sendError(res, 500, "Unable to fetch company profile", error.message);
    }
}

export const getCompanies = async (req: Request, res: Response) => {
    try {
        const page: number = parseInt(req.query.page as string) || 1;
        const perPage: number = parseInt(req.query.per_page as string) || 10;
        const searchTerm = req.query.search as string || "";
        const companies = await companyService.getCompaniesWithPaging(page, perPage, searchTerm);

        sendSuccess(res, 200, "Fetch Success", companies);
    } catch (error: any) {
        sendError(res, 500, "Fetch failed", error.message);
    }
}