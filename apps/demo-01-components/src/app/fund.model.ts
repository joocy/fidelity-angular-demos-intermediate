export interface Fund {
  id: string; name: string; isin: string; ytdReturn: number; riskRating: 'Low'|'Medium'|'High';
}
export const FUNDS: Fund[] = [
  { id:'1', name:'Apex UK Equity Fund',       isin:'GB00B1234567', ytdReturn: 8.4, riskRating:'Medium' },
  { id:'2', name:'Apex Government Bond Fund', isin:'GB00B2345678', ytdReturn: 2.1, riskRating:'Low'    },
  { id:'3', name:'Apex Emerging Markets Fund',isin:'GB00B3456789', ytdReturn:14.7, riskRating:'High'   },
];
