import { CompanyRepository } from "../repositories/CompanyRepository";
import { BasicOTPGenerator, OTPGenerator } from "../utlis/OTPGenerator";

export class CompanyService {
    private repostiroy: CompanyRepository;
    private otpGenerator: OTPGenerator;

    constructor(repository: CompanyRepository, otpGenerator: OTPGenerator = new BasicOTPGenerator()) {
        this.repostiroy = repository;
        this.otpGenerator = otpGenerator;
    }

    async createCompanyAccount(data: any) {
        try {
            if (!data) {
                throw new Error("Empty request !!")
            }

            const otpString = this.otpGenerator.generate();

            const account = await this.repostiroy.findByEmail(data.email);
            if (!account) {
                const dataWithOtp = { ...data, otp: otpString, updatedAt: new Date() };
                const newAccount = await this.repostiroy.insertData(dataWithOtp);
                console.log(newAccount);
                return newAccount;
            } else {
                const updatedAccount = this.repostiroy.updateData({ email: data.email }, { $set: { otp: otpString, updatedAt: new Date() } })
                return updatedAccount;
            }
        } catch (error: any) {
            throw new Error("Unable to complete the process " + error.message)
        }
    }

    async verifyOTP(data: any) {
        try {
            const company = await this.repostiroy.findById(data.id);
            if (company && (company.otp == data.otp)) {
                const updateCompany = this.repostiroy.updateData({ _id: data.id }, { $set: { otp: "", status: 1, updatedAt: new Date() } });
                return updateCompany;
            }
        } catch (error: any) {
            throw new Error("Unable to complete the process " + error.message)
        }
    }

    async createCompanyProfile(data: any, company_id: any) {

        try {

            if (!data) {
                throw new Error('Empty request !!');
            }

            const companyProfile = await this.repostiroy.findById(company_id);
            if (!companyProfile || 0 === companyProfile.status) {
                throw new Error('Company does not exists or invactive !!!');
            }

            const newCompanyProfile = await this.repostiroy.updateData({ _id: company_id }, { $set: data });

            if (!newCompanyProfile) {
                throw new Error('Document not found or update failed');
            }
            return newCompanyProfile;

        } catch (error: any) {
            console.error("Error in createCompanyProfile:", error.message);
            throw new Error(error.message || "An unexpected error occurred");
        }
    }
    async getCompanyProfileFromDB(id: string) {
        try {
            if (null === id) {
                throw new Error("Invalid company!");
            }
            const company_details = await this.repostiroy.findById(id);
            return company_details;
        } catch (error: any) {
            throw new Error("Unable to fetch company details" + error.message);
        }
    }

    async getCompaniesWithPaging(page: number, perPage: number, searchTerm: string) {
        try {
            const skip = (page - 1) * perPage;

            const query: any = {};

            if (searchTerm) {
                query.$or = [
                    { name: { $regex: searchTerm, $options: "i" } },
                    { email: { $regex: searchTerm, $options: "i" } },
                    { address: { $regex: searchTerm, $options: "i" } },
                    { city: { $regex: searchTerm, $options: "i" } },
                    { zipcode: { $regex: searchTerm, $options: "i" } },
                ]
            }
            const companies = await this.repostiroy.findWithPaging(skip, perPage, query);
            const totalPages = Math.ceil(companies.totalCompanies / perPage);
            return {
                companies,
                pagination: {
                    totalPages: totalPages,
                    page: page,
                    limit: perPage
                }
            }
        } catch (error: any) {
            throw new Error("Unable to fetch all companies")
        }
    }
}