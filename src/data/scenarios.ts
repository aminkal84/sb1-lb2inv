import { Scenario } from '../types/simulation';

export const scenarios: Scenario[] = [
  {
    id: 'pump-cavitation',
    name: {
      en: 'Pump Cavitation',
      fa: 'کاویتاسیون پمپ'
    },
    description: {
      en: 'Vapor bubbles form and collapse in the pump, causing damage',
      fa: 'تشکیل و فروپاشی حباب‌های بخار در پمپ که باعث آسیب می‌شود'
    },
    impact: 'high',
    category: 'mechanical'
  },
  {
    id: 'bearing-wear',
    name: {
      en: 'Bearing Wear',
      fa: 'فرسودگی یاتاقان'
    },
    description: {
      en: 'Excessive bearing wear due to improper lubrication',
      fa: 'فرسودگی بیش از حد یاتاقان به دلیل روانکاری نامناسب'
    },
    impact: 'medium',
    category: 'mechanical'
  },
  {
    id: 'high-temperature',
    name: {
      en: 'High Temperature Operation',
      fa: 'عملکرد در دمای بالا'
    },
    description: {
      en: 'System operating above recommended temperature range',
      fa: 'عملکرد سیستم بالاتر از محدوده دمای توصیه شده'
    },
    impact: 'high',
    category: 'environmental'
  }
];