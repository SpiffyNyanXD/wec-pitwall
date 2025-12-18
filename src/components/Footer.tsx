import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { APP_INFO } from '@/lib/constants';

const Footer = () => {
  const [openModal, setOpenModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  return (
    <footer className="border-t border-border/50 mt-8">
      <div className="container py-6 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {APP_INFO.NAME}. {APP_INFO.DISCLAIMER}</p>
          
          <div className="flex items-center gap-4">
            <Dialog open={openModal === 'privacy'} onOpenChange={(open) => setOpenModal(open ? 'privacy' : null)}>
              <DialogTrigger asChild>
                <button className="hover:text-foreground transition-colors tap-highlight">Privacy</button>
              </DialogTrigger>
              <DialogContent className="glass-card border-glass-border">
                <DialogHeader>
                  <DialogTitle className="font-racing">Privacy Policy</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground space-y-4">
                  <p>{APP_INFO.NAME} is a fan-made application. We collect minimal data necessary for the app to function.</p>
                  <p>If you create an account, we store your email and preferences securely. We do not share your data with third parties.</p>
                  <p>This is not an official FIA WEC product and is not affiliated with the FIA or WEC.</p>
                </div>
              </DialogContent>
            </Dialog>

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
          </div>
        </div>
        <p className="text-xs text-muted-foreground/70 text-center mt-4">{APP_INFO.MOCK_DATA_NOTE}</p>
      </div>
    </footer>
  );
};

export default Footer;
