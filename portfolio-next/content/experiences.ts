export type Experience = {
  id: number;
  year: string;
  role: string;
  company: string;
  date: string;
  logo: string;
  description: string;
  highlights: string[];
  skills: string[];
};

export const experiences: Experience[] = [
  {
    id: 0,
    year: "2025",
    role: "Computer Vision & ML Intern",
    company: "Motion Shield",
    date: "Sep 2025 — Nov 2025",
    logo: "/images/experience/motionshield.jpeg",
    description:
      "Built an end-to-end Car Damage Detection System combining YOLOv8 segmentation, a Django inference API, and a Next.js frontend.",
    highlights: [
      "Trained YOLOv8 on the Kaggle Car Damage Dataset for segmentation-based damage detection",
      "Converted PyTorch models to ONNX for faster inference and smaller deploy footprints",
      "Shipped Django APIs for image upload + real-time predictions, wired into a Next.js UI",
    ],
    skills: ["YOLOv8", "PyTorch", "ONNX", "OpenCV", "Django", "Next.js"],
  },
  {
    id: 1,
    year: "2025",
    role: "Data Science & AI/ML Intern",
    company: "Cranes Varsity",
    date: "May 2025 — Jun 2025",
    logo: "/images/experience/cranes.jpg",
    description:
      "Built a Titanic survival prediction model with Logistic Regression and Random Forest on Python + Scikit-learn.",
    highlights: [
      "Hands-on with EDA, feature engineering, model tuning, cross-validation",
      "Stack: Python, Scikit-learn, Pandas, Seaborn, Keras",
      "Delivered a working model + notebook write-up with business-facing insight",
    ],
    skills: ["Python", "Scikit-learn", "Pandas", "Seaborn", "Keras"],
  },
  {
    id: 2,
    year: "2024",
    role: "Full-stack Intern & Team Lead",
    company: "UptoSkills",
    date: "Oct 2024 — Dec 2024",
    logo: "/images/experience/uptoskills.jpg",
    description:
      "Led a 20-member team building a blog platform with AI-generated posts, nested comments, and full mentor/mentee dashboards.",
    highlights: [
      "Coordinated a 20-dev team via Git-based workflow",
      "Implemented JWT auth, modular Express APIs, MongoDB schema",
      "Shipped AI prompt-based post generation and Reddit-style nested comments",
    ],
    skills: ["React", "Node.js", "Express", "MongoDB", "JWT", "Leadership"],
  },
  {
    id: 3,
    year: "2024",
    role: "Frontend Developer Intern",
    company: "OctaNet Services",
    date: "May 2024 — Jun 2024",
    logo: "/images/experience/octanet.jpg",
    description:
      "Built a React + Local Storage To-Do app with responsive UI components and cross-device accessibility as primary goals.",
    highlights: [
      "React app with persistent Local Storage state",
      "Clean, accessible HTML/CSS components",
      "Responsive layout tested across breakpoints",
    ],
    skills: ["React", "HTML", "CSS", "JavaScript"],
  },
  {
    id: 4,
    year: "2024",
    role: "Embedded Systems Intern",
    company: "Teckybot",
    date: "May 2024 — Jun 2024",
    logo: "/images/experience/teckybot.jpg",
    description:
      "Hands-on with microprocessors, microcontrollers, and ESP8266 Wi-Fi integration for IoT and cloud connectivity projects.",
    highlights: [
      "ESP8266 Wi-Fi module integration in real projects",
      "Cloud communication for remote sensor data",
      "Hardware-software interfacing and debugging at the protocol level",
    ],
    skills: ["ESP8266", "IoT", "Microcontrollers", "Embedded"],
  },
];
