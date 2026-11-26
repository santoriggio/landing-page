import type { ImageMetadata } from 'astro';
import consi from '../assets/projects/consi.png';
import filmamo from '../assets/projects/filmamo.png';
import seetua from '../assets/projects/seetua.png';

export type Project = {
  name: string;
  meta: string;
  account: string;
  imageLabel: string;
  image?: {
    src: ImageMetadata;
    alt: string;
  };
  result?: {
    value: string;
    label: string;
  };
  link?: {
    label: string;
    href: string;
  };
};

export const projects: Project[] = [
  {
    name: 'Consi',
    meta: 'Educazione finanziaria · Co-founder & CTO · dal 2025',
    account:
      "Una palestra per allenare ogni giorno il proprio rapporto con i soldi. Seguo tutta la parte tecnica del prodotto. La sfida più grande è creare interfacce semplici e veloci che sappiano educare chi le usa. Dopo il redesign, Consi 2.0 è online.",
    imageLabel: 'Screenshot Consi',
    image: {
      src: consi,
      alt: "Tre schermate dell'app Consi: allenamento, FinFit Index e profilo",
    },
    link: {
      label: 'Scopri Consi',
      href: 'https://consi.online',
    },
  },
  {
    name: 'Filmamo',
    meta: 'Social network per film lovers · Sviluppo app mobile',
    account:
      "Filmamo è il social network per chi ama il cinema: non solo un catalogo, ma un posto dove scoprire film e serie, condividere cosa guardi e confrontarti con altri appassionati. Ho lavorato allo sviluppo dell'app mobile.",
    imageLabel: 'Screenshot Filmamo',
    image: {
      src: filmamo,
      alt: "Tre schermate dell'app Filmamo: profilo, feed e ricerca",
    },
    link: {
      label: 'Scopri Filmamo',
      href: 'https://www.filmamo.com',
    },
  },
  {
    name: 'Seetua',
    meta: 'App di incontri di gruppo · React Native Developer · dal 2024',
    account:
      "Ho rifatto da zero il frontend: onboarding, feed, profilo, creazione contenuti e animazioni, con l'analisi dei dati su Amplitude. Con un A/B test sul feed (blur e una sola call to action) ho portato gli utenti che creano contenuti dal 10% al 40%.",
    imageLabel: 'Screenshot Seetua',
    image: {
      src: seetua,
      alt: "Tre schermate dell'app Seetua: feed, profilo e messaggi",
    },
    result: {
      value: '10% → 40%',
      label: 'utenti che creano contenuti',
    },
  },
];
