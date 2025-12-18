import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  to: string;
  label: string;
}

const BackButton = ({ to, label }: BackButtonProps) => {
  return (
    <Button 
      variant="ghost" 
      asChild 
      className="gap-2 text-muted-foreground hover:text-foreground tap-highlight"
    >
      <Link to={to}>
        <ArrowLeft className="w-4 h-4" />
        {label}
      </Link>
    </Button>
  );
};

export default BackButton;
