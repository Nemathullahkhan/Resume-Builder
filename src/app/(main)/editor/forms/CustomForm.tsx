  // import { Button } from "@/components/ui/button";
  // import {
  //   Form,
  //   FormControl,
  //   FormField,
  //   FormItem,
  //   FormLabel,
  //   FormMessage,
  // } from "@/components/ui/form";
  // import { Input } from "@/components/ui/input";
  // import { Textarea } from "@/components/ui/textarea";
  // import { EditorFormProps } from "@/lib/types";
  // import { customSchema, customValues } from "@/lib/validation";
  // import { zodResolver } from "@hookform/resolvers/zod";
  // import { useEffect, useState } from "react";
  // import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

  // export default function CustomForm({
  //   resumeData,
  //   setResumeData,
  // }: EditorFormProps) {
  //   const [showButton, setShowButton] = useState(
  //     resumeData.skillSet && resumeData.skillSet.length === 0 ? 0 : 1,
  //   );

  //   const form = useForm<customValues>({
  //     resolver: zodResolver(customSchema),
  //     defaultValues: {
  //       custom: resumeData.custom || [],
  //     },
  //   });

  //   const { fields, append, remove } = useFieldArray({
  //     control: form.control,
  //     name: "custom",
  //   });

  //   useEffect(() => {
  //     const { unsubscribe } = form.watch(async (values) => {
  //       const isValid = await form.trigger();
  //       if (!isValid) return;
  //       setResumeData({
  //         ...resumeData,
  //         custom: values.custom?.filter((val) => val !== undefined) || [],
  //       });
  //     });
  //     return unsubscribe;
  //   }, [form, resumeData, setResumeData]);

  //   useEffect(() => {
  //     setShowButton(fields.length === 0 ? 0 : 1);
  //   }, [fields]);

  //   return (
  //     <div className="mx-auto max-w-xl space-y-6">
  //       <div className="space-y-1.5 text-center">
  //         <h2 className="text-2xl font-semibold">Custom</h2>
  //         <p className="text-sm text-muted-foreground">
  //           Showcase your achivements or Coding Profiles.
  //         </p>
  //       </div>

  //       <Form {...form}>
  //         {fields.map((field, index) => (
  //           <CustomItem
  //             id={field.id}
  //             key={field.id}
  //             index={index}
  //             form={form}
  //             remove={remove}
  //           />
  //         ))}
  //         {showButton === 0 && (
  //           <div className="flex justify-center">
  //             <Button
  //               type="button"
  //               onClick={() => {
  //                 append({
  //                   heading: "",
  //                   description: "",
  //                   link: "",
  //                 });
  //               }}
  //             >
  //               Add Custom section
  //             </Button>
  //           </div>
  //         )}
  //       </Form>
  //     </div>
  //   );
  // }

  // interface CustomItemProps {
  //   id: string;
  //   form: UseFormReturn<customValues>;
  //   index: number;
  //   remove: (index: number) => void;
  // }

  // function CustomItem({ id, form, index, remove }: CustomItemProps) {
  //   return (
  //     <div className="space-y-3 rounded-md border bg-background p-3">
  //       <div className="flex justify-between gap-2">
  //         <span className="font-semibold text-xl">Fill in any of the fields </span>
  //       </div>
  //       <FormField
  //         control={form.control}
  //         name={`custom.${index}.heading`}
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Heading</FormLabel>
  //             <FormControl>
  //               <Input
  //                 placeholder="e.g., Certificaitons or Coding Profiles or simply your achivements"
  //                 {...field}
  //               />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <h1 className="text-center text-xl tracking-tight font-semibold">Course Completion</h1>
  //       <FormField
  //         control={form.control}
  //         name={`custom.${index}.course`}
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Course</FormLabel>
  //             <FormControl>
  //               <Input className="w-2/4 m-4"
  //                 placeholder="e.g., Certificaitons or Coding Profiles or simply your achivements"
  //                 {...field}
  //               />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <FormField
  //         control={form.control}
  //         name={`custom.${index}.courseLink`}
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Course Link </FormLabel>
  //             <FormControl>
  //               <Input
  //                 placeholder="e.g., Certificaitons or Coding Profiles or simply your achivements"
  //                 {...field}
  //               />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <FormField
  //         control={form.control}
  //         name={`custom.${index}.description`}
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Description</FormLabel>
  //             <FormControl>
  //               <Textarea
  //                 placeholder="e.g., Attach your course of completion, ranking of the contests"
  //                 {...field}
  //               />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <FormField
  //         control={form.control}
  //         name={`custom.${index}.link`}
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Links</FormLabel>
  //             <FormControl>
  //               <Input
  //                 placeholder="e.g., Enter the links of your coding profiles or your Certifications"
  //                 {...field}
  //               />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //     </div>
  //   );
  // }




  // import { Button } from "@/components/ui/button";
  // import {
  //   Form,
  //   FormControl,
  //   FormField,
  //   FormItem,
  //   FormLabel,
  //   FormMessage,
  // } from "@/components/ui/form";
  // import { Input } from "@/components/ui/input";
  // import { Textarea } from "@/components/ui/textarea";
  // import { EditorFormProps } from "@/lib/types";
  // import { 
  //   customSchema, 
  //   customValues, 
  //   coursesSchema, 
  //   coursesValues,
  //   contestsSchema,
  //   contestsValues,
  //   codingProfilesSchema,
  //   codingProfilesValues
  // } from "@/lib/validation";
  // import { zodResolver } from "@hookform/resolvers/zod";
  // import { useEffect, useState } from "react";
  // import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
  // import CoursesForm from "./CoursesForm";
  // import ContestsForm from "./ContestsForm";
  // import CodingProfilesForm from "./CodingProfilesForm";

  // type CustomSection = 'custom' | 'courses' | 'contests' | 'codingProfiles';

  // export default function CustomForm({
  //   resumeData,
  //   setResumeData,
  // }: EditorFormProps) {
  //   const [activeSection, setActiveSection] = useState<CustomSection | null>(null);

  //   const customForm = useForm<customValues>({
  //     resolver: zodResolver(customSchema),
  //     defaultValues: {
  //       custom: resumeData.custom || [],
  //     },
  //   });

  //   const { fields, append, remove } = useFieldArray({
  //     control: customForm.control,
  //     name: "custom",
  //   });

  //   useEffect(() => {
  //     const { unsubscribe } = customForm.watch(async (values) => {
  //       const isValid = await customForm.trigger();
  //       if (!isValid) return;
  //       setResumeData({
  //         ...resumeData,
  //         custom: values.custom?.filter((val) => val !== undefined) || [],
  //       });
  //     });
  //     return unsubscribe;
  //   }, [customForm, resumeData, setResumeData]);

  //   const renderActiveForm = () => {
  //     const commonProps = {
  //       resumeData,
  //       setResumeData,
  //     };

  //     switch (activeSection) {
  //       case 'courses':
  //         return <CoursesForm {...commonProps} />;
  //       case 'contests':
  //         return <ContestsForm {...commonProps} />;
  //       case 'codingProfiles':
  //         return <CodingProfilesForm {...commonProps} />;
  //       default:
  //         return null;
  //     }
  //   };

  //   return (
  //     <div className="mx-auto max-w-xl space-y-6">
  //       <div className="space-y-1.5 text-center">
  //         <h2 className="text-2xl font-semibold">Custom Sections</h2>
  //         <p className="text-sm text-muted-foreground">
  //           Showcase additional achievements and profiles
  //         </p>
  //       </div>

  //       {/* Section Selection Buttons */}
  //       <div className="flex justify-center gap-4 mb-6">
  //         <Button 
  //           type="button" 
  //           variant={activeSection === 'courses' ? 'default' : 'outline'}
  //           onClick={() => setActiveSection(activeSection === 'courses' ? null : 'courses')}
  //         >
  //           Add Certificates
  //         </Button>
  //         <Button 
  //           type="button" 
  //           variant={activeSection === 'contests' ? 'default' : 'outline'}
  //           onClick={() => setActiveSection(activeSection === 'contests' ? null : 'contests')}
  //         >
  //           Contests Ranking
  //         </Button>
  //         <Button 
  //           type="button" 
  //           variant={activeSection === 'codingProfiles' ? 'default' : 'outline'}
  //           onClick={() => setActiveSection(activeSection === 'codingProfiles' ? null : 'codingProfiles')}
  //         >
  //           Coding Profiles
  //         </Button>
  //       </div>

  //       {/* Render Active Form */}
  //       {renderActiveForm()}

  //       {/* Custom Section Form (Original Custom Form) */}
  //       <Form {...customForm}>
  //         <div className="space-y-3">
  //           {fields.map((field, index) => (
  //             <CustomItem
  //               id={field.id}
  //               key={field.id}
  //               index={index}
  //               form={customForm}
  //               remove={remove}
  //             />
  //           ))}
  //           {fields.length === 0 && (
  //             <div className="flex justify-center">
  //               <Button
  //                 type="button"
  //                 onClick={() => {
  //                   append({
  //                     heading: "",
  //                     description: "",
  //                     link: "",
  //                   });
  //                 }}
  //               >
  //                 Add Custom Section
  //               </Button>
  //             </div>
  //           )}
  //         </div>
  //       </Form>
  //     </div>
  //   );
  // }

  // interface CustomItemProps {
  //   id: string;
  //   form: UseFormReturn<customValues>;
  //   index: number;
  //   remove: (index: number) => void;
  // }

  // function CustomItem({ id, form, index, remove }: CustomItemProps) {
  //   return (
  //     <div className="space-y-3 rounded-md border bg-background p-3">
  //       <div className="flex justify-between gap-2">
  //         <span className="font-semibold text-xl">Custom Section Details</span>
  //         <Button 
  //           type="button" 
  //           variant="destructive" 
  //           size="sm" 
  //           onClick={() => remove(index)}
  //         >
  //           Remove
  //         </Button>
  //       </div>
  //       <FormField
  //         control={form.control}
  //         name={`custom.${index}.heading`}
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Heading</FormLabel>
  //             <FormControl>
  //               <Input
  //                 placeholder="e.g., Additional Achievements"
  //                 {...field}
  //               />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <FormField
  //         control={form.control}
  //         name={`custom.${index}.description`}
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Description</FormLabel>
  //             <FormControl>
  //               <Textarea
  //                 placeholder="Provide details about your additional achievements"
  //                 {...field}
  //               />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <FormField
  //         control={form.control}
  //         name={`custom.${index}.link`}
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Link</FormLabel>
  //             <FormControl>
  //               <Input
  //                 placeholder="Optional link to more information"
  //                 {...field}
  //               />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //     </div>
  //   );
  // }

  // import { Button } from "@/components/ui/button";
  // import {
  //   Form,
  //   FormControl,
  //   FormField,
  //   FormItem,
  //   FormLabel,
  // } from "@/components/ui/form";
  // import { Input } from "@/components/ui/input";
  // import { EditorFormProps } from "@/lib/types";
  // import { cn } from "@/lib/utils";
  // import { 
  //     customSchema, 
  //     customValues, 
  //   } from "@/lib/validation";
  //   import { zodResolver } from "@hookform/resolvers/zod";

  // import { useEffect } from "react";
  // import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
  // import { Textarea } from "@/components/ui/textarea";

  // export default function CustomForm({resumeData,setResumeData}:EditorFormProps){
  //   const form = useForm<customValues>({
  //     resolver:zodResolver(customSchema),
  //     defaultValues:{
  //       custom: resumeData.custom || []
  //     },
  //   });

  //   useEffect(()=> {
  //     const {unsubscribe} = form.watch(async(values)=>{
  //       const isValid = await form.trigger();
  //       if(!isValid) return;
  //       setResumeData({
  //         ...resumeData,
  //         custom: values.custom?.filter((val)=> val!==undefined) || [],
  //       });
  //     });
  //     return unsubscribe;
  //   },[form,resumeData,setResumeData]);

    
  //     const { fields, append, remove, move } = useFieldArray({
  //       control: form.control,
  //       name: "custom",
  //     });

  //   return (
  //     <div className="mx-auto max-w-xl space-y-6">
  //       <div className="space-y-1.5 text-center">
  //         <h2 className="text-2xl font-semibold">Custom section</h2>
  //         <p className="text-sm text-muted-foreground">Add sections you want to </p>
  //       </div>

  //       <Form {...form}>
  //         <form className="space-y-3">
  //           {fields.map((field,index)=>(
  //             <CustomItem
  //               id = {field.id}
  //               key = {field.key}
  //               index = {index}
  //               form = {form}
  //               remove = {remove}
  //               />
  //           ))}
  //           <div className="flex justify-center">
  //             <Button
  //              type="button"
  //              onClick={() =>
  //                append({
  //                  heading: "",
  //                  description: "",
  //                  link:"",
  //                })
  //              }
  //              >
  //               Add custom section
  //              </Button>
  //           </div>
  //         </form>
  //       </Form>
  //     </div>
  //   )
  // }

  // interface CustomItemProps {
  //   id:string;
  //   form: UseFormReturn<customValues>;
  //   index:number;
  //   remove :(index:number)=>void;
  // }

  // function CustomItem({id,form,index,remove}:CustomItemProps){
  //   return (
  //     <div className="space-y-3 rounded-md border bg-background p-3">

  //     <div className="flex justify-between ">
  //       <span className="font-semibold">Custom</span>
  //     </div>

  //     <FormField 
  //         control = {form.control}
  //         name = {`custom.${index}.heading`}
  //         render = {({field})=>(
  //           <>
  //           {index<1 && (
  //             <FormItem>
  //             <FormLabel>Custom Heading</FormLabel>
  //             <FormControl>
  //               <Input {...field} autoFocus/>
  //             </FormControl>
  //           </FormItem>
  //           )}
  //           </>
            
  //         )}
  //         />
  //         <FormField 
  //             control = {form.control}
  //             name = {`custom.${index}.description`}
  //             render = {({field})=> (
  //               <FormItem>
  //                 <FormLabel>Custom used</FormLabel>
  //                 <FormControl>
  //                   <Textarea {...field} autoFocus />
  //                 </FormControl>
  //               </FormItem>
  //             )}
  //             />
  //          <FormField 
  //             control = {form.control}
  //             name = {`custom.${index}.link`}
  //             render = {({field})=> (
  //               <FormItem>
  //                 <FormLabel>Custom link</FormLabel>
  //                 <FormControl>
  //                   <Input {...field} autoFocus />
  //                 </FormControl>
  //               </FormItem>
  //             )}
  //             />
              
  //             <Button className = "mt-4"variant="destructive" type = "button"
  //             onClick = {()=> remove(index)}>
  //               Remove
  //             </Button>   

  //     </div>
  //   )
  // }
  //-----------------------------------------
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  import ContestsForm from "./ContestsForm";
  import CodingProfilesForm from "./CodingProfilesForm";

  export default function CustomForm() {
    // State for managing visible sections
    const [visibleSection, setVisibleSection] = useState<string>("");

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

        {/* Buttons */}
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
        {/* {visibleSection === "contest" && (
          <div>
            <h3 className="text-xl font-semibold mt-4">Contest</h3>
            <p className="text-muted-foreground">
              Add details about your contests here.
            </p>
            {/* <ContestsForm/> */}
          {/* </div>
        )} */} 

        {visibleSection === "codingProfiles" && (
          <div>
            <h3 className="text-xl font-semibold mt-4">Coding Profiles</h3>
            <p className="text-muted-foreground">
              Add your coding profiles details here.
            </p>
            <CodingProfilesForm/>
          </div>
        )}

        {visibleSection === "courses" && (
          <div>
            <h3 className="text-xl font-semibold mt-4">Courses</h3>
            <p className="text-muted-foreground">
              Add your courses or certifications here.
            </p>
            {/* Courses form goes here */}
          </div>
        )}

        {visibleSection === "custom" && (
          <div>
            <h3 className="text-xl font-semibold mt-4">Custom Section</h3>
            <p className="text-muted-foreground">
              Add any custom information here.
            </p>
            {/* Custom form goes here */}
          </div>
        )}
      </div>
    );
  }

