export interface OTPGenerator {
    generate(): string;
}

export class BasicOTPGenerator implements OTPGenerator {
    generate(): string {
        return Math.floor(1000 + Math.random() * 999999).toString();
    }
}