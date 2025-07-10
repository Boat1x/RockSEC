# RockSEC - Rocky Security Solutions

RockSEC is a comprehensive cybersecurity consulting platform designed to connect students with local businesses, providing students with real-world experience while helping businesses improve their security posture.

![RockSEC Platform]

## Overview

Rocky Security Solutions (RockSEC) is an educational initiative that bridges the gap between cybersecurity education and practical application. The platform enables college students to gain valuable hands-on experience by conducting security assessments and implementing security programs for local businesses near the college. This dual-purpose platform benefits both the students' professional development and the cybersecurity posture of community businesses.

The platform features role-based access control with separate interfaces for administrators, student consultants, and business clients.

## Features

### For Faculty Administrators
- **Dashboard**: Comprehensive overview of student activities and client engagements
- **Student Management**: Add, edit, and manage student consultants
- **Client Management**: Organize and track local business clients
- **Report Management**: Review and approve student-generated security assessment reports
- **User Administration**: Control platform access and permissions
- **Program Management**: Create and track educational security programs
- **Security Settings**: Configure platform security settings
- **Activity Logs**: Monitor student and system activities for educational assessment

### For Student Consultants
- **Dashboard**: View assigned local businesses and assessment status
- **Business Assessment**: Conduct real-world security assessments using standardized frameworks
- **History**: Track assessment history and document professional experience
- **Learning Hub**: Access security best practices and educational resources
- **Threat Intelligence**: Research and apply knowledge about the latest security threats
- **Client Management**: Gain experience managing client relationships

### For Local Business Clients
- **Security Dashboard**: View assessment results and recommended actions
- **Implementation Tracking**: Monitor progress of security improvements
- **Resource Center**: Access educational materials about cybersecurity best practices
- **Communication Portal**: Interact with student consultants and faculty advisors

## Technology Stack

RockSEC is built using modern web technologies:

- **Frontend**: React with TypeScript, Vite for build tooling
- **UI Framework**: Material-UI (MUI) for responsive design
- **Routing**: React Router for navigation
- **Backend**: AWS Amplify for serverless infrastructure
- **Authentication**: Amazon Cognito
- **Database**: Amazon DynamoDB
- **API**: GraphQL with AWS AppSync
- **Hosting**: AWS Amplify Hosting

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- AWS account (for deployment)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/RockSEC.git
   cd RockSEC
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### AWS Deployment

The project is configured for easy deployment to AWS using Amplify:

1. Initialize Amplify (if not already done):
   ```bash
   npx amplify init
   ```

2. Push your backend resources to AWS:
   ```bash
   npx amplify push
   ```

3. Deploy the frontend:
   ```bash
   npx amplify publish
   ```

For detailed deployment instructions, refer to the [AWS Amplify Documentation](https://docs.amplify.aws/).

## Project Structure

```
RockSEC/
├── amplify/              # AWS Amplify configuration
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── backend/          # Amplify backend resources
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── pages/            # Application pages
│   │   └── admin/        # Admin-specific pages
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   ├── ThemeProvider.tsx # MUI theme configuration
│   └── main.tsx          # Application entry point
├── .gitignore            # Git ignore configuration
├── package.json          # Project dependencies
└── vite.config.ts        # Vite configuration
```

## Security Considerations

- The platform implements role-based access control
- Authentication is handled securely through Amazon Cognito
- API access is restricted based on user permissions
- Sensitive configuration files are excluded from version control
- AWS resources are configured with least-privilege access

## Contributing

We welcome contributions to RockSEC! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the project maintainers.

---

Built with ❤️ by the RockSEC Team
