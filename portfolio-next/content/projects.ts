export type Project = {
  id: number;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  description: string[];
  highlights?: string[];
  image: string;
  tags: string[];
  github?: string;
  webapp?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 0,
    slug: "chatpulse",
    number: "01",
    title: "ChatPulse",
    tagline: "Realtime messenger with AI assistant and HD video calls.",
    role: "Solo · Full-stack",
    year: "2025",
    description: [
      "Next-gen messenger built on MERN + Socket.io. Instant messaging, media sharing, HD video calls, and an AI assistant living inside every conversation.",
      "The AI layer handles multilingual chat, smart replies, and creative text generation — letters, polls, ideas — without breaking conversational flow.",
      "JWT auth, Cloudinary media pipeline, dynamic themes, profile editing, deployed end-to-end on Render with a separate WebSocket server for presence.",
    ],
    highlights: [
      "WebRTC HD video calls with signaling over Socket.io",
      "Cloudinary upload presets for zero-backend-trust media",
      "Stateless JWT + refresh rotation",
    ],
    image: "/images/projects/chatpulse.png",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "WebRTC", "AI"],
    github: "https://github.com/22L31A0497/fullstack-chat-app-master/tree/master",
    webapp: "https://fullstack-live-chat-app.onrender.com/",
    featured: true,
  },
  {
    id: 1,
    slug: "lms-portal",
    number: "02",
    title: "LMS Portal",
    tagline: "A Udemy-style learning platform, end to end.",
    role: "Solo · Frontend + Auth",
    year: "2024",
    description: [
      "Full Udemy-inspired LMS with 15+ responsive pages — dashboards, course catalog, payment UI, lecture management — across Admin, Instructor, and Student roles.",
      "Clerk handles authentication (Email, Google, OTP) with protected routes and role-based access, leaving application code free of auth boilerplate.",
      "Reusable components for video uploads, lecture control, course updates, and enrollment tracking. Redux Toolkit owns app state.",
    ],
    highlights: [
      "3 role-based dashboards sharing one component library",
      "Stripe-ready payment flow",
      "Deployed on Vercel with ISR for catalog pages",
    ],
    image: "/images/projects/lms.jpg",
    tags: ["React", "Redux Toolkit", "Clerk", "Stripe", "Tailwind", "MongoDB"],
    github: "https://github.com/22L31A0497/LMS_Full_Stack_By_Jagan",
    webapp: "https://lms-full-stack-by-jagan.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    slug: "medimate",
    number: "03",
    title: "MediMate",
    tagline: "AI health-tech with live emergency location sharing.",
    role: "Hackathon · Team of 4",
    year: "2025",
    description: [
      "Health-tech platform built during a hackathon — AI-powered symptom analysis, telemedicine, and live GPS sharing with emergency contacts.",
      "Role-based dashboards for doctors and patients, OTP login, editable health records, live session booking, and a one-click 108 emergency call that auto-attaches the patient's coordinates.",
      "Focused on edge cases: no-connectivity fallbacks, language-agnostic symptom picker, and accessible contrast ratios throughout.",
    ],
    highlights: [
      "One-tap emergency calling with geolocation payload",
      "Doctor/patient role split with shared auth backbone",
      "AI symptom scoring with human-readable urgency bands",
    ],
    image: "/images/projects/medimate.png",
    tags: ["React", "Node.js", "MongoDB", "JWT", "AI", "Geolocation"],
    github: "https://github.com/22L31A0497/MediMate_by_HealthGuardians",
    webapp: "https://medi-mate-by-health-guardians-vgau.vercel.app/",
    featured: true,
  },
  {
    id: 3,
    slug: "devtinder",
    number: "04",
    title: "DevTinder Backend",
    tagline: "A professional networking API, properly engineered.",
    role: "Solo · Backend",
    year: "2024",
    description: [
      "Secure, scalable backend for a developer networking platform — login/signup, profiles, connections, social feeds.",
      "JWT auth with bcrypt hashing and cookie sessions, Express routers, schema validation, modular middleware, and role-based routing.",
      "MongoDB queries profiled and indexed for common feeds. Postman collection doubles as live API documentation.",
    ],
    image: "/images/projects/devtinder.jpg",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "Mongoose", "Bcrypt"],
    github: "https://github.com/22L31A0497/Dev_tinder_backend",
    featured: true,
  },
  {
    id: 4,
    slug: "titanic-ml",
    number: "05",
    title: "Titanic Survival ML",
    tagline: "End-to-end ML pipeline, ~82% accuracy.",
    role: "Solo · Data Science",
    year: "2025",
    description: [
      "Full pipeline on raw Titanic data — imputation, outlier handling, encoding, scaling, feature engineering.",
      "EDA with Seaborn + Matplotlib analyzing survival by age, gender, fare, and class.",
      "Logistic Regression, Decision Tree, and Random Forest with cross-validation and hyperparameter tuning. Best model hit ~82% accuracy.",
    ],
    image: "/images/projects/titanic.jpg",
    tags: ["Python", "Pandas", "Scikit-learn", "Seaborn", "Random Forest"],
    github: "https://github.com/22L31A0497/Titanic_Survival_Analysis",
    featured: false,
  },
  {
    id: 5,
    slug: "django-blog",
    number: "06",
    title: "Django Blog",
    tagline: "Full-stack content platform in pure Django.",
    role: "Solo · Full-stack",
    year: "2024",
    description: [
      "Feature-complete blogging site in Django — create posts with images and videos, delete your own content, styled with HTML/CSS via Django's static system.",
      "Deployed live on Render with database persistence and media upload handling.",
      "Clean exposure to Django templating, static file routing, and production deploy workflows.",
    ],
    image: "/images/projects/blog.png",
    tags: ["Django", "Python", "HTML", "CSS", "Render"],
    github: "https://github.com/22L31A0497/Blog_website_Using_Django",
    webapp: "https://lnkd.in/gD8DQGMR",
    featured: false,
  },
  {
    id: 6,
    slug: "secure-auth",
    number: "07",
    title: "Secure Auth System",
    tagline: "React + Django REST + JWT rotation, done right.",
    role: "Solo · Full-stack",
    year: "2024",
    description: [
      "Full-stack auth system: React frontend, Django REST Framework backend.",
      "JWT access + refresh rotation, protected routes, and transparent Axios interceptors that refresh tokens in-flight.",
      "Signup, login, logout workflows with full validation and security best practices end to end.",
    ],
    image: "/images/projects/auth.png",
    tags: ["React", "Django REST", "JWT", "Axios", "Full-Stack"],
    github: "https://github.com/22L31A0497/Stock-Prediction-Portal",
    featured: false,
  },
];
