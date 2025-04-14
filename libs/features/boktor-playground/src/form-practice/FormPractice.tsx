import { ChangeEvent, FormEvent, useCallback, useReducer } from 'react';
import styled from 'styled-components';

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 16px;
  & > button {
    grid-column-start: 2;
  }
  & > div {
    background-color: blue;
    &:nth-of-type(2n + 1) {
      background-color: red;
    }
  }
`;

export type EmailForm = {
  name: string;
  email: string;
  password: string;
};

function reducer(
  state: Record<string, string>,
  action: { type: 'FORM_CHANGE'; fieldName: keyof typeof state; fieldValue: string },
): Record<string, string> {
  switch (action.type) {
    case 'FORM_CHANGE': {
      console.log(action.fieldName, action.fieldValue);
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };
    }
    default:
      return state;
  }
}

export const FormExample = ({ fields }: { fields: Record<string, string> }) => {
  const [state, dispatcher] = useReducer(reducer, { ...fields });
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatcher({ type: 'FORM_CHANGE', fieldName: e.target.name, fieldValue: e.target.value });
  }, []);

  console.log('STATE', state);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      console.log(state);
      e.preventDefault();
    },
    [state],
  );

  return (
    <Form onSubmit={handleSubmit}>
      {Object.entries(fields).map(([k, _], idx) => {
        return (
          <FormItem key={idx}>
            <label>{k}</label>
            <input name={k} value={state[k]} onChange={handleChange} />
          </FormItem>
        );
      })}
      <button type="submit">Submit</button>
    </Form>
  );
};
