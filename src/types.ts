export interface Project {
  id: string;
  name: string;
  tag: string;
  role: string;
  description: string;
  detailedDescription: string;
  features: string[];
  link?: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    details?: string;
  }[];
}

export interface TradeSetup {
  pair: string;
  type: 'LONG' | 'SHORT';
  entry: number;
  tp: number;
  sl: number;
  rr: string;
  status: 'PENDING' | 'ACTIVE' | 'TP_HIT' | 'SL_HIT';
  reasoning: string;
}
