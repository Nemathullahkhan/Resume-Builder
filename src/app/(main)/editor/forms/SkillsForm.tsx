

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
//       </Form>
//     </div>
//   );
// }
    
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditorFormProps } from "@/lib/types";
import { skillSchema, SkillSetValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export default function SkillsTab({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<SkillSetValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skillSet: resumeData.skillSet?.length 
        ? resumeData.skillSet 
        : [{ 
            languages: '', 
            frameworks: '', 
            tools: '', 
            libraries: '' 
          }],
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
        skillSet: values.skillSet?.map(skill => ({
          languages: skill.languages?.trim() || '',
          frameworks: skill.frameworks?.trim() || '',
          tools: skill.tools?.trim() || '',
          libraries: skill.libraries?.trim() || ''
        })).filter(skill => 
          skill.languages || skill.frameworks || skill.tools || skill.libraries
        ) || []
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">Showcase your technical expertise</p>
      </div>
      
      <Form {...form}>
        <form className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id} className="relative">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Skill Set {index + 1}</CardTitle>
                {fields.length > 1 && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => remove(index)}
                    className="absolute top-2 right-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`skillSet.${index}.languages`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Languages</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Python, JavaScript" 
                            {...field} 
                          />
                        </FormControl>
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
                          <Input 
                            placeholder="e.g., React, Django" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`skillSet.${index}.tools`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tools</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Git, Docker" 
                            {...field} 
                          />
                        </FormControl>
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
                          <Input 
                            placeholder="e.g., Pandas, TensorFlow" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-center">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => append({ 
                languages: '', 
                frameworks: '', 
                tools: '', 
                libraries: '' 
              })}
            >
              Add Another Skill Set
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}