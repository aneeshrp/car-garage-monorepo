import { Db, ObjectId } from "mongodb";
import { getDb } from "../common/DbCon";

export class CompanyRepository {
    private collection_name = "companies";

    private get collection() {
        const db: Db = getDb();
        return db.collection(this.collection_name);
    }

    async findByEmail(email: string) {
        return await this.collection.findOne({ email: email });
    }

    async insertData(data: any) {
        return await this.collection.insertOne(data);
    }

    async updateData(query: any, data: any) {
        return await this.collection.findOneAndUpdate({ query }, { $set: data }, { returnDocument: "after" });
    }

    async findById(id: string) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }
    async findWithPaging(skip: number, limit: number, query: any) {
        const companies = await this.collection.find(query).skip(skip).limit(limit).toArray();
        const totalCompanies = await this.collection.countDocuments();

        return { companies, totalCompanies };
    }
}