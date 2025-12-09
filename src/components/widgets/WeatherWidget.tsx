import { motion } from 'framer-motion';
import { Cloud, Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import { weather } from '@/data/wecData';

const WeatherWidget = () => {
  return (
    <motion.div 
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="w-4 h-4 text-primary" />
        <h3 className="font-racing text-lg font-bold">Track Weather</h3>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">{weather.location}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-racing text-4xl font-bold text-foreground">
              {weather.temperature}°
            </span>
            <span className="text-muted-foreground">C</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{weather.condition}</p>
        </div>
        <div className="text-6xl">
          <Sun className="w-16 h-16 text-wec-gold" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Thermometer className="w-4 h-4" />
            <span className="text-xs">Track Temp</span>
          </div>
          <span className="font-racing text-xl font-bold text-foreground">
            {weather.trackTemp}°C
          </span>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Droplets className="w-4 h-4" />
            <span className="text-xs">Humidity</span>
          </div>
          <span className="font-racing text-xl font-bold text-foreground">
            {weather.humidity}%
          </span>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Wind className="w-4 h-4" />
            <span className="text-xs">Wind Speed</span>
          </div>
          <span className="font-racing text-xl font-bold text-foreground">
            {weather.windSpeed} km/h
          </span>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Cloud className="w-4 h-4" />
            <span className="text-xs">Rain Chance</span>
          </div>
          <span className="font-racing text-xl font-bold text-foreground">
            {weather.rainChance}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
