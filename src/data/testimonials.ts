export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  fullQuote: string;
  source: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Francesco Matteoni',
    role: 'Seetua',
    quote:
      "Ha gestito in totale autonomia l'ottimizzazione di onboarding, feed, profilo e creazione contenuti, curando anche le animazioni. […] Altamente raccomandato per progetti che richiedono sia capacità tecniche che sensibilità per l'esperienza utente.",
    fullQuote:
      "Ho lavorato con Santo per rifare da zero il frontend di una nuova app social. Ha gestito in totale autonomia l'ottimizzazione di onboarding, feed, profilo e creazione contenuti, curando anche le animazioni. Oltre alle competenze tecniche, Santo ha saputo affrontare con efficacia le sfide di UX, sempre disponibile a iterare fino a raggiungere un risultato eccellente. Altamente raccomandato per progetti che richiedono sia capacità tecniche che sensibilità per l'esperienza utente.",
    source: 'Raccomandazione LinkedIn',
    photo: '/francesco-matteoni.jpg',
  },
];
