"use server";

import openai from "@/lib/openai";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
} from "@/lib/validation";
import { WorkExperience } from "@prisma/client";

export async function generateSummary(input: GenerateSummaryInput) {
  // Todo:Block for non-premium users

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a progessional introduction summary for a resume given the user's provided data.Only return the summary and do not include any other information in the response. Keep it concise and professional.
    `;

  const userMessage = `
    Please generate a professional resume summary from this data:
    
    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp) => `
        Position : ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
        
        Description:
        ${exp.description || "N/A"}
        `,
      )
      .join("\n\n")}

      Education:
    ${educations
      ?.map(
        (exp) => `
        Degree : ${exp.degree || "N/A"} at ${exp.school || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
        `,
      )
      .join("\n\n")}

      Skills:
      ${skills}
    `;
  console.log("systemMessage:", systemMessage);
  console.log("userMessage:", userMessage);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate the ai response");
  }
  return aiResponse;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  // Todo : block for non-premium users

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input. Your response must adhere to the following structure. You can omit fields if they can't be infered from the provide data, but don't add any new ones.

    Job title: <job title>
    Company: <company name>
    Start date: <format: YYYY--MM--DD (only if provided)
    End date: <format: YYYY--MM--DD (only if provided)
    Description: <an optimized description in bullet format, might be infered from the job title>
    `;
  const userMessage = `
    Please provide a work experience entry from this description:
    ${description}
    `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;
  if (!aiResponse) {
    throw new Error("Failed to generate the ai response");
  }

  console.log("aiResponse: ", aiResponse);

  // return {
  //   position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
  //   company: aiResponse.match(/Company: (.*)/)?.[1] || "",
  //   description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
  //   startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
  //   endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  // } satisfies WorkExperience;

  const startDateMatch = aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/);
const endDateMatch = aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/);

return {
  id: "", // Replace with actual ID or provide default
  resumeId: "", // Replace with the associated resume ID
  position: aiResponse.match(/Job title: (.*)/)?.[1] || null,
  company: aiResponse.match(/Company: (.*)/)?.[1] || null,
  description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim() || null,
  startDate: startDateMatch ? new Date(startDateMatch[1]) : null,
  endDate: endDateMatch ? new Date(endDateMatch[1]) : null,
  createdAt: new Date(), // Replace with actual `createdAt` value if available
  updatedAt: new Date(), // Replace with actual `updatedAt` value if available
} satisfies WorkExperience;

}