import { useFieldContext } from '../../contexts/FormContext';
import FieldInfo from './FieldInfo';

type TextInputProps = { label: string };

function TextField({ label }: TextInputProps) {
  const field = useFieldContext<string>();

  return (
    <div>
      <label>{label}</label>
      <div className="relative">
        <input
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
      <FieldInfo field={field} />
    </div>
  );
}

export default TextField;
