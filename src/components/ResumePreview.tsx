import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: String;
}

export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />   
        <SkillsSection resumeData={resumeData} />   
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email, colorHex,borderStyle} =
    resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{
            borderRadius: borderStyle === BorderStyles.SQUARE ? "0px" : borderStyle === BorderStyles.CIRCLE ?"9999px": "10%"
          }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1 ">
          <p className="text-3xl font-bold " style = {{color: colorHex}}>
            {firstName} {lastName}
          </p>
          <p className="font-medium">{jobTitle}</p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? "," : ""}
          {country}
          {(city || country) && (phone || email) ? " ● " : ""}
          {[phone, email].filter(Boolean).join(" ● ")}
        </p>
      </div>
    </div>

//     <div className="flex flex-col items-center gap-4">
//   {photoSrc && (
//     <Image
//       src={photoSrc}
//       width={100}
//       height={100}
//       alt="Author photo"
//       className="aspect-square object-cover"
//     />
//   )}
//   <div className="text-center space-y-4">
//     <div className="space-y-1">
//       <p className="text-3xl font-bold" style={{ color: colorHex }}>
//         {firstName} {lastName}
//       </p>
//       <p className="font-medium">{jobTitle}</p>
//     </div>
//     <p className="text-xs text-gray-500">
//       {city}
//       {city && country ? "," : ""}
//       {country}
//       {(city || country) && (phone || email) ? " ● " : ""}
//       {[phone, email].filter(Boolean).join(" ● ")}
//     </p>
//   </div>
// </div>

  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary,colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style = {{color: colorHex}}>Professional profile</p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences,colorHex} = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{color:colorHex}}>Work Experiences</p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM,yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM,yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations,colorHex } = resumeData;

  const educationNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style ={{color:colorHex}}>Education</p>
        {educationNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{edu.position}</span>
              {edu.startDate && (
                <span>
                  {formatDate(edu.startDate, "MM,yyyy")} -{" "}
                  {edu.endDate ? formatDate(edu.endDate, "MM,yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.degree}</p>
            <div className="whitespace-pre-line text-xs">{edu.school}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection ({resumeData}:ResumeSectionProps){
    const {skills,colorHex,borderStyle} = resumeData;

    if(!skills?.length) return null;

    return <>
    <hr className="border-2"/>
    <div className="break-inside-avoid space-y-3">
        <p className="flex break-inside-avoid flex-wrap gap-2">Skills</p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
            {skills.map((skill,index)=>(
                <Badge key = {index} className="bg-black hover:bg-black text-white rounded-md" 
                style={{
                  backgroundColor: colorHex,
                  borderRadius: borderStyle === BorderStyles.SQUARE ? "0px" : borderStyle === BorderStyles.CIRCLE ?"9999px": "10%"
                }}
                >
                    {skill}
                </Badge>
            ))}
        </div>
    </div>
    </>
}
