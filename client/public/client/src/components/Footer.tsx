import { Link } from "wouter";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent dark:bg-card border-t border-border/40 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/">
              <a className="text-2xl font-bold font-heading tracking-tight mb-4 block">
                OMAR<span className="text-primary">.</span>
              </a>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              A Creative Business Specialist bridging the gap between design, strategy, and digital marketing to create meaningful user experiences.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:omarabdulgh@gmail.com"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-primary transition-colors">About Me</a>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Portfolio</a>
                </Link>
              </li>
              <li>
                <Link href="/skills">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Skills & Expertise</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={20} className="text-primary shrink-0 mt-1" />
                <span>Grote Beer 138,<br />Amstelveen, Netherlands</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={20} className="text-primary shrink-0" />
                <a href="tel:+31636495599" className="hover:text-foreground transition-colors">
                  +31 6364 9 55 99
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={20} className="text-primary shrink-0" />
                <a href="mailto:omarabdulgh@gmail.com" className="hover:text-foreground transition-colors">
                  omarabdulgh@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Omar Abdulghani. All rights reserved.</p>
          <p>Designed & Built with React & Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
