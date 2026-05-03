import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { APP_INFO } from '@/lib/constants';

const Footer = () => {
  const [openModal, setOpenModal] = useState<'terms' | 'contact' | null>(null);

  return (
    <footer className="border-t border-border/50 mt-8">
      <div className="container py-6 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {APP_INFO.NAME}. {APP_INFO.DISCLAIMER}</p>

          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors tap-highlight">Privacy Policy</Link>

            <Dialog open={openModal === 'terms'} onOpenChange={(open) => setOpenModal(open ? 'terms' : null)}>
              <DialogTrigger asChild>
                <button className="hover:text-foreground transition-colors tap-highlight">Terms</button>
              </DialogTrigger>
              <DialogContent className="glass-card border-glass-border">
                <DialogHeader>
                  <DialogTitle className="font-racing">Terms of Use</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground space-y-4">
                  <p>{APP_INFO.NAME} is provided as-is for informational and entertainment purposes only.</p>
                  <p>All race data, standings, and statistics are based on publicly available information and may not be 100% accurate.</p>
                  <p>This application is not affiliated with, endorsed by, or connected to the FIA, WEC, or any racing team.</p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={openModal === 'contact'} onOpenChange={(open) => setOpenModal(open ? 'contact' : null)}>
              <DialogTrigger asChild>
                <button className="hover:text-foreground transition-colors tap-highlight">Contact</button>
              </DialogTrigger>
              <DialogContent className="glass-card border-glass-border">
                <DialogHeader>
                  <DialogTitle className="font-racing">Contact</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground space-y-4">
                  <p>{APP_INFO.NAME} is a fan project created for the WEC community.</p>
                  <p>For feedback, suggestions, or bug reports, please reach out through the app's community channels.</p>
                </div>
              </DialogContent>
            </Dialog>

            <Link to="/cookie-policy" className="hover:text-foreground transition-colors tap-highlight">Cookie Policy</Link>

            <Link to="/terms" className="hover:text-foreground transition-colors tap-highlight">Terms of Use</Link>

            <Link to="/data-request" className="hover:text-foreground transition-colors tap-highlight">Data Request</Link>

            <a href="#" className="termly-display-preferences text-muted-foreground hover:text-foreground transition-colors tap-highlight">
              Consent Preferences
            </a>
          </div>
        </div>
        <p className="text-xs text-muted-foreground/70 text-center mt-4">{APP_INFO.DATA_NOTE}</p>
      </div>
    </footer>
  );
};

export default Footer;
