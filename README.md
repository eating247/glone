# Gmail clone

For this project, you will be building a lightweight Gmail inbox clone using the provided starter code using **Next.js**, **Nest.js**, and **Prisma** connected to a **SQLite** database.


## Project Overview

Your task is to create a functional Gmail inbox clone that allows users to view, interact with, and manage emails. You're expected to complete this task in **up to 3 hours**. If you run out of time, it's ok to to submit an incomplete project, and note down any further steps you would have taken if time permitted. In the chance you are able to complete this in less time than expected, feel free to add some more features as you see fit- this is a great opportunity to show off areas of the stack you are particularly experienced with/excited about.

### Use The Tools You Use!

We aren't prescriptive about which text editor or tools you use. You should feel free to use any resources, AI tools, etc. that you normally use. Just make sure the code is your own and you're able to explain the choices you made.

### What You Need to Build

Create an email inbox interface that includes the following features:

#### Core Requirements
- **Email Display**: Show a list of emails with sender, subject, timestamp, and read status
- **Email Reading**: Allow users to click and read full email content
- **Star/Unstar**: Users should be able to star and unstar emails
- **Delete Emails**: Implement email deletion functionality
- **Priority Filtering**: Filter emails by priority level (LOW, NORMAL, HIGH, URGENT)
- **Documentation**: You are expected to keep this README up to date with any necessary information based on your implementation. **Please make note of any decisions you've made, or areas that will need to be addressed in future iterations**.

#### Additional Expectations
- **Clean Code**: Write well-organized, readable code with clear component structure
- **Best Practices**: Follow React/Next.js and Node.js best practices
- **Performance**: Ensure your solution is optimized for performance. While this is a lightweight implementation, think about how it would scale to 100,000's of emails.
- **Error Handling**: Implement proper error handling for API calls

#### The following is NOT expected
- **Authentication**: No login/signup required
- **Email Composition**: No need to create new emails
- **Real Email Integration**: This is a mock interface only
- **Advanced Features**: Focus on core functionality and maintainability over bells and whistles


## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone/Download the project** and navigate to the directory:
   ```bash
   cd gmail-clone
   ```
2. **Create your own Github Repository**. Be sure to push code with descriptive commit messages to this repository as you build- this will help us understand your process. 

3. **Backend Setup** (Nest.js + Prisma + SQLite):
   ```bash
   cd backend
   npm install
   
   # Set up database and seed data
   npx prisma migrate dev --name init
   npm run db:seed
   
   # Start the backend server
   npm run start:dev
   ```
   
   The backend will start on `http://localhost:3001`

4. **Frontend Setup** (Next.js) - Open a new terminal:
   ```bash
   cd frontend
   npm install
   
   # Start the frontend server
   npm run dev
   ```
   
   The frontend will start on `http://localhost:3000`

5. **Verify Setup**:
   - Visit `http://localhost:3000` - you should see the basic inbox interface
   - Visit `http://localhost:3001/health` - should return 200 OK


### Submission Guidelines

When you are finished, email your github repository URL to [robby@slopetalent.com](mailto:robby@slopetalent.com).
