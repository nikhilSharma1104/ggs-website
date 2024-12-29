declare module 'react-big-calendar' {
  import { ComponentType } from 'react';

  export interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
  }

  export interface CalendarProps {
    localizer: any;
    events: Event[];
    startAccessor?: string | ((event: Event) => Date);
    endAccessor?: string | ((event: Event) => Date);
    titleAccessor?: string | ((event: Event) => string);
    tooltipAccessor?: string | ((event: Event) => string);
    allDayAccessor?: string | ((event: Event) => boolean);
    resourceAccessor?: string | ((event: Event) => any);
    resources?: any[];
    resourceIdAccessor?: string | ((resource: any) => string | number);
    resourceTitleAccessor?: string | ((resource: any) => string);
    defaultView?: string;
    defaultDate?: Date;
    views?: string[];
    popup?: boolean;
    selectable?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onSelectEvent?: (event: Event, e: React.SyntheticEvent) => void;
    onSelectSlot?: (slotInfo: {
      start: Date;
      end: Date;
      slots: Date[];
      action: 'select' | 'click' | 'doubleClick';
    }) => void;
  }

  export const Calendar: ComponentType<CalendarProps>;
  
  export interface DateLocalizer {
    format: (value: Date, format: string, culture?: string) => string;
    formats: any;
    propTypes?: any;
  }

  export function dateFnsLocalizer(args: {
    format: (date: Date, format: string, options?: any) => string;
    parse: (value: string, format: string, options?: any) => Date;
    startOfWeek: (date: Date) => Date;
    getDay: (date: Date) => number;
    locales: { [key: string]: any };
  }): DateLocalizer;
}
