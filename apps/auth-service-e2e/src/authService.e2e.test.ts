import request from 'supertest';
import app from '../../../apps/auth-service/src/main';
import mongoose from 'mongoose';

describe('Auth Service - E2E Tests', () => {
    afterAll(async()=> {
        await mongoose.connection.close();
    });

  it('Should register a user and return a token', async() => {
    const response = await request(app).post('/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'BranchAdmin'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('token');
  }, 10000)
})