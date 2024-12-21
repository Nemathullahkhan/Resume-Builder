// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import {
//   GenerateProjectInput,
//   generateProjectSchema,
//   Projects,
// } from "@/lib/validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { WandSparklesIcon } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { generateProject } from "./actions";
// import {
//   Dialog,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { DialogContent } from "@radix-ui/react-dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import LoadingButton from "@/components/LoadingButton";

// interface GenerateProjectButtonProps {
//   onProjectGenerated: (project: Projects) => void;
// }

// export default function GenerateProjectButton({
//   onProjectGenerated,
// }: GenerateProjectButtonProps) {
//   const [showInputDialog, setShowInputDialog] = useState(false);

//   return (
//     <>
//       <Button
//         variant="outline"
//         type="button"
//         onClick={() => setShowInputDialog(true)}
//       >
//         <WandSparklesIcon className="size-4" />
//         Smart fill (AI)
//       </Button>
//       <InputDialog 
//         open = {showInputDialog}
//         onOpenChange={setShowInputDialog}
//         onProjectGenerated={(project) => {
//           onProjectGenerated(project);
//           setShowInputDialog(false);
//         }}
//       />
//     </>
//   );
// }

// interface InputDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onProjectGenerated: (project: Projects) => void;
// }

// function InputDialog({
//   open,
//   onOpenChange,
//   onProjectGenerated,
// }: InputDialogProps) {
//   const { toast } = useToast();

//   const form = useForm<GenerateProjectInput>({
//     resolver: zodResolver(generateProjectSchema),
//     defaultValues: {
//       description: "",
//     },
//   });
//   async function onSubmit(input: GenerateProjectInput) {
//     try {
//       const response = await generateProject(input);
//       onProjectGenerated(response);
//     } catch (error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "Something went wrong. Please try again.",
//       });
//     }
//   }
// }

// return (
//   <Dialog open={open} onOpenChange={onOpenChange}>
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Generate Project description</DialogTitle>
//         <DialogDescription>
//           Describe the project you want to generate a description for and the AI
//           will generate an optimized description for you.
//         </DialogDescription>
//       </DialogHeader>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     {...field}
//                     placeholder={`Describe the project you want to generate a description for`}
//                     autoFocus
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <LoadingButton type="submit" loading={form.formState.isSubmitting}>
//             Generate
//           </LoadingButton>
//         </form>
//       </Form>
//     </DialogContent>
//   </Dialog>
// );

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  GenerateProjectInput,
  generateProjectSchema,
  Projects,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import LoadingButton from "@/components/LoadingButton";
import { generateProject } from "./actions";

interface GenerateProjectButtonProps {
  onProjectGenerated: (project: Projects) => void;
}

export default function GenerateProjectButton({
  onProjectGenerated,
}: GenerateProjectButtonProps) {
  const [showInputDialog, setShowInputDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialog(true)}
      >
        <WandSparklesIcon className="size-4 mr-2" />
        Smart fill (AI)
      </Button>
      <InputDialog 
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onProjectGenerated={(project) => {
          onProjectGenerated(project);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectGenerated: (project: Projects) => void;
}

function InputDialog({
  open,
  onOpenChange,
  onProjectGenerated,
}: InputDialogProps) {
  const { toast } = useToast();

  const form = useForm<GenerateProjectInput>({
    resolver: zodResolver(generateProjectSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateProjectInput) {
    try {
      const response = await generateProject(input);
      onProjectGenerated(response);
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Project Description</DialogTitle>
          <DialogDescription>
            Describe the project you want to generate a description for and the AI
            will generate an optimized description for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`"My project is a <type of application, e.g., todo app, e-commerce platform> built using the <list technologies used, e.g., MERN stack, React, Node.js, MongoDB> and deployed on <deployment platform, e.g., Vercel, AWS>. It performs <list key functionalities, e.g., CRUD operations, real-time messaging, payment processing> and includes features like <list unique features or functionalities, e.g., user authentication, dynamic content display, push notifications>. The app provides <describe the user experience or value it offers, e.g., a smooth interface, fast data updates, seamless user interaction>."`}
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