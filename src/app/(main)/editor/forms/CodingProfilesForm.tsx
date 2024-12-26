// src/app/(main)/editor/forms/CodingProfilesForm.tsx
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
import { codingProfileSchema,codingProfileValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function CodingProfilesForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const [showButton, setShowButton] = useState(
    resumeData.codingProfiles && resumeData.codingProfiles.length === 0 ? 0 : 1,
  );

  const form = useForm<codingProfileValues>({
    resolver: zodResolver(codingProfileSchema),
    defaultValues: {
      codingProfiles: resumeData.codingProfiles || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "codingProfiles",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        codingProfiles: values.codingProfiles?.filter((val) => val !== undefined) || [],
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
        <h2 className="text-2xl font-semibold">Coding Profiles</h2>
        <p className="text-sm text-muted-foreground">
          Add your coding platform profiles and achievements
        </p>
      </div>

      <Form {...form}>
        {fields.map((field, index) => (
          <CodingProfileItem
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
                  codingProfile: "",
                  codingProfileLink: "",
                  description: "",
                });
              }}
            >
              Add Coding Profile
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}

interface CodingProfileItemProps {
  id: string;
  form: UseFormReturn<codingProfileValues>;
  index: number;
  remove: (index: number) => void;
}

function CodingProfileItem({ id, form, index, remove }: CodingProfileItemProps) {
  return (
    <div className="space-y-3 rounded-md border bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold text-xl">Coding Profile Details</span>
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
        name={`codingProfiles.${index}.codingProfile`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Platform Name</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., LeetCode, CodeChef"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`codingProfiles.${index}.codingProfileLink`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Link</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., https://leetcode.com/username"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`codingProfiles.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Highlight your achievements or notable solutions"
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