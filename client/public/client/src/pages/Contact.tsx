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
  const { language, messages } = useLanguage();
  const isAr = language === "ar";

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
          <div className="mb-12 md:mb-16 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              {messages.contact.hero.titlePrefix} <span className="text-primary">{messages.contact.hero.titleHighlight}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {messages.contact.hero.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Info */}
            <div className="flex flex-col">
              <div className="space-y-6">
                <Card className="relative rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="relative z-10 p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl text-slate-900 dark:text-white group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]">
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

                <Card className="relative rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="relative z-10 p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl text-slate-900 dark:text-white group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{messages.contact.info.callMe}</p>
                      <a href="tel:+31636495599" className="text-lg font-bold hover:text-primary transition-colors" onClick={() => trackEvent("contact_link_click", { location: "contact_page", method: "phone" })}>
                        <span dir="ltr" className="inline-block">+31 6364 9 55 99</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="relative z-10 p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl text-slate-900 dark:text-white group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{messages.contact.info.location}</p>
                      {/* Desktop Map Location Link */}
                      <a 
                        href="https://maps.app.goo.gl/rbMun3x4J7NGmnP17" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hidden md:block text-lg font-bold hover:text-primary transition-colors"
                        onClick={() => trackEvent("contact_link_click", { location: "contact_page", method: "map_location" })}
                      >
                        {messages.contact.info.cityCountry}
                      </a>
                      {/* Mobile Map Location Link */}
                      <a 
                        href="https://www.google.com/maps/place/Amstelveen/@52.2862169,4.85211,11z/data=!4m6!3m5!1s0x47c5e1d0cb4f622f:0x5c353213b0ca77a9!8m2!3d52.3114207!4d4.870087!16s%2Fg%2F11bc5h1s0g?g_ep=Eg1tbF8yMDI2MDcyOF8wIOC7DCoASAJQAg%3D%3D" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block md:hidden text-lg font-bold hover:text-primary transition-colors"
                        onClick={() => trackEvent("contact_link_click", { location: "contact_page", method: "map_location" })}
                      >
                        {messages.contact.info.cityCountry}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative h-full flex flex-col rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md p-8 shadow-xl dark:shadow-[0_20px_70px_-45px_rgba(59,130,246,0.24)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-6">{messages.contact.form.title}</h3>
              <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
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
                
                <div className="space-y-2 flex-1 flex flex-col">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground">{messages.contact.form.messageLabel}</label>
                  <Textarea id="message" name="message" placeholder={messages.contact.form.messagePlaceholder} required className="flex-1 bg-secondary/50 border-white/5 focus:border-primary/50 resize-none min-h-[80px]" />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-xl text-lg h-12" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      {messages.contact.form.submit} <Send className={isAr ? "mr-2 h-4 w-4 rotate-180" : "ml-2 h-4 w-4"} />
                    </>
                  )}
                </Button>
              </form>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 flex gap-4">
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
      </section>
    </Layout>
  );
}
