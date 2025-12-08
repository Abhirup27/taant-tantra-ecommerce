import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  label?: string;
}

type ViewMode = 'day' | 'month' | 'year';

export function DatePicker({ value, onChange, placeholder = 'Select date', label }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const pickerRef = useRef<HTMLDivElement>(null);

  // Parse the value prop to Date or use current date
  const selectedDate = value ? new Date(value + 'T00:00:00') : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setViewMode('day');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthNamesShort = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleDateClick = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(formattedDate);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleToday = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    onChange(formattedDate);
    setCurrentMonth(today);
    setViewMode('day');
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange('');
    setViewMode('day');
    setIsOpen(false);
  };

  const handleMonthClick = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex));
    setViewMode('day');
  };

  const handleYearClick = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth()));
    setViewMode('month');
  };

  const handleHeaderClick = () => {
    if (viewMode === 'day') {
      setViewMode('month');
    } else if (viewMode === 'month') {
      setViewMode('year');
    }
  };

  const getYearRange = () => {
    const currentYear = currentMonth.getFullYear();
    const startYear = Math.floor(currentYear / 12) * 12;
    const years: number[] = [];
    for (let i = startYear; i < startYear + 12; i++) {
      years.push(i);
    }
    return years;
  };

  const handlePrevYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() - 12, currentMonth.getMonth()));
  };

  const handleNextYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() + 12, currentMonth.getMonth()));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="relative" ref={pickerRef}>
      {label && (
        <label className="text-muted-foreground mb-1 block">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 py-2 text-left border border-border rounded-lg bg-input-background hover:bg-muted/50 transition-colors flex items-center justify-between group"
      >
        <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <CalendarIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden min-w-[300px]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
            <button
              type="button"
              onClick={viewMode === 'year' ? handlePrevYear : handlePrevMonth}
              className="p-1.5 hover:bg-primary/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              type="button"
              onClick={handleHeaderClick}
              className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {viewMode === 'day' && `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
              {viewMode === 'month' && currentMonth.getFullYear()}
              {viewMode === 'year' && `${getYearRange()[0]} - ${getYearRange()[11]}`}
            </button>
            <button
              type="button"
              onClick={viewMode === 'year' ? handleNextYear : handleNextMonth}
              className="p-1.5 hover:bg-primary/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Day View */}
            {viewMode === 'day' && (
              <>
                {/* Day names */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day, index) => (
                    <div
                      key={index}
                      className="h-8 flex items-center justify-center text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <div key={index}>
                      {day === null ? (
                        <div className="h-9" />
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleDateClick(day)}
                          className={`
                            h-9 w-full flex items-center justify-center rounded-lg transition-all
                            ${isSelected(day)
                              ? 'bg-primary text-primary-foreground font-medium shadow-md scale-105'
                              : isToday(day)
                              ? 'bg-secondary/20 text-secondary-foreground border border-secondary/50'
                              : 'hover:bg-muted text-foreground'
                            }
                          `}
                        >
                          {day}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Month View */}
            {viewMode === 'month' && (
              <div className="grid grid-cols-3 gap-2">
                {monthNamesShort.map((month, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleMonthClick(index)}
                    className={`
                      h-12 flex items-center justify-center rounded-lg transition-all
                      ${currentMonth.getMonth() === index
                        ? 'bg-primary text-primary-foreground font-medium shadow-md'
                        : 'hover:bg-muted text-foreground'
                      }
                    `}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}

            {/* Year View */}
            {viewMode === 'year' && (
              <div className="grid grid-cols-3 gap-2">
                {getYearRange().map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearClick(year)}
                    className={`
                      h-12 flex items-center justify-center rounded-lg transition-all
                      ${currentMonth.getFullYear() === year
                        ? 'bg-primary text-primary-foreground font-medium shadow-md'
                        : 'hover:bg-muted text-foreground'
                      }
                    `}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="text-primary hover:text-secondary transition-colors font-medium"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
