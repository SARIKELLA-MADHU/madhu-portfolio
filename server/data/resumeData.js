// Content taken from Sarikella Madhu's resume. Edit here and re-run `npm run seed`,
// or change projects anytime from the /admin page.

export const profile = {
  name: 'Sarikella Madhu',
  title: 'Full-Stack Developer',
  tagline:
    'Final-year IT undergraduate at CBIT building full-stack web apps, REST APIs and LLM-backed retrieval systems.',
  about:
    'Final-year Information Technology undergraduate with a strong foundation in Data Structures, DBMS, Operating Systems, and Computer Networks, and hands-on experience building and deploying full-stack web applications, REST APIs, and LLM-backed retrieval systems. Seeking to apply strong problem-solving and analytical skills to real-world engineering and business operations.',
  location: 'Hyderabad, India',
  email: 'sarikella.madhu@gmail.com',
  phone: '+91 93478 77255',
  linkedin: 'https://linkedin.com/in/madhu-sarikella',
  github: 'https://github.com/SARIKELLA-MADHU',
  resumeUrl: '/Sarikella_Madhu_Resume.pdf',
  stats: [
    { label: 'CGPA at CBIT', value: '9.02' },
    { label: 'TS EAMCET rank', value: 'Top 3%' },
    { label: 'Certifications', value: '3' },
  ],
  education: [
    {
      institution: 'Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad',
      degree: 'BE in Information Technology',
      period: '2023 — 2027 (Expected)',
      score: 'CGPA: 9.02/10.0',
    },
    {
      institution: 'Sri Chaitanya Junior College, Kukatpally',
      degree: 'Higher Secondary Education',
      period: '2021 — 2023',
      score: '979/1000',
    },
  ],
  skills: [
    { category: 'Languages', items: ['Python', 'JavaScript', 'SQL'] },
    { category: 'Frameworks & Tools', items: ['React', 'Node.js', 'Express', 'Git/GitHub'] },
    { category: 'Databases', items: ['MySQL', 'MongoDB'] },
    { category: 'Data Analysis', items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
    {
      category: 'Core CS',
      items: [
        'Data Structures & Algorithms',
        'DBMS',
        'Operating Systems',
        'Computer Networks',
        'Object-Oriented Programming',
      ],
    },
  ],
  certifications: [
    'MongoDB Certified Associate Developer — Python (MongoDB)',
    'Salesforce AI Associate Certification (Salesforce)',
    'Infosys Springboard Certification — Python (Jun 2024)',
  ],
  achievements: ['Ranked in Top 3% in TS EAMCET (2023) among 200,000+ candidates'],
  leadership: [
    'Organising Committee, CBIT eSports Club — ran inter-college tournaments with 500+ participants; led a 20-member team.',
    'Volunteer, CBIT Tech Fest — ran coding workshops for 50+ participants on web development and AI fundamentals (Oct 2024).',
  ],
};

export const projects = [
  {
    title: 'StayDesk',
    subtitle: 'Full-Stack Hostel Operations Platform',
    description:
      'A role-based hostel platform for students, wardens and admins with room management and an end-to-end maintenance ticketing workflow.',
    highlights: [
      'Role-based access for three user roles with stateless JWT auth, enforced at both the routing layer and every API endpoint.',
      'Normalized MySQL schema (11 tables, 1200+ seeded rooms) with foreign-key integrity across students, rooms, tickets, staff and room-change requests.',
      'Maintenance ticketing workflow (raise, triage, assign category-matched staff, resolve) backed by a REST API of 25+ endpoints across six controllers.',
      'Found and fixed a silent data-integrity bug where staff assignments were shown in the UI but never saved to the database.',
      'Decoupled deployment (Render + Railway) with environment-driven API config, so one frontend build runs against local and production backends.',
    ],
    techStack: ['React', 'Node.js', 'Express', 'MySQL', 'JWT'],
    githubUrl: '',
    liveUrl: '',
    featured: true,
    order: 1,
  },
  {
    title: 'AlgoMind',
    subtitle: 'RAG-Based DSA Knowledge Assistant',
    description:
      'A Retrieval-Augmented Generation assistant that answers Data Structures & Algorithms questions grounded in a knowledge base of 100+ topics.',
    highlights: [
      'RAG pipeline using LangChain, ChromaDB and Sentence Transformers for semantic search across 100+ DSA topics.',
      'Ingestion path that chunks source material with overlap, embeds it with Sentence Transformers and persists to ChromaDB with incremental indexing.',
      'Retrieval and prompt-assembly layer that ranks top-k passages and injects them as grounded context.',
      'Fault-tolerant multi-LLM fallback across Gemini and OpenAI APIs for 99%+ uptime under service failures.',
    ],
    techStack: ['Python', 'LangChain', 'ChromaDB', 'Sentence Transformers', 'Gemini', 'OpenAI'],
    githubUrl: '',
    liveUrl: '',
    featured: true,
    order: 2,
  },
  {
    title: 'Money Pool',
    subtitle: 'Group Expense & Money Sharing Platform',
    description:
      'A MERN-based group expense management platform for managing shared finances across trips, families, parties and other groups.',
    highlights: [
      'JWT-based authentication, role-based permissions, circle creation, member management, contributions, fund allocation and transaction tracking.',
      'Flexible expense settlement with automatic equal splitting and host-controlled manual allocation, supporting different contribution requirements within a group.',
      'LLM-based spending analysis that categorizes transactions and generates productive/non-productive spending insights and periodic summaries.',
    ],
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'LLM'],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 3,
  },
  {
    title: 'Fake News Detection',
    subtitle: 'Multimodal Detection with BERT & EfficientNet',
    description:
      'A multimodal fake news detection system that uses BERT for textual analysis and EfficientNet for image-based analysis.',
    highlights: [
      'Fine-tuned BERT to extract contextual features from news headlines/articles and EfficientNet to learn visual features from the associated images.',
      'Combined textual and visual representations to improve classification of news content as real or fake.',
      'Evaluated the model using accuracy, precision, recall and F1-score to measure classification performance.',
    ],
    techStack: ['BERT', 'EfficientNet', 'Python'],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 4,
  },
  {
    title: 'Airbnb Booking Prediction',
    subtitle: 'New User Booking Destination Prediction',
    description:
      'A machine learning classification pipeline that predicts the first booking destination of new Airbnb users from user profile and session activity data.',
    highlights: [
      'Data preprocessing, exploratory data analysis and feature engineering with Pandas, NumPy and PySpark to prepare behavioral and demographic features.',
      'Trained and evaluated XGBoost for multi-class destination prediction, achieving approximately 87.5% accuracy.',
      'Built Power BI dashboards to visualize user demographics, booking patterns, destination trends and model-related insights.',
    ],
    techStack: ['Python', 'Pandas', 'NumPy', 'PySpark', 'XGBoost', 'Power BI'],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 5,
  },
  {
    title: 'Live Weather Monitoring & Alerts',
    subtitle: 'Real-Time Streaming Alert System',
    description:
      'A real-time pipeline that streams live weather data and raises alerts when conditions cross specified limits: Weather API → Kafka → Flink → Alerts → Dashboard.',
    highlights: [
      'Monitors temperature, humidity, rainfall and wind speed from a live weather API.',
      'Kafka handles the real-time data stream, and Flink processes the incoming data and checks it against thresholds.',
      'Generates alerts when conditions cross the specified limits and surfaces them on a dashboard.',
      'Planned extensions: multi-city streaming, windowed aggregations, anomaly and trend detection, database storage, notifications and checkpointing.',
    ],
    techStack: ['Kafka', 'Flink', 'Weather API'],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 6,
  },
];
