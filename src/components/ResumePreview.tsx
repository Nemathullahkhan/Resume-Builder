 import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { Github, Linkedin } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function ResumePreview({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-neutral-100 text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-2 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {/* <pre>{JSON.stringify(resumeData,null,2)}</pre> */}
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <ProjectSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
    githubProfile,
    linkedinProfile,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6 font-['Computer_Modern']">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="mx-auto space-y-0.5 text-center font-semibold">
        <div>
          <h1
            className="text-4xl font-bold tracking-tighter"
            style={{ color: colorHex }}
          >
            {firstName} {lastName}
          </h1>
          <p className="text-xl font-semibold">{jobTitle}</p>
        </div>
        <p className="text-black-500 flex items-center justify-center gap-2 text-xs font-light tracking-wide">
          {city}
          {city && country ? " | " : ""}
          {country}
          {(city || country) && (phone || email) ? " | " : ""}
          {phone}
          {(phone || country) && email ? " |" : ""}
          {email && (
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
              className="flex gap-0.5 hover:text-black"
            >
              <span className="items-center font-bold">Email:</span>
              {email}
            </a>
          )}
          {(phone || email) && githubProfile ? " | " : ""}

          {githubProfile && (
            <a
              href={githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 hover:text-black"
            >
              <span className="items-center font-bold">Github:</span>
              <Github size={14} />
            </a>
          )}
          {(email || githubProfile) && linkedinProfile ? " | " : ""}
          {linkedinProfile && (
            <a
              href={linkedinProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 hover:text-blue-400"
            >
              <span className="items-center font-bold">LinkedIn: </span>
              <Linkedin size={14} />
            </a>
          )}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Professional profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}


function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <div className="-mt-3 break-inside-avoid space-y-2 font-['Computer_Modern']">
      <div 
          className="-mb-3 flex text-xl font-normal tracking-wide" 
          style={{ color: colorHex }}
        >
          E <span className="mt-1 items-center text-sm">XPERIENCE</span>
        </div>
        <hr className="-mt-3 h-0.5 bg-black" />
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid">
            <div className="m-0.5 flex items-center justify-between pl-1.5 text-sm font-semibold">
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM,yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM,yyyy") : "Present"}
                </span>
              )}
            </div>
            <div className="m-0.5 -mt-1 flex items-center justify-between pl-2.5 text-sm font-light italic tracking-wide">
              <span>{exp.company}</span>
              {exp.companyLocation && (
                <span className="text-sm tracking-wider">
                  {exp.companyLocation}
                </span>
              )}
            </div>
            {/* <p className="pl-2.5  m-0.5 text-xs font-semibold italic ">{exp.company}</p> */}
            <div className="text-md whitespace-pre-line pl-3 pr-2">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


function ProjectSection ({resumeData}: ResumeSectionProps){
  const {projects, colorHex} = resumeData;

  const projectsNotEmpty = projects?.filter(
    (proj) => Object.values(proj).filter(Boolean).length > 0,
  );

  if(!projectsNotEmpty?.length) return null;
  
  return (
    
    <div className="-mt-3 break-inside-avoid space-y-2 font-['Computer_Modern']">
      <div
        className="-mb-3 flex text-2xl font-normal tracking-wide"
        style={{ color: colorHex }}
      >
        P <span className="mt-1 items-center text-lg font-bold">ROJECTS</span>
      </div>
      <hr className="-mt-3 h-0.5 bg-black" />
      {projectsNotEmpty.map((proj, index) => (
        <div key={index} className="break-inside-avoid">
          <div className="m-0.5 flex items-center justify-between pl-1.5 text-sm font-semibold">
            {/* <span>{proj.projectName}</span> */}
            <p className="text-black-500 flex items-center justify-center gap-2 text-md text-lg tracking-wide">
          {proj.projectName}
          {proj.projectName && proj.techStack ? " | " : ""}
          <span className="italic text-sm">{proj.techStack}</span>
          </p>
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wider"
              >
                <span className="items-center">Link: {proj.projectName}</span>
              </a>
            )}
          </div>
          <div className="text-lg whitespace-pre-line pl-3 pr-2">
              {proj.description}
            </div>
        </div>
      ))}
    </div>
  
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const educationNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationNotEmpty?.length) return null;

  return (
    <>
      <div className="-mb-3 break-inside-avoid space-y-2 font-['Computer_Modern']">
        <div className="-mb-3 flex text-xl font-normal tracking-wide">
          E <span className="mt-1 items-center text-sm">DUCATION</span>
        </div>
        <hr className="-mt-3 h-0.5 bg-black" />
        {educationNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid">
            <div className="-mt-1.5 flex items-center justify-between pl-2 pr-2 text-sm font-semibold tracking-wide">
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span className="font-normal">
                  {edu.endDate && !edu.startDate
                    ? formatDate(edu.endDate, "MM,yyyy")
                    : edu.startDate && edu.endDate
                      ? `${formatDate(edu.startDate, "MM,yyyy")} - ${formatDate(edu.endDate, "MM,yyyy")}`
                      : edu.startDate
                        ? `${formatDate(edu.startDate, "MM,yyyy")} - Present`
                        : ""}
                </span>
              )}
            </div>
            <div className="m-0.5 whitespace-pre-line pl-1.5 text-xs italic tracking-wide">
              {/* <span>{edu.school}</span> */}
              <div className="m-0.5 -mt-1 flex items-center justify-between text-sm font-light tracking-wide">
                <span>{edu.school}</span>
                {edu.cgpa && (
                  <span className="text-sm tracking-wider">
                    GPA: <span className="font-semibold">{edu.cgpa}</span>%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="flex break-inside-avoid flex-wrap gap-2">Skills</p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "10%",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
