import type { Field } from '../components/dynamicPages/formTypes';

export const pageSchemas: Record<string, Field[]> = {
  info: [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      placeholder: 'Enter your name',
    },
  ],
  details: [
    {
      type: 'textarea',
      label: 'Description',
      name: 'desc',
      placeholder: 'Write something...',
    },
  ],
  ending: [
    {
      type: 'select',
      label: 'Select Option',
      name: 'option',
      options: ['A', 'B', 'C'],
    },
  ],
  contact: [
    { type: 'text', label: 'Email', name: 'email', placeholder: 'Enter email' },
    { type: 'checkbox', label: 'Subscribe to newsletter', name: 'subscribe' },
  ],
};
