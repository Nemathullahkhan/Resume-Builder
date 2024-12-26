// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import { EditorFormProps } from "@/lib/types";
// import { skillsSchema, SkillsValues } from "@/lib/validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";

// export default function SkillsTab({ resumeData, setResumeData }: EditorFormProps) {
//   const form = useForm<SkillsValues>({
//     resolver: zodResolver(skillsSchema),
//     defaultValues: {
//       skills: resumeData.skills || [],
//     },
//   });

//   useEffect(() => {
//     const { unsubscribe } = form.watch(async (values) => {
//       const isValid = await form.trigger();
//       if (!isValid) return;
//       setResumeData({
//         ...resumeData,
//         skills:
//           values.skills
//             ?.filter((skill) => skill !== undefined)
//             .map((skill) => skill.trim())
//             .filter((skill) => skill !== "") || [],
//       });
//     });
//     return unsubscribe;
//   }, [form, resumeData, setResumeData]);

//   return (
//     <div className="max-w-xl mx-auto space-y-6">
//       <div className="space-y-1.5 text-center ">
//         <h2 className="text-2xl font-semibold">Skills</h2>
//         <p className="text-sm text-muted-foreground">What are you good at?</p>
//       </div>
//       <Form {...form}>
//         <form className="space-y-3">
//           <FormField
//             control={form.control}
//             name="skills"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="sr-only">Skills</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     {...field}
//                     placeholder="eg React.js, Node.js, Graphic Design,.... "
//                     onChange={(e) => {
//                       const skills = e.target.value.split(",");
//                       field.onChange(skills);
//                     }}
//                   />
//                 </FormControl>
//                 <FormDescription>Separate each skill with a comma,</FormDescription>
//               </FormItem>
//             )}
//           />
//         </form>
//       </Form>P
//     </div>
//   );
// }

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { EditorFormProps } from "@/lib/types";
// import { skillSchema, SkillSetValues } from "@/lib/validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// export default function SkillsTab({
//   resumeData,
//   setResumeData,
// }: EditorFormProps) {
//   const form = useForm<SkillSetValues>({
//     resolver: zodResolver(skillSchema),
//     defaultValues: {
//       skillSet: resumeData.skillSet || [],
//     },
//   });

  

//   useEffect(() => {
//     const { unsubscribe } = form.watch(async (values) => {
//       const isValid = await form.trigger();
//       if (!isValid) return;

//       // setResumeData({
//       //   ...resumeData,
//       //   skillSet:
//       //     values.skillSet
//       //       ?.map((skill) => ({
//       //         languages: skill.languages?.trim() || "",
//       //         frameworks: skill.frameworks?.trim() || "",
//       //         tools: skill.tools?.trim() || "",
//       //         libraries: skill.libraries?.trim() || "",
//       //       }))
//       //       .filter(
//       //         (skill) =>
//       //           skill.languages ||
//       //           skill.frameworks ||
//       //           skill.tools ||
//       //           skill.libraries,
//       //       ) || [],
//       // });
//       setResumeData({...resumeData, skillSet: values.skillSet?.filter((skill)=>skill !== undefined) || []});
    
//     });
//     return unsubscribe;
//   }, [form, resumeData, setResumeData]);

// const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "skillSet",
//   });

//   // return (
//   //   <div className="mx-auto max-w-xl space-y-6">
//   //     <div className="space-y-1.5 text-center">
//   //       <h2 className="text-2xl font-semibold">Skills</h2>
//   //       <p className="text-sm text-muted-foreground">
//   //         Showcase your technical expertise. Add as many skills as you like.
//   //       </p>
//   //     </div>

//   //     <Form {...form}>
//   //       <form className="space-y-4">
//   //         {fields.map((field, index) => (
//   //           <Card key={field.id} className="relative">
//   //             <CardHeader className="flex flex-col items-center justify-between">
//   //               <CardTitle>Technical Skills </CardTitle>
//   //               {/* {fields.length > 1 && (
//   //                 <Button 
//   //                   type="button" 
//   //                   variant="destructive" 
//   //                   size="icon" 
//   //                   onClick={() => remove(index)}
//   //                   className="absolute top-2 right-2"
//   //                 >
//   //                   <Trash2 className="h-4 w-4" />
//   //                 </Button>
//   //               )} */}
//   //             </CardHeader>
//   //             <CardContent>
//   //               <div className="flex flex-col gap-4">
//   //                 <FormField
//   //                   control={form.control}
//   //                   name={`skillSet.${index}.languages`}
//   //                   render={({ field }) => (
//   //                     <FormItem>
//   //                       <FormLabel>Languages</FormLabel>
//   //                       <FormControl>
//   //                         <Input
//   //                           placeholder="e.g., Python, JavaScript"
//   //                           {...field}
//   //                         />
//   //                       </FormControl>
//   //                     </FormItem>
//   //                   )}
//   //                 />
//   //                 <FormField
//   //                   control={form.control}
//   //                   name={`skillSet.${index}.frameworks`}
//   //                   render={({ field }) => (
//   //                     <FormItem>
//   //                       <FormLabel>Frameworks</FormLabel>
//   //                       <FormControl>
//   //                         <Input placeholder="e.g., React, Django" {...field} />
//   //                       </FormControl>
//   //                     </FormItem>
//   //                   )}
//   //                 />
//   //                 <FormField
//   //                   control={form.control}
//   //                   name={`skillSet.${index}.tools`}
//   //                   render={({ field }) => (
//   //                     <FormItem>
//   //                       <FormLabel>Tools</FormLabel>
//   //                       <FormControl>
//   //                         <Input placeholder="e.g., Git, Docker" {...field} />
//   //                       </FormControl>
//   //                     </FormItem>
//   //                   )}
//   //                 />
//   //                 <FormField
//   //                   control={form.control}
//   //                   name={`skillSet.${index}.libraries`}
//   //                   render={({ field }) => (
//   //                     <FormItem>
//   //                       <FormLabel>Libraries</FormLabel>
//   //                       <FormControl>
//   //                         <Input
//   //                           placeholder="e.g., Pandas, TensorFlow"
//   //                           {...field}
//   //                         />
//   //                       </FormControl>
//   //                     </FormItem>
//   //                   )}
//   //                 />
//   //               </div>
//   //             </CardContent>
//   //           </Card>
//   //         ))}

//   //         {/* <div className="flex justify-center">
//   //           <Button 
//   //             type="button" 
//   //             variant="outline" 
//   //             onClick={() => append({ 
//   //               languages: '', 
//   //               frameworks: '', 
//   //               tools: '', 
//   //               libraries: '' 
//   //             })}
//   //           >
//   //             Add Another Skill Set
//   //           </Button>
//   //         </div> */}
//   //       </form>
//   //     </Form>
//   //   </div>
//   // );
//   return (
//     <div className="mx-auto max-w-xl space-y-6">
//       <div className="space-y-1.5 text-center">
//         <h2 className="text-2xl font-semibold">Skills</h2>
//         <p className="text-sm text-muted-foreground">
//         Showcase your technical expertise. Add as many skills as you like.
//         </p>
//       </div>

//       <Form {...form}>
//         <form className="space-y-4">
//           {fields.map((field,index)=>(
//             <SkillItem
//             id = {field.id}
//             key={field.id}
//                 index={index}
//                 form={form}
//                 remove={remove}
//             />
//           ))}
//           <div className="flex justify-center">
//             <Button
//               type="button"
//               onClick={() =>
//                 append({
//                   languages: "",
//                   frameworks: "",
//                   tools: "",
//                   libraries: "",
              
//                 })
//               }
//             >
//               Add skills 
//             </Button>
//           </div>
//         </form>
//       </Form>




//     </div>
//   )

// }


// interface SkillItemProps {
//   id: string;
//   form: UseFormReturn<SkillSetValues>;
//   index: number;
//   remove: (index: number) => void;
// }

// function SkillItem({id,form,index,remove}:SkillItemProps){
//  return (
//   <div className={cn("space-y-3 rounded-md border bg-background p-3")}>

//     <div className="flex justify-between gap-2">
//       <span className="font-semibold">Technical Skills</span>
//     </div>
//     <FormField 
//       control = {form.control}
//       name = {`skillSet.${index}.languages`}
//       render = {({field})=>(
//         <FormItem>
//           <FormLabel>Languages</FormLabel>
//           <FormControl>
//             <Input placeholder="e.g., Python, JavaScript" {...field}/>
//           </FormControl>
//           <FormMessage/>
//         </FormItem>
//       )}
//     />
//     <FormField 
//       control = {form.control}
//       name = {`skillSet.${index}.frameworks`}
//       render = {({field})=>(
//         <FormItem>
//           <FormLabel>Frameworks</FormLabel>
//           <FormControl>
//             <Input placeholder="e.g., React, Django" {...field}/>
//           </FormControl>
//           <FormMessage/>
//         </FormItem>
//       )}
//     />
//     <FormField 
//       control = {form.control}
//       name = {`skillSet.${index}.tools`}
//       render = {({field})=>(
//         <FormItem>
//           <FormLabel>Developer Tools</FormLabel>
//           <FormControl>
//             <Input placeholder="e.g., Git, Docker" {...field}/>
//           </FormControl>
//           <FormMessage/>
//         </FormItem>
//       )}
//     />
//      <FormField 
//       control = {form.control}
//       name = {`skillSet.${index}.libraries`}
//       render = {({field})=>(
//         <FormItem>
//           <FormLabel>Libraries</FormLabel>
//           <FormControl>
//             <Input placeholder="e.g., Pandas, TensorFlow" {...field}/>
//           </FormControl>
//           <FormMessage/>
//         </FormItem>
//       )}
//     />
//     <Button variant="destructive" type="button" onClick={() => remove(index)}>
//         Remove
//       </Button>

//   </div>
//  )
// }



import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { skillSchema, SkillSetValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SkillsTab({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const [showButton, setShowButton] = useState(
    resumeData.skillSet && resumeData.skillSet.length === 0 ? 0 : 1
  );
  const form = useForm<SkillSetValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skillSet: resumeData.skillSet || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skillSet",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({
        ...resumeData,
        skillSet: values.skillSet?.filter((skill) => skill !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  useEffect(() => {
    setShowButton(fields.length === 0 ? 0 : 1);
  }, [fields]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">
          Showcase your technical expertise. Add as many skills as you like.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          {fields.map((field, index) => (
            <SkillItem
              id={field.id}
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}
          {showButton === 0 && (
            <div className="flex justify-center">
              <Button
                type="button"
                onClick={() => {
                  append({
                    languages: "",
                    frameworks: "",
                    tools: "",
                    libraries: "",
                  });
                }}
              >
                Add skills
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

interface SkillItemProps {
  id: string;
  form: UseFormReturn<SkillSetValues>;
  index: number;
  remove: (index: number) => void;
}

function SkillItem({ id, form, index, remove }: SkillItemProps) {
  return (
    <div className={cn("space-y-3 rounded-md border bg-background p-3")}>
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Technical Skills</span>
        <Button
        variant="destructive"
        type="button"
        onClick={() => {
          remove(index);
        }}
      >
        Remove
      </Button>
      </div>
      
      <FormField
        control={form.control}
        name={`skillSet.${index}.languages`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Languages</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Python, JavaScript" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`skillSet.${index}.frameworks`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Frameworks</FormLabel>
            <FormControl>
              <Input placeholder="e.g., React, Django" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`skillSet.${index}.tools`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Developer Tools</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Git, Docker" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`skillSet.${index}.libraries`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Libraries</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Pandas, TensorFlow" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
    </div>
  );
}
