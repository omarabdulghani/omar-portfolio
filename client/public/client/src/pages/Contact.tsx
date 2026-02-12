import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message sent successfully! I'll get back to you soon.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <section className="py-20 relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-[url('/images/abstract-texture.png')] opacity-10 mix-blend-overlay" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                  Let's Work <span className="text-primary">Together</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to drop me a message.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Me</p>
                      <a href="mailto:omarabdulgh@gmail.com" className="text-lg font-bold hover:text-primary transition-colors">
                        omarabdulgh@gmail.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Call Me</p>
                      <a href="tel:+31636495599" className="text-lg font-bold hover:text-primary transition-colors">
                        +31 6364 9 55 99
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-lg font-bold">
                        Grote Beer 138, Amstelveen, NL
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                  <Linkedin size={20} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                  <Instagram size={20} />
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-heading font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                    <Input id="name" placeholder="John Doe" required className="bg-secondary/50 border-white/5 focus:border-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                    <Input id="email" type="email" placeholder="john@example.com" required className="bg-secondary/50 border-white/5 focus:border-primary/50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-muted-foreground">Subject</label>
                  <Input id="subject" placeholder="Project Inquiry" required className="bg-secondary/50 border-white/5 focus:border-primary/50" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
                  <Textarea id="message" placeholder="Tell me about your project..." required className="min-h-[150px] bg-secondary/50 border-white/5 focus:border-primary/50 resize-none" />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-xl text-lg h-12" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
