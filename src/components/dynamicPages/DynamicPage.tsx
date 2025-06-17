import { useParams, Navigate } from 'react-router-dom';
import { useValidatePage } from '../../hooks/useValidatePage';
import { useEffect, useState } from 'react';
import type { Field, HandleChangeFn, RenderFieldFn } from './formTypes';
import { pageSchemas } from '../../constants/pageSchemas';

const handleChange: HandleChangeFn = (index, value, setFields, pageId) => {
  setFields((prevFields) => {
    if (!prevFields) return prevFields;
    const updatedFields = [...prevFields];
    updatedFields[index] = {
      ...updatedFields[index],
      value,
    };
    localStorage.setItem(`formData-${pageId}`, JSON.stringify(updatedFields));
    return updatedFields;
  });
};

const renderField: RenderFieldFn = (field, idx, setFields, pageId) => {
  const commonProps = {
    name: field.name,
    value: typeof field.value === 'string' ? field.value : '',
    placeholder: field.placeholder,
    className: 'border px-3 py-2 rounded-md',
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => handleChange(idx, e.target.value, setFields, pageId),
  };

  switch (field.type) {
    case 'text':
      return (
        <div key={idx} className='flex flex-col'>
          <label className='mb-1 font-medium'>{field.label}</label>
          <input type='text' {...commonProps} />
        </div>
      );
    case 'textarea':
      return (
        <div key={idx} className='flex flex-col'>
          <label className='mb-1 font-medium'>{field.label}</label>
          <textarea
            {...commonProps}
            className={`${commonProps.className} resize-none`}
          />
        </div>
      );
    case 'select':
      return (
        <div key={idx} className='flex flex-col'>
          <label className='mb-1 font-medium'>{field.label}</label>
          <select {...commonProps}>
            <option value=''>Select</option>
            {field.options?.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div key={idx} className='flex items-center gap-2'>
          <input
            type='checkbox'
            name={field.name}
            checked={Boolean(field.value)}
            className='w-4 h-4'
            onChange={(e) =>
              handleChange(idx, e.target.checked, setFields, pageId)
            }
          />
          <label className='font-medium'>{field.label}</label>
        </div>
      );
    default:
      return null;
  }
};

const DynamicPage = () => {
  const { id } = useParams();
  const isValidPage = useValidatePage(id);
  const [fields, setFields] = useState<Field[] | null>(null);

  useEffect(() => {
    if (!id) return;

    const schema = pageSchemas[id.toLowerCase()];
    if (!schema) {
      setFields(null);
      return;
    }

    const saved = localStorage.getItem(`formData-${id}`);
    if (saved) {
      setFields(JSON.parse(saved));
    } else {
      setFields(schema.map((f) => ({ ...f })));
    }
  }, [id]);

  if (isValidPage === null) return null;
  if (!isValidPage || !id) return <Navigate to='*' />;
  return (
    <div className='p-8 w-full max-w-xl mx-auto'>
      <h1 className='text-xl font-semibold mb-6 text-center'>{id}</h1>
      {fields ? (
        <form key={id} className='flex flex-col gap-4'>
          {fields.map((field, idx) => renderField(field, idx, setFields, id))}
        </form>
      ) : (
        <div className='text-center text-gray-500'>Loading...</div>
      )}
    </div>
  );
};

export default DynamicPage;
