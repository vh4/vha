'use client'

import { useTranslations } from "next-intl";

interface Menu {
  id:number;
  title: string;
  description:string;
  repo_url?: string;
  company:string;
  month_start:string;
  year_start:string;
  month_end:string;
  year_end:string;
  tech_stack: string[];
  role?: string;
  image: string[];
  sub: string;
}

export const useGetMenuProjects = (): Menu[] => {
  const menu = useTranslations("project");

  return [
    {
        id:1,
        title: menu('project_title_1'),
        description: menu('project_description_1'),
        sub: menu('project_sub_1'),
        repo_url: '',
        company: 'Bimasakti Multisinergi',
        month_start:'01',
        year_start:'2023',
        month_end:'03',
        year_end:'2025',
        tech_stack: ['PHP', 'Node.js', 'Typescript', 'Next.js', 'Nest.js', 'Elastic'],
        role:'Fullstack Engineer',
        image: ['/ppob_1.png', '/ppob_2.png', '/ppob_3.png', '/ppob_4.png',]
    },
    {
        id:2,
        title: menu('project_title_2'),
        sub: menu('project_sub_2'),
        description: menu('project_description_2'),
        repo_url: '',
        company: 'Bimasakti Multisinergi',
        month_start:'01',
        year_start:'2023',
        month_end:'03',
        year_end:'2025',
        tech_stack: ['PHP', 'Node.js', 'Typescript', 'Next.js', 'Nest.js', 'Elastic', 'GCP'],
        role:'Fullstack Engineer',
        image: ['/travel_1.png', '/travel_2.png', '/travel_3.png', '/travel_4.png',]
    },
    {
        id:3,
        title: menu('project_title_3'),
        sub: menu('project_sub_3'),
        description: menu('project_description_3'),
        repo_url: '',
        company: 'Bimasakti Multisinergi',
        month_start:'01',
        year_start:'2023',
        month_end:'03',
        year_end:'2025',
        tech_stack: ['Node.js', 'Java Selvet', 'Elastic', 'GCP'],
        role:'Backend Support',
        image: ['']
    },
    {
        id:4,
        title: menu('project_title_4'),
        sub: menu('project_sub_4'),
        description: menu('project_description_4'),
        repo_url: '',
        company: 'Bimasakti Multisinergi',
        month_start:'01',
        year_start:'2023',
        month_end:'03',
        year_end:'2025',
        tech_stack: ['Node.js', 'Typescript', 'Elastic', 'GCP'],
        role:'Backend Engineer',
        image: ['']
    },
    {
        id:5,
        title: menu('project_title_5'),
        sub: menu('project_sub_5'),
        description: menu('project_description_5'),
        repo_url: '',
        company: 'Airnav Indonesia',
        month_start:'08',
        year_start:'2021',
        month_end:'09',
        year_end:'2025',
        tech_stack: ['Python'],
        role:'Intern Software Engineer',
        image: ['/airnav.png']
    },
    {
        id:6,
        title: menu('project_title_6'),
        sub: menu('project_sub_6'),
        description: menu('project_description_6'),
        repo_url: 'https://github.com/vh4/Smart-Meter-Research',
        company: 'Telkom University',
        month_start:'12',
        year_start:'2021',
        month_end:'08',
        year_end:'2022',
        tech_stack: ['Python Flask', 'PHP Laravel', 'Tensorflow', 'Google Colab', 'AWS'] ,
        role:'Researcher AI',
        image: ['/prediction_electricity.jpg']
    },
  ];
};