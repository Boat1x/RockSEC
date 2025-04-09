// Define all your dashboard-related types here

export interface SecurityRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'in-progress';
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  type: string;
}

export interface RecentActivity {
  id: string;
  action: string;
  timestamp: string;
  user: string;
  details?: string;
}

export interface SecurityCategory {
  id: string;
  name: string;
  score: number;
  maxScore: number;
}

export interface SecurityResource {
  id: string;
  title: string;
  url: string;
  type: string;
  description: string;
}

export interface CompletedProject {
  id: string;
  name: string;
  completionDate: string;
  summary: string;
}

export interface VulnerabilityRisk {
  id: string;
  name: string;
  level: 'critical' | 'high' | 'medium' | 'low';
  affectedSystems: string[];
}

export interface ThreatData {
  category: string;
  count: number;
  change: number;
}

export interface ScoreHistoryData {
  date: string;
  score: number;
} 