export interface financialDoc {
    id: Number,
    name: string,
    slug: string
}
  
export const financialDocument:financialDoc[] = [
    { id:1, name:'Extract from the commercial register',slug: 'commercial_register' },
    { id:2, name:'Company Details',slug: 'comp_details'},
    { id:3, name:'Financials',slug: 'financial_document'},
    { id:4, name:'Prospectus',slug: 'prospectus'},
    { id:5, name:'Business Plan',slug: 'business_plan'},
    { id:6, name:'Business Valuation',slug: 'business_valuation'},
    { id:7, name:'1-Pager Executive Summary',slug: 'one_pager_summary'},
];
  