export default interface DetailedResumeAnalysisAiDTO {
  overallScore: number;
  metrics: {
    atsCompatibility: number;
    contentQuality: number;
    formatStructure: number;
    keywordMatch: number;
  };
  feedback: {
    criticalIssues: string[];
    recommendations: string[];
  };
  keywords: {
    found: string[];
    missing: string[];
  };
  sectionAnalysis: [
    { section: 'Contact Information'; status: 'Incomplete' | 'Complete'; score: number },
    { section: 'Professional Summary'; status: 'Incomplete' | 'Complete'; score: number },
    { section: 'Work Experience'; status: 'Incomplete' | 'Complete'; score: number },
    { section: 'Education'; status: 'Incomplete' | 'Complete'; score: number },
    { section: 'Skills'; status: 'Incomplete' | 'Complete'; score: number },
    { section: 'Certifications'; status: 'Incomplete' | 'Complete'; score: number },
  ];
}
