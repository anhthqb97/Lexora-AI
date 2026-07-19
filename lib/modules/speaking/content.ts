export type SpeakingTopic = {
  id: string;
  title: string;
  titleVi: string;
  level: string;
  opener: string;
  followUps: string[];
};

export type SpeakingScenario = {
  id: string;
  title: string;
  titleVi: string;
  level: string;
  aiRole: string;
  learnerGoal: string;
  opener: string;
  questionBank?: string[];
};

export const SPEAKING_TOPICS: SpeakingTopic[] = [
  {
    id: "T-01",
    title: "Travel",
    titleVi: "Du lịch",
    level: "A2–B2",
    opener: "Have you traveled anywhere interesting recently?",
    followUps: ["Where did you go?", "What did you eat?", "Would you go back?"],
  },
  {
    id: "T-02",
    title: "Technology",
    titleVi: "Công nghệ",
    level: "B1–B2",
    opener: "What's one app you use every day?",
    followUps: ["Why is it useful?", "How has technology changed your life?"],
  },
  {
    id: "T-03",
    title: "Health & Fitness",
    titleVi: "Sức khỏe",
    level: "A2–B1",
    opener: "How do you stay healthy?",
    followUps: ["Do you exercise?", "What's your favorite food?"],
  },
  {
    id: "T-04",
    title: "Education",
    titleVi: "Giáo dục",
    level: "A2–B2",
    opener: "Tell me about your school or university.",
    followUps: ["What's your favorite subject?", "Why do you study English?"],
  },
  {
    id: "T-05",
    title: "Food & Cooking",
    titleVi: "Ẩm thực",
    level: "A2–B1",
    opener: "What's your favorite Vietnamese dish?",
    followUps: ["Can you describe how to make it?", "Do you like foreign food?"],
  },
  {
    id: "T-06",
    title: "Hobbies",
    titleVi: "Sở thích",
    level: "A2–B1",
    opener: "What do you like to do in your free time?",
    followUps: ["How often do you do it?", "Why do you enjoy it?"],
  },
  {
    id: "T-07",
    title: "Work & Career",
    titleVi: "Công việc",
    level: "B1–B2",
    opener: "Tell me about your job or dream job.",
    followUps: ["What skills do you need?", "What's challenging about it?"],
  },
  {
    id: "T-08",
    title: "Family & Friends",
    titleVi: "Gia đình & bạn bè",
    level: "A2–B1",
    opener: "Tell me about your family.",
    followUps: ["Who are you closest to?", "What do you do together?"],
  },
  {
    id: "T-09",
    title: "Environment",
    titleVi: "Môi trường",
    level: "B1–B2",
    opener: "What environmental issues concern you?",
    followUps: ["What can individuals do to help?"],
  },
  {
    id: "T-10",
    title: "Daily Routine",
    titleVi: "Thói quen hàng ngày",
    level: "A1–A2",
    opener: "What time do you usually wake up?",
    followUps: ["What do you do in the morning?", "Describe a typical day."],
  },
];

export const SPEAKING_SCENARIOS: SpeakingScenario[] = [
  {
    id: "S-01",
    title: "Restaurant",
    titleVi: "Nhà hàng",
    level: "A2–B1",
    aiRole: "Waiter",
    learnerGoal: "Order food, ask about menu, pay bill",
    opener: "Good evening! Welcome to our restaurant. Are you ready to order?",
  },
  {
    id: "S-02",
    title: "Job Interview",
    titleVi: "Phỏng vấn xin việc",
    level: "B1–B2",
    aiRole: "Interviewer",
    learnerGoal: "Introduce yourself, answer strengths/weaknesses",
    opener: "Thank you for coming in today. Tell me about yourself.",
    questionBank: [
      "Tell me about yourself.",
      "Why do you want this job?",
      "What are your strengths and weaknesses?",
      "Describe a challenge you faced at work.",
      "Where do you see yourself in 5 years?",
      "Do you have any questions for us?",
    ],
  },
  {
    id: "S-03",
    title: "Hotel Check-in",
    titleVi: "Check-in khách sạn",
    level: "A2–B1",
    aiRole: "Receptionist",
    learnerGoal: "Check in, ask about amenities, request help",
    opener: "Good afternoon! Do you have a reservation with us?",
  },
  {
    id: "S-04",
    title: "Doctor Visit",
    titleVi: "Khám bác sĩ",
    level: "B1",
    aiRole: "Doctor",
    learnerGoal: "Describe symptoms, understand advice",
    opener: "Hello, what seems to be the problem today?",
  },
  {
    id: "S-05",
    title: "Shopping",
    titleVi: "Mua sắm",
    level: "A2",
    aiRole: "Shop assistant",
    learnerGoal: "Ask prices, sizes, return policy",
    opener: "Hi there! Can I help you find something today?",
  },
];

const FREE_TALK_OPENERS: Record<string, string> = {
  toeic:
    "Let's warm up with some exam-style conversation. How do you usually prepare for English tests?",
  speaking: "Hi! Let's have a friendly chat. What did you do this weekend?",
  business: "Good to meet you! Tell me about your typical workday.",
  general: "Hello! How are you doing today?",
};

export function getTopicById(id: string): SpeakingTopic | undefined {
  return SPEAKING_TOPICS.find((t) => t.id === id);
}

export function getScenarioById(id: string): SpeakingScenario | undefined {
  return SPEAKING_SCENARIOS.find((s) => s.id === id);
}

export function getFreeTalkOpener(goal?: string): string {
  return FREE_TALK_OPENERS[goal ?? "general"] ?? FREE_TALK_OPENERS.general;
}

export function listTopics(): SpeakingTopic[] {
  return SPEAKING_TOPICS;
}

export function listScenarios(): SpeakingScenario[] {
  return SPEAKING_SCENARIOS;
}
