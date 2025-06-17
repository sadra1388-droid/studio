"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons"; // Assuming you have an Icons component
import Link from "next/link";

const formSchema = z.object({
  identifier: z.string().min(1, { message: "Phone number or email is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  name: z.string().optional(), // For signup
});

type AuthFormValues = z.infer<typeof formSchema>;

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: AuthFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // In a real app, you would make an API call here.
    // For now, we'll just simulate success and redirect.
    if (mode === "login") {
      toast({
        title: "Login Successful",
        description: "Welcome back to Connectify!",
      });
    } else {
      toast({
        title: "Signup Successful",
        description: "Welcome to Connectify! Please log in.",
      });
      // Redirect to login after signup for this mock
      router.push("/auth/login");
      return;
    }
    
    router.push("/dashboard"); 
  }

  return (
    <Card className="w-full shadow-2xl bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader className="space-y-1 text-center">
        <Icons.logo className="w-12 h-12 mx-auto text-primary" />
        <CardTitle className="text-3xl font-headline">
          {mode === "login" ? "Welcome Back!" : "Create Account"}
        </CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Log in to Connectify to catch up with your friends."
            : "Sign up to start connecting with Connectify."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {mode === "signup" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number / Email</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., +1234567890 or user@example.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {mode === "login" ? "Log In" : "Sign Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link href={mode === "login" ? "/auth/signup" : "/auth/login"} className="font-medium text-accent hover:underline">
            {mode === "login" ? "Sign up" : "Log in"}
          </Link>
        </p>
        {mode === "login" && (
           <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Forgot password?
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
