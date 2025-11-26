import React, { useState, useEffect } from 'react';
import { translations } from '../constants';
import { LangType } from '../types';

interface BookingFormProps {
  t: (key: keyof typeof translations.en) => string;
  lang: LangType;
}

const BookingForm: React.FC<BookingFormProps> = ({ t, lang }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    symptom: 'Brake Service Request',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carYear: '',
    carMake: '',
    carModel: '',
    date: '',
    time: ''
  });

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // Set default date to next available day on mount
  useEffect(() => {
    let date = new Date();
    // Logic: Default to tomorrow or next monday if weekend
    if (date.getDay() === 0) date.setDate(date.getDate() + 1); 
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const formatted = `${y}-${m}-${d}`;
    setSelectedDate(formatted);
    setFormData(prev => ({ ...prev, date: formatted }));
    setCurrentDate(new Date(y, date.getMonth(), 1));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Calendar Logic
  const daysOfWeek = lang === 'es' 
    ? ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'] 
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handleDateClick = (year: number, month: number, day: number) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
    setFormData(prev => ({ ...prev, date: formattedDate, time: '' })); // Reset time when date changes
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  // Time Slot Logic
  const getAvailableTimes = () => {
    if (!selectedDate) return [];
    
    const selectedDateObj = new Date(selectedDate.replace(/-/g, '/'));
    const isSaturday = selectedDateObj.getDay() === 6;
    const baseTimes = isSaturday
      ? ["08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM"]
      : ["08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"];

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const isToday = selectedDate === todayStr;

    return baseTimes.filter(time => {
      if (!isToday) return true;
      
      const timeParts = time.match(/(\d+):(\d+)\s(AM|PM)/);
      if (!timeParts) return false;
      let hours = parseInt(timeParts[1], 10);
      const minutes = parseInt(timeParts[2], 10);
      if (timeParts[3] === 'PM' && hours < 12) hours += 12;
      if (timeParts[3] === 'AM' && hours === 12) hours = 0;
      
      const slotTime = new Date(now);
      slotTime.setHours(hours, minutes, 0, 0);
      return slotTime > now;
    });
  };

  const availableTimes = getAvailableTimes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedPhone = `+1${formData.phone.replace(/\D/g, '')}`;
    
    // Collect UTM params
    const params = new URLSearchParams(window.location.search);
    const getParam = (k: string) => params.get(k) || '';

    // Generate Event ID
    const eventId = `gen_${Date.now()}`;
    
    // GTM Data Layer Push
    const gtmData = {
      event: 'generate_lead',
      event_id: eventId,
      user_data: {
        email: formData.email,
        phone_number: formattedPhone,
        address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
      },
      lead_type: 'generate_lead',
      page_variant: 'brakes_001_react',
      user_language: lang
    };
    
    // Push to dataLayer if it exists
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push(gtmData);
    }

    // N8N Payload
    const payload = {
      "First Name": formData.firstName,
      "Last Name": formData.lastName,
      "Full Name": `${formData.firstName} ${formData.lastName}`,
      "Phone": formattedPhone,
      "Email": formData.email,
      "Car Make": formData.carMake,
      "Car Model": formData.carModel,
      "Car Year": formData.carYear,
      "Vehicle": `${formData.carYear} ${formData.carMake} ${formData.carModel}`,
      "Appointment Date": formData.date,
      "Appointment Time": formData.time,
      "UTM Source": getParam('utm_source') || null,
      "UTM Medium": getParam('utm_medium') || null,
      "UTM Campaign": getParam('utm_campaign') || null,
      "UTM Term": getParam('utm_term') || null,
      "UTM Content": getParam('utm_content') || null,
      "GCLID": getParam('gclid') || null,
      "FBCLID": getParam('fbclid') || null,
      "MSCLKID": getParam('msclkid') || "",
      "GA Client ID": (window as any).ga?.getAll?.[0]?.get('clientId') || "", // Try to get GA Client ID
      "FBC": getParam('fbc') || null,
      "Referrer": document.referrer || null,
      "Page Variant": "brakes_001_react",
      "User Language": lang,
      "Event ID": eventId,
      "Lead Type": "generate_lead"
    };

    // Use the TEST webhook URL for now
    const TEST_WEBHOOK_URL = "https://n8n.queensautoservices.com/webhook-test/122050bb-db0e-48e3-857f-e794f563e0db";

    try {
      const response = await fetch(TEST_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => ({}));
      
      // Redirect Logic
      const state = {
        name: formData.firstName,
        vehicle: `${formData.carYear} ${formData.carMake} ${formData.carModel}`,
        date: formData.date,
        time: formData.time,
        couponCode: responseData.couponCode || '276KJO', // Use response code or fallback
        audioUrl: responseData.audioUrl || null
      };
      
      // Save audio URL to session storage as backup
      if (responseData.audioUrl) {
          sessionStorage.setItem('customAudioUrl', responseData.audioUrl);
      }

      window.history.pushState(state, '', '/thank-you');
      window.dispatchEvent(new PopStateEvent('popstate'));

    } catch (error) {
      console.error('Submission error', error);
      // Fallback redirect
      const state = {
        name: formData.firstName,
        vehicle: `${formData.carYear} ${formData.carMake} ${formData.carModel}`,
        date: formData.date,
        time: formData.time,
        couponCode: '276KJO', // Fallback code
        audioUrl: null
      };
      window.history.pushState(state, '', '/thank-you');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } finally {
        setIsSubmitting(false);
    }
  };

  // Generate Year Options
  const years: number[] = [];
  const nextYear = new Date().getFullYear() + 1;
  for(let i = nextYear; i >= 1980; i--) years.push(i);

  return (
    <section id="book" className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-2xl mx-auto animated-gradient-border shadow-2xl shadow-cyan-500/20">
        <div className="bg-card/95 backdrop-blur-xl rounded-xl p-6 sm:p-8">
            <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">{t('formTitle')}</h2>
            <p className="mt-2 text-lg text-foreground/80">
                {step === 1 && t('formStep1')}
                {step === 2 && t('formStep2')}
            </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 overflow-x-hidden">
            
            {/* Step 1: Contact Info */}
            {step === 1 && (
                <div className="animate-fade-in-up">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-1">{t('firstName')}</label>
                        <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700 rounded-md shadow-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-1">{t('lastName')}</label>
                        <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700 rounded-md shadow-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm" />
                    </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-1">{t('email')}</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700 rounded-md shadow-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-1">{t('mobileNumber')}</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="(###) ###-####" className="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700 rounded-md shadow-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm" />
                    </div>
                    </div>
                    <div className="space-y-4 pt-2">
                        <h3 className="text-xl font-bold text-foreground">{t('vehicleDetails')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground/80 mb-1">{t('carYear')}</label>
                                <select name="carYear" required value={formData.carYear} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700 rounded-md shadow-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm">
                                    <option value="">Select</option>
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground/80 mb-1">{t('carMake')}</label>
                                <input type="text" name="carMake" required value={formData.carMake} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700 rounded-md shadow-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground/80 mb-1">{t('carModel')}</label>
                                <input type="text" name="carModel" required value={formData.carModel} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700 rounded-md shadow-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div className="hidden sm:block"></div>
                    <button 
                        type="button" 
                        onClick={nextStep}
                        disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.carYear || !formData.carMake || !formData.carModel}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 btn-gradient text-white font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('nextBtn2')}
                    </button>
                </div>
                </div>
            )}

            {/* Step 2: Calendar */}
            {step === 2 && (
                <div className="animate-fade-in-up">
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-6 px-4">
                            <button type="button" onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors">
                                <svg className="w-6 h-6 text-foreground/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <h3 className="text-xl font-semibold text-foreground">
                                {currentDate.toLocaleDateString(lang, { month: 'long', year: 'numeric' })}
                            </h3>
                            <button type="button" onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-secondary transition-colors">
                                <svg className="w-6 h-6 text-foreground/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {daysOfWeek.map(d => <div key={d} className="font-semibold text-foreground/60 text-sm py-2">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center">
                            {Array.from({ length: getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) }).map((_, i) => (
                                <div key={`empty-${i}`}></div>
                            ))}
                            
                            {Array.from({ length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }).map((_, i) => {
                                const d = i + 1;
                                const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
                                const today = new Date();
                                today.setHours(0,0,0,0);
                                
                                const dateStr = `${cellDate.getFullYear()}-${String(cellDate.getMonth()+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
                                const isPast = cellDate < today;
                                const isSelected = selectedDate === dateStr;
                                
                                return (
                                    <div 
                                        key={d}
                                        onClick={() => !isPast && handleDateClick(currentDate.getFullYear(), currentDate.getMonth(), d)}
                                        className={`
                                            w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-sm transition-colors mx-auto
                                            ${isPast ? 'text-foreground/40 cursor-not-allowed' : 'hover:bg-secondary'}
                                            ${isSelected ? 'bg-sky-500 text-white font-bold hover:bg-sky-600' : ''}
                                        `}
                                    >
                                        {d}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {selectedDate && (
                        <div className="mt-8 border-t border-border pt-6">
                            <h4 className="text-xl font-semibold text-foreground mb-4">{t('availableTimes')}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {availableTimes.length > 0 ? availableTimes.map(time => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => setFormData(prev => ({...prev, time}))}
                                        className={`
                                            p-2 border rounded-md transition-colors duration-200 text-sm
                                            ${formData.time === time 
                                                ? 'bg-sky-500 text-white border-sky-500' 
                                                : 'border-border text-foreground hover:bg-secondary'}
                                        `}
                                    >
                                        {time}
                                    </button>
                                )) : (
                                    <p className="text-foreground/80 col-span-full text-center">{t('slotsDone' as any)}</p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex flex-col items-center gap-4 border-t border-border pt-6">
                        <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-4">
                            <button type="button" onClick={prevStep} className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-full shadow-lg hover:bg-secondary/80">{t('backBtn')}</button>
                            <button 
                                type="submit" 
                                disabled={!formData.time || isSubmitting}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 btn-gradient text-white font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : null}
                                {t('submitBtn')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;