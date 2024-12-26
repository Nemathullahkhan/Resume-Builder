// src/app/(main)/editor/forms/CoursesForm.tsx
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { courseSchema, courseValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function CoursesForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const [showButton, setShowButton] = useState(
    resumeData.courses && resumeData.courses.length === 0 ? 0 : 1,
  );

  const form = useForm<courseValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courses: resumeData.courses || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "courses",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        courses: values.courses?.filter((val) => val !== undefined) || [],
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
        <h2 className="text-2xl font-semibold">Courses</h2>
        <p className="text-sm text-muted-foreground">
          Add your completed online courses or certifications
        </p>
      </div>

      <Form {...form}>
        {fields.map((field, index) => (
          <CourseItem
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
                  course: "",
                  courseLink: "",
                  description: "",
                });
              }}
            >
              Add Course
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}

interface CourseItemProps {
  id: string;
  form: UseFormReturn<courseValues>;
  index: number;
  remove: (index: number) => void;
}

function CourseItem({ id, form, index, remove }: CourseItemProps) {
  return (
    <div className="space-y-3 rounded-md border bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold text-xl">Course Details</span>
        <Button 
          type="button" 
          variant="destructive" 
          size="sm" 
          onClick={() => remove(index)}
        >
          Remove
        </Button>
      </div>
      <FormField
        control={form.control}
        name={`courses.${index}.course`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Name</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Advanced Web Development"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`courses.${index}.courseLink`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Link</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., https://www.coursera.org/course/web-dev"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`courses.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brief description of the course or key learnings"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}