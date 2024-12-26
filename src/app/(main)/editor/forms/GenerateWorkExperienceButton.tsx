import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateWorkExperience } from "./actions";

interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}

export default function GenerateWorkExperienceButton({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) {
  const [showInputDialog, setShowInputDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        // TODO: Block for non-premium users
        onClick={() => setShowInputDialog(true)}
      >
        <WandSparklesIcon className="size-4" />
        Smart fill (AI)
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}

function InputDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) {
  const { toast } = useToast();

  const form = useForm<GenerateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateWorkExperienceInput) {
    try {
      const response = await generateWorkExperience(input);
      onWorkExperienceGenerated(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <Dialog 
    open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate work experience</DialogTitle>
          <DialogDescription>
            Describe this work experience and the AI will generate an optimized
            entry for you.

            <p className="font-bold m-2">NOTE : Please read the text inside the the textarea as it will you give the idea of how to write the prompt</p>
                                       
              
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render ={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="max-w-full overflow-auto"
                      {...field}
                      placeholder={` You can start typing here..

E.g: "Create a professional and detailed job description for the role of [Job Position] at [Company Name], located in [Company Location]. Include the following details:

Date of Joining: [Provide the date of joining].

Current Date: [Provide the current date].

Overview of Role: Write a concise summary of the role

Key Responsibilities: List the tasks and responsibilities associated with the role

Achievements (Optional): Highlight any notable accomplishments or milestones achieved in the position so far.

Impact and Growth Opportunities: Emphasize the value the position adds to the company and opportunities for professional growth.

Ensure the tone is professional and engaging, tailored to showcase the role's importance and the candidate's contributions."`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
