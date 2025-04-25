import { useFieldContext } from '../../contexts/FormContext';
import FieldInfo from './FieldInfo';

type EmailInputProps = { label: string };

function EmailField({ label }: EmailInputProps) {
  const field = useFieldContext<string>();

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input
        id={field.name}
        name={field.name}
        type="email"
        className="rounded-xl border-1 border-slate-800 bg-white px-4 py-1 shadow-md"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </div>
  );
}

export default EmailField;
