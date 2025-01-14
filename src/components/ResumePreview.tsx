 import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { resumeSchema, ResumeValues, skillSchema } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { Github, Heading, Linkedin } from "lucide-react";

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
        className={cn("space-y-2 p-6 m-3.5", !width && "invisible")}
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
        <SkillSet resumeData={resumeData} />
        <CustomSection resumeData = {resumeData} />
        <CodingProfileSection resumeData = {resumeData} />
        
        {/* <SkillsSection resumeData={resumeData} /> */}
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
    <div className="flex items-center gap-6 font-['Computer_Modern'] mb-5">
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
            className="text-3xl font-bold tracking-tight"
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
      <div className="break-inside-avoid space-y-1.5 font-['Computer_Modern'] -mb-3 ">
      <div
        className="-mb-2.5 flex text-md tracking-wider"
      >
        P<span className=" items-center text-xs mt-1 ">ROFESSIONAL PROFILE</span>
      </div>
      <div className="w-full h-[1px] -mb-3 bg-black"/>
        <p className="ml-2 -mt-1 whitespace-pre-line text-sm">{summary}</p>
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
      <div className="-mt-4 break-inside-avoid space-y-2 font-['Computer_Modern']">
      <div
        className="-mb-2.5 flex text-md tracking-wider"
      >
        E <span className="mt-1 items-center text-xs ">XPERIENCE</span>
      </div>
      <div className="w-full h-[1px] -mb-3 bg-black"/>
        {workExperiencesNotEmpty.map((exp, index) => (
<div key={index} className="break-inside-avoid ">
            <div className=" -mt-1.5  flex items-center justify-between pl-3 pr-2 text-sm font-semibold ">
              <span className="text-[16px]">{exp.position}</span>
              {exp.startDate && (
                <span >
                  {formatDate(exp.startDate, "MM,yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM,yyyy") : "Present"}
                </span>
              )}
            </div>
            <div className="m-0.5 -mt-1 flex items-center justify-between pl-2.5 text-sm font-light italic tracking-wide">
              <span>{exp.company}</span>
              {exp.companyLocation && (
                <span className="text-sm tracking-wider pr-3">
                  {exp.companyLocation}
                </span>
              )}
            </div>
            {/* <p className="pl-2.5  m-0.5 text-xs font-semibold italic ">{exp.company}</p> */}
            <div className="text-sm whitespace-pre-wrap -mt-1 mb-2.5  pl-6 pr-5">
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
    
    <div className="-mt-3 break-inside-avoid space-y-1.5 font-['Computer_Modern']">
      <div
        className="-mb-2.5 flex text-md tracking-wider"
        style={{ color: colorHex }}
      >
        P <span className="mt-1 items-center text-xs ">ROJECTS</span>
      </div>
      <div className="w-full h-[1px] -mb-3 bg-black"/>
      {projectsNotEmpty.map((proj, index) => (
        <div key={index} className="break-inside-avoid">
          <div className="-mt-1.5 flex items-center justify-between pl-3 pr-2  font-semibold">
            {/* <span>{proj.projectName}</span> */}
            <p className="text-black-500 flex items-center justify-center gap-2 text-[16px] ">
          {proj.projectName}
          {proj.projectName && proj.techStack ? " | " : ""}
          <span className="italic text-sm mb-1 items-center mt-1 font-thin">{proj.techStack}</span>
          </p>
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px]  no-underline"
              >
                <span className="items-center text-sm tracking-wide italic underline-offset-auto">Link: {proj.projectName}</span>
              </a>
            )}
          </div>
          <div className="text-sm -mt-1.5 whitespace-pre-line m-0.5 pl-6  pr-5">
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
      <div className="-mb-3  break-inside-avoid space-y-1.5 font-['Computer_Modern']">
      <div
        className="-mb-2.5 flex text-md tracking-wider"
      >
        E <span className="mt-1 items-center text-xs">DUCATION</span>
      </div>
      <div className="w-full h-[1px] -mb-3 bg-black"/>
        {educationNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid ">
            <div className="-mt-1.5 flex items-center justify-between pl-3 pr-2 font-semibold ">
              <span className="text-[16px]">{edu.degree}</span>
              {edu.startDate && (
                <span className="font-normal text-md">
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
            <div className="ml-2.5 whitespace-pre-line pl-1.5 text-md italic tracking-wide">
              {/* <span>{edu.school}</span> */}
              <div className="-mt-1 flex items-center justify-between  font-light tracking-wide">
                <span>{edu.school}</span>
                {edu.cgpa && (
                  <span className="text-md tracking pr-3">
                    GPA: <span className="font-bold text-sm not-italic">{edu.cgpa}</span>
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

function SkillSet({resumeData}:ResumeSectionProps){
  const{skillSet} =resumeData;
  const skillNotEmpty = skillSet?.filter((skill)=>Object.values(skill).filter(Boolean).length>0,);
  
  if(!skillNotEmpty?.length) return null;

  return (
    <>
    <div className="-mb-3 break-inside-avoid space-y-1.5
    font-['Computer_Modern']">
        <div
        className="-mb-2.5 flex text-md  tracking-wide"
      >
        T <span className="mt-1 items-center text-xs ">ECHNICAL SKILLS</span>
      </div>
      <div className="w-full h-[1px] -mb-3 bg-black"/>
      {skillNotEmpty.map((skill,index)=>(
        <div key = {index} className="break-inside-avoid ">
          <div className=" -mt-1.5 flex flex-col pl-3 pr-2  ">
            <div className=" flex items-center  text-[16px] font-semibold">
              Languages: 
            <span className="font-normal ml-2 tracking-wide text-sm">{skill.languages}</span>
            </div>
            {skill.frameworks && (
            <div className="-mt-1.5 flex items-center  text-[16px] font-semibold">
              Frameworks: 
            <span className="font-normal ml-2 tracking-wide text-sm">{skill.frameworks}</span>
            </div>
            )}
            {skill.tools && (
            <div className="-mt-1.5 flex items-center  text-[16px] font-semibold">
              Developer Tools: 
            <span className="font-normal ml-2 tracking-wide text-sm ">{skill.tools}</span>
            </div>
            )}
            {skill.libraries && (
            <div className="-mt-1.5 flex items-center  text-[16px] font-semibold">
             Libraries: 
            <span className="font-normal ml-2 tracking-wide text-sm ">{skill.libraries}</span>
            </div>
            )}
          </div>
        </div>
      ))}

    </div>
    </>
  )

}

function CustomSection ({resumeData}: ResumeSectionProps){
 const {custom} = resumeData;

 const customNotEmpty = custom?.filter((val)=> Object.values(val).filter(Boolean).length>0);

 if(!customNotEmpty?.length) return null;

 return (
  <>
    {customNotEmpty.map((val, index) => (
      <div key={index} className="-mt-3 break-inside-avoid space-y-2 font-['Computer_Modern']">
        <div className="-mb-3 flex text-2xl font-bold tracking-wide">
          {val.heading?.charAt(0)}
          <span className="mt-1 items-center text-lg font-bold">
            {val.heading?.slice(1)}
          </span>
        </div>
        <hr className="border-1 bg-black" />
        <div className="text-sm whitespace-pre-line -mt-1 pl-4 pr-2">
          {val.description}
        </div>
      </div>
    ))}
  </>
);
}

function CodingProfileSection ({resumeData}:ResumeSectionProps){
const {codingProfiles,colorHex} = resumeData;

const codingProfilesNotEmpty = codingProfiles?.filter(
  (profile)=> Object.values(profile).filter(Boolean).length>0,
);

if(!codingProfilesNotEmpty?.length) return null;

return (
  <div className="">
    <div
      className="-mb-3 flex text-2xl font-bold tracking-wide"
      style={{ color: colorHex }}
    >
      P <span className="mt-1 items-center text-lg font-bold">ROJECTS</span>
    </div>
    <hr />
    {codingProfilesNotEmpty.map((prof,index)=>(
      <div key= {index} className="break-inside-avoid">
        <div className="m-1 -mt-1.5 flex items-center justify-between pl-1.5 text-sm font-semibold">
          <p className="text-black-500 flex items-center justify-center gap-2 text-lg">
            {prof.codingProfile}: 
          </p>
        </div>

      </div>
    ))}
  </div>
)
} 


