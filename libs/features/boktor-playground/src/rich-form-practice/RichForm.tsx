import { ChangeEvent, FormEvent, useState } from 'react';
import './form-styles.css';
import { useForm } from './hooks';

export type MyForm = {
  name?: string;
  phoneNumber?: number;
  email?: string;
};

export const RichForm = ({ values }: { values: MyForm }) => {
  const [success, setSuccess] = useState<boolean>(false);
  const { onChange, onSubmit, fieldErrors, fieldValues } = useForm<MyForm>(
    values,
    () => {
      setSuccess(true);
    },
    () => {
      setSuccess(false);
    },
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange<keyof typeof values>(e.currentTarget.name as keyof typeof values, e.currentTarget.value);
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-group">
          <p>Email</p>
          <input
            placeholder="Enter an email"
            onChange={(e) => handleChange(e)}
            name="email"
            type="email"
            value={fieldValues['email']}
          />
          {fieldErrors['email'] && <p>Error! {fieldErrors['email']}</p>}
        </div>
        <div className="input-group">
          <p>Name</p>
          <input placeholder="Enter a name" name="name" onChange={(e) => handleChange(e)} value={fieldValues['name']} />
          {fieldErrors['name'] && <p>Error! {fieldErrors['name']}</p>}
        </div>
        <div className="input-group">
          <p>Number</p>
          <input
            placeholder="Enter a number"
            onChange={(e) => handleChange(e)}
            type="number"
            name="phoneNumber"
            value={fieldValues['phoneNumber']}
          />
          {fieldErrors['phoneNumber'] && <p>Error! {fieldErrors['phoneNumber']}</p>}
        </div>
        <button type="submit">Test</button>
      </form>
      {success && <h1>Success!</h1>}
    </>
  );
};
