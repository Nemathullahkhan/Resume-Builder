// src/app/(main)/editor/forms/ContestsForm.tsx
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
import { contestSchema,contestValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function ContestsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const [showButton, setShowButton] = useState(
    resumeData.contests && resumeData.contests.length === 0 ? 0 : 1,
  );

  const form = useForm<contestValues>({
    resolver: zodResolver(contestSchema),
    defaultValues: {
      contests: resumeData.contests || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contests",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        contests: values.contests?.filter((val) => val !== undefined) || [],
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
        <h2 className="text-2xl font-semibold">Contests</h2>
        <p className="text-sm text-muted-foreground">
          Showcase your competitive programming achievements
        </p>
      </div>

      <Form {...form}>
        {fields.map((field, index) => (
          <ContestItem
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
                  contest: "",
                  contestStanding: "",
                  description: "",
                });
              }}
            >
              Add Contest
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}

interface ContestItemProps {
  id: string;
  form: UseFormReturn<contestValues>;
  index: number;
  remove: (index: number) => void;
}

function ContestItem({ id, form, index, remove }: ContestItemProps) {
  return (
    <div className="space-y-3 rounded-md border bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold text-xl">Contest Details</span>
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
        name={`contests.${index}.contest`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contest Name</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Google Code Jam"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`contests.${index}.contestStanding`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contest Standing</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Top 100 Globally"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`contests.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Additional details about the contest or your performance"
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