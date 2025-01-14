
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  // import ContestsForm from "./ContestsForm";
  import CodingProfilesForm from "./CodingProfilesForm";

  import { EditorFormProps } from "@/lib/types";
import CoursesForm from "./CoursesForm";
  
  export default function CustomForm({ resumeData, setResumeData }: EditorFormProps) {
    // State for managing visible sections
    const [visibleSection, setVisibleSection] = useState<string>("");
  
    // Toggle between sections
    const handleSectionToggle = (section: string) => {
      setVisibleSection((prev) => (prev === section ? "" : section));
    };
  
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">Custom Section</h2>
          <p className="text-sm text-muted-foreground">
            Add or manage sections you want to include
          </p>
        </div>
  
        {/* Buttons to toggle between sections */}
        <div className="flex justify-between">
          <Button
            variant={visibleSection === "codingProfiles" ? "default" : "outline"}
            onClick={() => handleSectionToggle("codingProfiles")}
          >
            Coding Profiles
          </Button>
          <Button
            variant={visibleSection === "courses" ? "default" : "outline"}
            onClick={() => handleSectionToggle("courses")}
          >
            Courses
          </Button>
          <Button
            variant={visibleSection === "custom" ? "default" : "outline"}
            onClick={() => handleSectionToggle("custom")}
          >
            Custom
          </Button>
        </div>
  
        {/* Dynamic Section Rendering */}
        {visibleSection === "codingProfiles" && (
          <div>
            <h3 className="text-xl font-semibold mt-4">Coding Profiles</h3>
            <p className="text-muted-foreground">
              Add your coding profiles details here.
            </p>
            <CodingProfilesForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>
        )}
  
        {visibleSection === "courses" && (
          <div>
            <h3 className="text-xl font-semibold mt-4">Courses</h3>
            <p className="text-muted-foreground">
              Add your courses or certifications here.
            </p>
            
            <CoursesForm resumeData={resumeData} setResumeData={setResumeData}/>
          </div>
        )}
  
        {visibleSection === "custom" && (
          <div>
            <h3 className="text-xl font-semibold mt-4">Custom Section</h3>
            <p className="text-muted-foreground">
              Add any custom information here.
            </p>
            {/* You can add a CustomForm section if needed */}
          </div>
        )}
      </div>
    );
  }
  

