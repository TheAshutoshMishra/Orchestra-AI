import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate project tasks using Gemini AI
 * @param {string} goal - The high-level project goal
 * @returns {Promise<Array>} - Array of tasks with title, description, priority
 */
export const generateProjectTasks = async (goal) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Break down this project goal into a list of 5-8 actionable tasks in JSON format:

Goal: "${goal}"

Return ONLY a valid JSON array with this exact structure (no markdown, no extra text):
[
  {
    "title": "Task title",
    "description": "Brief description of what needs to be done",
    "priority": "Low" | "Medium" | "High"
  }
]

Ensure each task is specific, actionable, and builds toward the main goal.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract JSON from response (in case there's any extra text)
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const tasks = JSON.parse(jsonMatch[0]);

    // Validate structure
    if (!Array.isArray(tasks)) {
      throw new Error('Response is not an array');
    }

    tasks.forEach((task, index) => {
      if (!task.title || !task.description || !task.priority) {
        throw new Error(`Task ${index} is missing required fields`);
      }
      if (!['Low', 'Medium', 'High'].includes(task.priority)) {
        task.priority = 'Medium'; // Default to Medium if invalid
      }
    });

    return tasks;
  } catch (error) {
    console.error('Gemini AI Error:', error.message);
    throw new Error(`Failed to generate tasks: ${error.message}`);
  }
};

/**
 * Generate project summary and metadata using Gemini AI
 * @param {string} goal - The high-level project goal
 * @returns {Promise<Object>} - Project breakdown with summary, milestones, risks, technologies
 */
export const generateProjectBreakdown = async (goal) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Analyze this project goal and provide a strategic breakdown in JSON format:

Goal: "${goal}"

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "summary": "2-3 sentence overview of the project",
  "estimatedTimeline": "Estimated duration (e.g., '8 weeks')",
  "keyMilestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
  "riskFactors": ["Risk 1", "Risk 2"],
  "technologies": ["Technology 1", "Technology 2", "Technology 3"]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const breakdown = JSON.parse(jsonMatch[0]);

    // Ensure all required fields exist
    breakdown.summary = breakdown.summary || 'Project summary not available';
    breakdown.estimatedTimeline = breakdown.estimatedTimeline || 'Unknown';
    breakdown.keyMilestones = breakdown.keyMilestones || [];
    breakdown.riskFactors = breakdown.riskFactors || [];
    breakdown.technologies = breakdown.technologies || [];

    return breakdown;
  } catch (error) {
    console.error('Gemini AI Error:', error.message);
    throw new Error(`Failed to generate project breakdown: ${error.message}`);
  }
};

export default { generateProjectTasks, generateProjectBreakdown };
