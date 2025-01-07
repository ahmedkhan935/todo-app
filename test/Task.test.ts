// __tests__/api/tasks.test.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import { GET, POST } from '@/src/app/api/tasks/route';
import Task from '@/models/Task';
const jest = require('next/jest');


// Mock next-auth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

// Mock mongoose
jest.mock('@/models/Task');

describe('Tasks API', () => {
  const mockSession = {
    user: {
      id: 'user123',
      email: 'test@example.com',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
  });

  describe('GET /api/tasks', () => {
    it('returns tasks for authenticated user', async () => {
      const mockTasks = [
        { _id: '1', title: 'Task 1', user: 'user123' },
        { _id: '2', title: 'Task 2', user: 'user123' },
      ];

      (Task.find as jest.Mock).mockImplementationOnce(() => ({
        sort: jest.fn().mockResolvedValue(mockTasks),
      }));

      const response = await GET();
      const data = await response.json();

      expect(response).toBeInstanceOf(NextResponse);
      expect(data).toEqual(mockTasks);
      expect(Task.find).toHaveBeenCalledWith({ user: 'user123' });
    });

    it('returns 401 for unauthenticated request', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);

      const response = await GET();
      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/tasks', () => {
    it('creates a new task for authenticated user', async () => {
      const mockTask = {
        _id: '1',
        title: 'New Task',
        user: 'user123',
      };

      (Task.create as jest.Mock).mockResolvedValue(mockTask);

      const request = new Request('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'New Task' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response).toBeInstanceOf(NextResponse);
      expect(data).toEqual(mockTask);
      expect(Task.create).toHaveBeenCalledWith({
        title: 'New Task',
        user: 'user123',
      });
    });

    it('returns 400 when title is missing', async () => {
      const request = new Request('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('returns 401 for unauthenticated request', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);

      const request = new Request('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'New Task' }),
      });

      const response = await POST(request);
      expect(response.status).toBe(401);
    });
  });
});