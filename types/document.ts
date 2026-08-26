export type DocumentItem = {
  id: string
  description: string
  quantity: number
  unit: string
  price: number
}

export type DocumentData = {
  date: string
  recipient: string
  company: string
  attention: string
  memo: string
  items: DocumentItem[]
  accountName: string
  accountNumber: string
  bankName: string
}

export const baylatCompany = {
  name: 'BAYLAT PROPERTIES LIMITED',
  shortName: 'BAYLAT PROPERTIES',
  slogan: '...your dream home awaits',
  rc: 'RC NO: 7145654',
  address: '1st Floor, Suit 2-4 Emperor Mall, Beside Shoprite Mall, Sangotedo, Lekki - Epe Expressway, Lagos. ',
  website: 'www.baylatproperties.ng',
  email: 'baylatproperties68@gmail.com ',
  phones: '| +234 783 754 4327,  +234 902 163 9588',
}

export const defaultDocument: DocumentData = {
  date: '2026-08-25',
  recipient: 'The Project Manager',
  company: 'EZION-GEBER ENERGY-LIMITED.',
  attention: 'MRS. DOYIN-ESHO',
  memo: 'QUOTATION FOR SHARP SAND SUPPLIED WITHIN MONASTERY ROAD TO EZIEN-ENERGY.LTD.',
  items: [{ id: 'item-1', description: 'Sand', quantity: 40, unit: 'Tonnes', price: 247000 }],
  accountName: 'BAYLAT PROPERTIES LTD',
  accountNumber: '101-273-66-28',
  bankName: 'ZENITH BANK',
}

export function createEmptyItem(): DocumentItem {
  return { id: `item-${Date.now()}`, description: '', quantity: 0, unit: 'Tonnes', price: 0 }
}
