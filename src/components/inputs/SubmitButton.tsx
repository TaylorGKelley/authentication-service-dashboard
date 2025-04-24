import { useFormContext } from '../../contexts/FormContext';

type SubmitButtonProps = {
  label: string;
};
function SubmitButton({ label }: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-xl bg-slate-800 px-6 py-1 text-center text-white shadow-md"
        >
          {label}
        </button>
      )}
    </form.Subscribe>
  );
}

export default SubmitButton;
