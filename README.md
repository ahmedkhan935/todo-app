# Todo Application

A full-stack Todo application built with Next.js, MongoDB, and NextAuth.js.

## Folder Structure

```
todo-app/
├── app/                     # Next.js 13+ app directory
│   ├── api/                # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── tasks/         # Task management endpoints
│   ├── auth/              # Auth-related pages
│   ├── dashboard/         # Dashboard page
│   └── edit/              # Task editing page
├── components/            # Reusable React components
│   ├── providers/        # Context providers
│   ├── tasks/           # Task-related components
│   └── ui/              # UI components
├── lib/                  # Utility functions
├── models/              # MongoDB models
└── types/               # TypeScript type definitions
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Run the development server:
```bash
npm run dev
```

## Configuration

### MongoDB Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env.local` file

### Google OAuth Setup
1. Go to Google Cloud Console
2. Create a new project
3. Enable OAuth2 and create credentials
4. Add authorized origins and redirect URIs
5. Add credentials to `.env.local`

## Time Complexity Analysis

### Task Operations

1. Task Addition (Create)
   - Time Complexity: O(1)
   - Space Complexity: O(1)
   - Explanation: MongoDB's insertOne operation has constant time complexity as it simply appends to the collection.

2. Task Deletion
   - Time Complexity: O(1)
   - Space Complexity: O(1)
   - Explanation: MongoDB's findOneAndDelete with _id has constant time complexity due to index-based lookup.

3. Task Update
   - Time Complexity: O(1)
   - Space Complexity: O(1)
   - Explanation: MongoDB's findOneAndUpdate with _id has constant time complexity due to index-based lookup.

4. Task Retrieval (List)
   - Time Complexity: O(n) where n is the number of tasks for the user
   - Space Complexity: O(n)
   - Explanation: Fetching all tasks requires scanning through the user's tasks.

### Authentication Operations

1. User Registration
   - Time Complexity: O(1)
   - Space Complexity: O(1)
   - Explanation: Email lookup and user creation are constant time operations due to email index.

2. User Login
   - Time Complexity: O(1)
   - Space Complexity: O(1)
   - Explanation: Email-based user lookup is a constant time operation.

## Development Assumptions

1. Database
   - MongoDB is used as the primary database
   - Indexes are created on user email and task IDs
   - Assumed reasonable document sizes (< 16MB per document)

2. Authentication
   - Users primarily use Google OAuth or email/password
   - Session tokens are stored as JWTs
   - Passwords are hashed using bcrypt

3. Performance
   - Assumed reasonable number of tasks per user (< 1000)
   - Database queries are optimized for small to medium datasets
   - Client-side state management handles immediate updates

4. Security
   - All routes are protected except auth routes
   - Users can only access their own tasks
   - API routes validate session tokens

5. UI/UX
   - Application is responsive across devices
   - Real-time updates without page refresh
   - Optimistic updates for better user experience

## Testing

Run tests:
```bash
# Run all tests
npm test

# Run tests with watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## API Routes

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### Authentication
- `POST /api/auth/register` - Register new user
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js authentication routes

