export interface SecurityRecommendation {
    id: number;
    title: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    status: 'Completed' | 'In Progress' | 'Scheduled' | 'Not Started';
    dueDate?: string;
    completedDate?: string;
    assignedTo: string;
  }
  
  export interface UpcomingEvent {
    title: string;
    date: string;
    time: string;
    location: string;
    consultant: string;
  }
  
  export interface RecentActivity {
    action: string;
    client: string;
    timestamp: string;
    icon: React.ReactNode;
  }
  
  export interface SecurityCategory {
    name: string;
    score: number;
    target: number;
    improvement: number;
  }
  
  export interface SecurityResource {
    title: string;
    type: 'Guide' | 'Video' | 'Document' | 'Template' | 'Training';
    description: string;
    duration?: string;
    pages?: number;
  }
  
  export interface CompletedProject {
    name: string;
    date: string;
    improvement: number;
  }
  
  export interface VulnerabilityRisk {
    level: 'Critical' | 'High' | 'Medium' | 'Low';
    count: number;
    color: string;
  }
  
  export interface ThreatData {
    month: string;
    detected: number;
    blocked: number;
    attempts: number;
  }
  
  export interface ScoreHistoryData {
    month: string;
    score: number;
  }
  
  export interface TimeRange {
    range: '3months' | '6months' | '1year';
  }
  
  export interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }