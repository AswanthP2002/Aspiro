// {
//   "overall_score": number, // 0-100
//   "content_quality_score": number,
//   "communication_score": number,
//   "confidence_score": number,
//   "strengths": ["string"],
//   "areas_to_improve": ["string"],
//   "question_by_question_analysis": [
//     {
//       "question": "string",
//       "response": "string",
//       "feedback": "string",
//       "score": number // 0-100
//     }
//   ]
// }

export default interface AiInterviewResultDTO {
  overall_score: number;
  content_quality_score: number;
  communication_score: number;
  confidence_score: number;
  strengths: string[];
  areas_to_improve: string[];
  question_by_question_analysis: {
    question: string;
    response: string;
    feedback: string;
    score: number;
  }[];
}
