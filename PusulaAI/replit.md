# Overview

PusulaAI is an educational technology platform that bridges the gap between online learning content and real-world career opportunities. The application analyzes YouTube educational videos using Google's Gemini AI to extract topics and skills, then matches them with career paths and relevant courses from BTK Academy (Turkey's national IT education platform). The system generates personalized reports for both students and parents, providing actionable career guidance based on learning interests.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built as a single-page application using React with TypeScript, featuring a modern component-based architecture:

- **UI Framework**: React with Vite for fast development and building
- **Styling**: Tailwind CSS with a comprehensive design system using shadcn/ui components
- **State Management**: TanStack Query for server state and caching
- **Routing**: Wouter for lightweight client-side routing
- **Real-time Communication**: Custom WebSocket client for live progress updates during analysis

The application follows a clean component structure with reusable UI components, custom hooks for data fetching, and responsive design patterns.

## Backend Architecture

The backend implements a Node.js/Express server with a service-oriented architecture:

- **API Framework**: Express.js with TypeScript for type safety
- **Database Layer**: Drizzle ORM with PostgreSQL (via Neon serverless)
- **Service Layer**: Modular services for analysis, YouTube processing, AI integration, and BTK course matching
- **Real-time Updates**: WebSocket integration for live progress tracking during analysis sessions

Key architectural decisions include:
- **Separation of Concerns**: Each major functionality (YouTube, AI analysis, career matching) is isolated in dedicated services
- **Async Processing**: Long-running analysis tasks are handled asynchronously with WebSocket progress updates
- **Database Schema**: Comprehensive schema supporting analysis sessions, progress tracking, career database, and course recommendations

## External Dependencies

### AI and Analysis Services
- **Google Gemini AI**: Primary AI service for video transcript analysis and career matching using the @google/genai SDK
- **YouTube Data API**: For video metadata extraction and transcript processing

### Database and Infrastructure
- **Neon PostgreSQL**: Serverless PostgreSQL database with connection pooling
- **Drizzle ORM**: Type-safe database operations with schema management and migrations

### Course Integration
- **BTK Academy**: Integration with Turkey's national IT education platform for course recommendations (currently using mock data with plans for API integration)

### Development and UI
- **shadcn/ui**: Comprehensive component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Headless UI components for accessibility and functionality
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing solution

The architecture prioritizes scalability, maintainability, and real-time user experience through its modular design and async processing capabilities.