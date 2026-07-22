import { DEFAULT_LOCALE } from '../locale'

type MessageKey = 'menuHeading'

const messages: Record<string, Record<MessageKey, string>> = {
  en: {
    menuHeading: 'Our Menu',
  },
}

export function t(key: MessageKey): string {
  const language = DEFAULT_LOCALE.split('-')[0]
  return (messages[language] ?? messages.en)[key]
}
