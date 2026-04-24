// Dual identity: FRONTEND · BACKEND & ML · LANGUAGES & TOOLS
// Marquee uses these directly. Groups show up in the tilt cards.

export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces with texture, motion, and performance budgets.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Three Fiber",
      "Redux Toolkit",
      "HTML / CSS",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "Honest APIs, clean data models, realtime when it matters.",
    items: [
      "Node.js",
      "Express",
      "Django",
      "Django REST",
      "MongoDB",
      "REST APIs",
      "Socket.io",
      "JWT",
      "Mongoose",
    ],
  },
  {
    id: "ml",
    label: "ML & Computer Vision",
    blurb: "Pipelines from raw data to deployed inference.",
    items: [
      "PyTorch",
      "YOLOv8",
      "OpenCV",
      "ONNX Runtime",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "NumPy",
    ],
  },
  {
    id: "tools",
    label: "Languages & Tools",
    blurb: "The muscle memory.",
    items: [
      "Python",
      "C++",
      "Java",
      "C",
      "Git",
      "GitHub",
      "Postman",
      "Vercel",
      "Render",
      "Cloudinary",
    ],
  },
];

// Marquee rows — dual identity "I BUILD · I SHIP"
export const marqueeRowOne = [
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Redux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

export const marqueeRowTwo = [
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PyTorch", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "TensorFlow", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "OpenCV", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
];
