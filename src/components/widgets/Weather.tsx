import React, { useEffect, useState } from 'react';
import { FiSun, FiCloud, FiCloudRain, FiCloudDrizzle, FiCloudLightning, FiCloudSnow, FiWind, FiMoon } from 'react-icons/fi';
import { school } from '../../data/site';

// Live conditions in Mathura from Open-Meteo (free, no API key). Renders nothing
// until data arrives so a failed request never leaves a broken widget.

interface Conditions {
  temp: number;
  code: number;
  isDay: boolean;
}

const describe = (code: number, isDay: boolean) => {
  if (code === 0) return { label: 'Clear', Icon: isDay ? FiSun : FiMoon };
  if (code <= 3) return { label: 'Partly cloudy', Icon: FiCloud };
  if (code <= 48) return { label: 'Hazy', Icon: FiWind };
  if (code <= 57) return { label: 'Drizzle', Icon: FiCloudDrizzle };
  if (code <= 67 || (code >= 80 && code <= 82)) return { label: 'Rain', Icon: FiCloudRain };
  if (code <= 77) return { label: 'Snow', Icon: FiCloudSnow };
  return { label: 'Thunderstorm', Icon: FiCloudLightning };
};

const CACHE_KEY = 'ggs-weather';

const Weather: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [data, setData] = useState<Conditions | null>(null);

  useEffect(() => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.at < 20 * 60 * 1000) {
        setData(cached.data);
        return;
      }
    } catch {
      /* storage unavailable */
    }

    const ctrl = new AbortController();
    const { lat, lon } = school.coords;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=Asia%2FKolkata`,
      { signal: ctrl.signal }
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        const next = {
          temp: Math.round(json.current.temperature_2m),
          code: json.current.weather_code,
          isDay: json.current.is_day === 1,
        };
        setData(next);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: next }));
        } catch {
          /* ignore */
        }
      })
      .catch(() => undefined);
    return () => ctrl.abort();
  }, []);

  if (!data) return null;
  const { label, Icon } = describe(data.code, data.isDay);
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} title={`${label} in Mathura`}>
      <Icon className="text-gold-300" />
      <span>Mathura {data.temp}°C</span>
    </span>
  );
};

export default Weather;
