"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Github, Linkedin, Twitter, Mail, Zap, Send } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left content stagger up
      if (leftRef.current) {
        gsap.from(".contact-left-item", {
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        });
      }

      // Form slide in from right
      if (formRef.current) {
        gsap.from(formRef.current, {
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          },
          x: 60,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "I'll get back to you as soon as possible.",
        });
        form.reset();
      } else {
        toast.error("Failed to send message.", {
          description: "Please try again later or contact me directly via email.",
        });
      }
    } catch (error) {
      toast.error("An error occurred.", {
        description: "Please check your network and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-custom-bg" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Side */}
          <div ref={leftRef} className="flex flex-col pt-8">
            <h2 className="contact-left-item text-5xl md:text-6xl font-bold font-heading text-custom-text mb-6 tracking-tight">
              Let's build something.
            </h2>
            <p className="contact-left-item text-xl text-custom-muted font-light mb-12 max-w-md leading-relaxed">
              Available for full-time roles, freelance opportunities, and open source collaboration.
            </p>

            <div className="contact-left-item flex items-center gap-3 bg-custom-surface2/50 border border-custom-border/50 rounded-full px-5 py-3 w-fit mb-16">
              <Zap className="w-5 h-5 text-custom-highlight" />
              <span className="text-sm text-custom-text font-medium">Usually responds within 24 hours</span>
            </div>

            <div className="contact-left-item flex flex-col gap-6 mt-auto">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-custom-muted mb-2">Connect</h3>
              <div className="flex flex-col gap-4 text-lg">
                <Link href="https://github.com" className="group flex items-center w-fit text-custom-text hover:text-custom-highlight transition-colors">
                  <Github className="w-6 h-6 mr-4 text-custom-muted group-hover:text-custom-highlight transition-colors" />
                  <span className="relative">
                    GitHub
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-custom-highlight transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
                <Link href="https://linkedin.com" className="group flex items-center w-fit text-custom-text hover:text-custom-highlight transition-colors">
                  <Linkedin className="w-6 h-6 mr-4 text-custom-muted group-hover:text-custom-highlight transition-colors" />
                  <span className="relative">
                    LinkedIn
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-custom-highlight transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
                <Link href="https://twitter.com" className="group flex items-center w-fit text-custom-text hover:text-custom-highlight transition-colors">
                  <Twitter className="w-6 h-6 mr-4 text-custom-muted group-hover:text-custom-highlight transition-colors" />
                  <span className="relative">
                    Twitter / X
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-custom-highlight transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
                <Link href="mailto:hello@example.com" className="group flex items-center w-fit text-custom-text hover:text-custom-highlight transition-colors">
                  <Mail className="w-6 h-6 mr-4 text-custom-muted group-hover:text-custom-highlight transition-colors" />
                  <span className="relative">
                    hello@example.com
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-custom-highlight transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div ref={formRef} className="bg-custom-surface border border-custom-border p-8 md:p-10 rounded-3xl shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-custom-text">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-custom-bg border-custom-border focus-visible:ring-custom-ring" {...field} />
                        </FormControl>
                        <FormMessage className="text-custom-danger" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-custom-text">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="bg-custom-bg border-custom-border focus-visible:ring-custom-ring" {...field} />
                        </FormControl>
                        <FormMessage className="text-custom-danger" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-custom-text">Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-custom-bg border-custom-border focus:ring-custom-ring">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-custom-surface border-custom-border">
                          <SelectItem value="full-time" className="focus:bg-custom-surface2">Full-time Role</SelectItem>
                          <SelectItem value="freelance" className="focus:bg-custom-surface2">Freelance Project</SelectItem>
                          <SelectItem value="collaboration" className="focus:bg-custom-surface2">Open Source Collaboration</SelectItem>
                          <SelectItem value="other" className="focus:bg-custom-surface2">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-custom-danger" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-custom-text">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          className="min-h-[150px] bg-custom-bg border-custom-border focus-visible:ring-custom-ring resize-y" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-custom-danger" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg bg-custom-accent text-custom-bg hover:bg-custom-highlight transition-all duration-300"
                >
                  <span className={`flex items-center justify-center gap-2 ${isSubmitting ? "opacity-0 absolute" : "opacity-100"}`}>
                    Send Message <Send className="w-5 h-5" />
                  </span>
                  <span className={`flex items-center justify-center gap-2 ${isSubmitting ? "opacity-100" : "opacity-0 absolute"}`}>
                    Sending...
                  </span>
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </div>
  );
}
