import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { Mail, MapPin, Phone, Send, Linkedin, Instagram, Github } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { messages } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const mailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const mailtoHref = `mailto:omarabdulgh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
    trackEvent("contact_form_submit", {
      location: "contact_page",
      method: "mailto",
      has_subject: Boolean(subject),
      has_message: Boolean(message),
    });
    window.location.href = mailtoHref;

    toast.success("Opening your email app...");
    setIsSubmitting(false);
    form.reset();
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
                  {messages.contact.hero.titlePrefix} <span className="text-primary">{messages.contact.hero.titleHighlight}</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {messages.contact.hero.description}
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{messages.contact.info.emailMe}</p>
                      <a href="mailto:omarabdulgh@gmail.com" className="text-lg font-bold hover:text-primary transition-colors" onClick={() => trackEvent("contact_link_click", { location: "contact_page", method: "email" })}>
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
                      <p className="text-sm text-muted-foreground">{messages.contact.info.callMe}</p>
                      <a href="tel:+31636495599" className="text-lg font-bold hover:text-primary transition-colors" onClick={() => trackEvent("contact_link_click", { location: "contact_page", method: "phone" })}>
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
                      <p className="text-sm text-muted-foreground">{messages.contact.info.location}</p>
                      <p className="text-lg font-bold">
                        {messages.contact.info.cityCountry}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 pt-4">
                <a href="https://www.linkedin.com/in/omar-abdelgani/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("social_click", { location: "contact_page", network: "linkedin" })}>
                  <Button type="button" variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                    <Linkedin size={20} />
                  </Button>
                </a>
                <a href="https://github.com/omarabdulghani/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("social_click", { location: "contact_page", network: "github" })}>
                  <Button type="button" variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                    <Github size={20} />
                  </Button>
                </a>
                <a href="https://instagram.com/omar-abdelgani" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("social_click", { location: "contact_page", network: "instagram" })}>
                  <Button type="button" variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                    <Instagram size={20} />
                  </Button>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-heading font-bold mb-6">{messages.contact.form.title}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">{messages.contact.form.nameLabel}</label>
                    <Input id="name" name="name" placeholder={messages.contact.form.namePlaceholder} required className="bg-secondary/50 border-white/5 focus:border-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">{messages.contact.form.emailLabel}</label>
                    <Input id="email" name="email" type="email" placeholder={messages.contact.form.emailPlaceholder} required className="bg-secondary/50 border-white/5 focus:border-primary/50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-muted-foreground">{messages.contact.form.subjectLabel}</label>
                  <Input id="subject" name="subject" placeholder={messages.contact.form.subjectPlaceholder} required className="bg-secondary/50 border-white/5 focus:border-primary/50" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground">{messages.contact.form.messageLabel}</label>
                  <Textarea id="message" name="message" placeholder={messages.contact.form.messagePlaceholder} required className="min-h-[150px] bg-secondary/50 border-white/5 focus:border-primary/50 resize-none" />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-xl text-lg h-12" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      {messages.contact.form.submit} <Send className="ml-2 h-4 w-4" />
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
