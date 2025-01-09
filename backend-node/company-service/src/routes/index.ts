import { Router } from "express";
import { generateAuthOTP, verifyAuthOTP, createProfile, getCompanyProfile, getCompanies } from "../controllers/company.controller";

const router = Router();

router.get('/home', () => {
    console.log('Welcome to home !!!');
});
router.get(`/`, getCompanies)
router.post('/generate-otp', generateAuthOTP);
router.post(`/verify-otp`, verifyAuthOTP);
router.put(`/profile/:id`, createProfile);
router.get(`/profile/:id`, getCompanyProfile);
//router.delete(`/profile/:id`, delet);


export default router;