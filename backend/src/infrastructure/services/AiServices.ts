import { injectable } from 'tsyringe';
import IAiServices from '../../application/interfaces/services/IAiServices';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { ServiceBusyError } from '../../domain/errors/AppError';
import DetailedResumeAnalysisAiDTO from '../../application/DTOs/resume/DetailedResumeAnalysis.ai.dto';

@injectable()
export default class AiServices implements IAiServices {
  private _models: string[] = [
    //deep analysis and logc models
    'nvidia/nemotron-3-super-120b-a12b:free',
    'nousresearch/hermes-3-llama-3.1-405b:free',
    'qwen/qwen3-coder:free',
    'arcee-ai/trinity-large-preview:free',
    //midrange  high reliablity models
    'openai/gpt-oss-120b:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'google/gemma-3-27b-it:free',
    //Thinking and specialized models
    'liquid/lfm-2.5-1.2b-thinking:free',
    'google/gemma-3-12b-it:free',
    //fast and stable models
    'meta-llama/llama-3.2-3b-instruct:free',
    'minimax/minimax-m2.5:free',
    'google/gemma-3-4b-it:free',
    // 'openai/gpt-oss-120b:free',
    // 'meta-llama/llama-3.2-3b-instruct:free',
    // 'google/gemma-3-12b-it:free',
    // 'openai/gpt-oss-20b:free',
    // 'google/gemma-3-4b-it:free',
  ];
  private _apiUrl: string = 'https://openrouter.ai/api/v1/chat/completions';
  private _systemPrompt: string = `
    You are a Senior Technical Recruiter and an expert in Applicant Tracking Systems (ATS). 
    Your task is to analyze the provided resume against a specific job role.

    CRITICAL INSTRUCTIONS:
    1. Respond ONLY with a valid JSON object. 
    2. Do not include any introductory text, markdown backticks (like \`\`\`json), or conversational filler.
    3. Be strict but fair in scoring.
    4. "missingKeywords" should focus on industry-standard technical skills for the role.

    The JSON object MUST follow this exact structure:
    {
        "score": number (0-100),
        "strength": string[],
        "improvements": string[],
        "feedback": string
    }`;
  private _systemDetailedPrompt: string = `You are the "Aspiro ATS Architect," a high-precision resume parsing engine and Senior Technical Recruiter.

Your goal is to provide a ruthless, data-backed analysis of a resume compared to a target job role. You do not use conversational filler. You provide objective metrics and actionable engineering-style feedback.

CRITICAL OUTPUT STRUCTURE:
Your response must be a single JSON object with these exact keys:

1. "overallScore": A weighted average (0-100).
2. "metrics": {
    "atsCompatibility": number,
    "contentQuality": number,
    "formatStructure": number,
    "keywordMatch": number
   }
3. "feedback": {
    "criticalIssues": string[], (Focus on deal-breakers like missing contact info or formatting errors)
    "recommendations": string[] (Actionable tips for improvement)
   }
4. "keywords": {
    "found": string[], (Relevant tech/hard skills found in the resume)
    "missing": string[] (Industry-standard skills for the target role not found)
   }
5. "sectionAnalysis": [
    { "section": "Contact Information", "status": "Incomplete" | "Complete", "score": number },
    { "section": "Professional Summary", "status": "Incomplete" | "Complete", "score": number },
    { "section": "Work Experience", "status": "Incomplete" | "Complete", "score": number },
    { "section": "Education", "status": "Incomplete" | "Complete", "score": number },
    { "section": "Skills", "status": "Incomplete" | "Complete", "score": number },
    { "section": "Certifications", "status": "Incomplete" | "Complete", "score": number }
   ]

STRICTNESS RULES:
- Do not include any introductory text, markdown backticks (like \`\`\`json), or conversational filler.
- If a section is missing or lacks detail, mark it "Incomplete."
- If the resume is for a technical role, "missingKeywords" must include modern stack tools (e.g., Docker, CI/CD, TypeScript).
- Scores above 80 should be rare and reserved for perfect alignment.
`;

  async analyzeResume(
    resumeContent: string,
    targetRole: string
  ): Promise<{
    score: number;
    strength: string[];
    improvements: string[];
    feedback: string;
  } | null> {
    const userPrompt = `
        Analyze this resume for the position of: ${targetRole}
        Resume data:
        ${resumeContent}
    `;

    for (const model of this._models) {
      try {
        const response = await axios.post(
          this._apiUrl,
          {
            model: model,
            messages: [
              {
                role: 'system',
                content: this._systemPrompt,
              },
              {
                role: 'user',
                content: userPrompt,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.ASPIRO_AI_API_KEY}`,
              'Content-Type': 'application/json',
              'X-Title': 'Aspiro',
            },
          }
        );
        console.log('-- checking result from the ai', response);
        const result = response.data.choices[0].message.content;
        const parsedData = JSON.parse(result);

        return parsedData;
      } catch (error: unknown) {
        const err = error as AxiosError;
        if (
          err.response?.status === HttpStatusCode.TooManyRequests ||
          err.response?.status === HttpStatusCode.BadRequest
        ) {
          continue;
        }

        throw err;
      }
    }

    throw new ServiceBusyError('AI models');
  }

  async analyzeDetailedResumes(
    resumeData: string,
    targettedRole: string
  ): Promise<DetailedResumeAnalysisAiDTO | null> {
    const userPrompt = `
        Analyze this resume for the position of: ${targettedRole}
        Resume data:
        ${resumeData}
    `;

    for (const model of this._models) {
      try {
        const response = await axios.post(
          this._apiUrl,
          {
            model: model,
            messages: [
              {
                role: 'system',
                content: this._systemDetailedPrompt,
              },
              {
                role: 'user',
                content: userPrompt,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.ASPIRO_AI_API_KEY}`,
              'Content-Type': 'application/json',
              'X-Title': 'Aspiro',
            },
          }
        );
        const data = response.data;
        if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
          console.log(`${model}: given an invalid response - switching model for`);
          if (data.error) {
            console.log('Open router error: ', data.error?.message);
          }
          continue;
        }

        console.log('-- checking result from the ai', response.data);
        const result = response.data.choices[0]?.message.content;
        const parsedData = JSON.parse(result);

        return parsedData;
      } catch (error: unknown) {
        const err = error as AxiosError;
        if (
          (err.response && err.response.status >= 500) ||
          err.response?.status === 429 ||
          err.response?.status === 400
        ) {
          continue;
        }

        throw err;
      }
    }

    throw new ServiceBusyError('AI models');
  }

  async aiInterview(
    persona: { role: 'system' | 'user' | 'assistant'; content: string }[]
  ): Promise<string> {
    console.log('-- checking persona before sending to the ai --', persona)
    for (const model of this._models) {
      try {
        const response = await axios.post(
          this._apiUrl,
          {
            model,
            messages: persona,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.ASPIRO_AI_API_KEY}`,
              'Content-Type': 'application/json',
              'X-Title': 'Aspiro',
            },
          }
        );

        console.log('response from the ai', response.data?.choices);
        return '';
      } catch (error) {
        const err = error as AxiosError;
        if (
          (err.response && err.response.status >= 500) ||
          err.response?.status === 400 ||
          err.response?.status === 429
        ) {
          console.log('Error occured', err.message);
          console.log(`${model} failed: switching to next model`);
        } else {
          throw err;
        }
      }
    }
    throw new ServiceBusyError('Ai Models');
  }
}
