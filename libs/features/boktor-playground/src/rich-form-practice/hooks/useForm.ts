import { useCallback, useState } from 'react';
import { ZodError } from 'zod';
import { FormSchema } from '../schema';

export const useForm = <T extends Record<string, unknown>>(fields: T, onSuccess: () => void, onFailure: () => void) => {
  const [fieldValues, setFieldValues] = useState<T>(() => {
    return Object.entries(fields).reduce((acc, [k, v]) => {
      let sItem = sessionStorage.getItem(k);
      if (sItem) {
        return { ...acc, [k]: sItem };
      }

      return { ...acc, [k]: v };
    }, {} as T);
  });

  const [fieldErrors, setFieldErrors] = useState<T>(() => {
    return Object.entries(fields).reduce((acc, [k]) => ({ ...acc, [k]: undefined }), {}) as T;
  });

  const onChange = useCallback(
    <K extends keyof T>(key: K, value: unknown) => {
      if (fieldErrors[key]) {
        console.log(key);
        setFieldErrors((errors) => ({ ...errors, [key]: undefined }));
        console.log(fieldErrors);
      }
      setFieldValues((fields) => ({ ...fields, [key]: value }));
      sessionStorage.setItem(key as string, value as string);
    },
    [fieldErrors, setFieldErrors, setFieldValues, fieldValues],
  );

  const onSubmit = useCallback(() => {
    try {
      FormSchema.parse(fieldValues);
      onSuccess?.();
    } catch (e) {
      let schemaErrors = e as ZodError;
      if (schemaErrors.errors?.length > 0) {
        schemaErrors.errors.map((err) => {
          setFieldErrors((errors) => ({ ...errors, [err.path[0]]: err.message }));
        });
      }
      console.log(e);
      onFailure?.();
    }
  }, [fieldValues]);

  console.log(fieldValues);
  return { fieldValues, fieldErrors, onChange, onSubmit };
};
