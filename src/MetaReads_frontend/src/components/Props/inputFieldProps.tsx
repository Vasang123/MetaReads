export interface InputProps {
  value: string;
  label?: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  size?: "small" | "medium";
  type?: string;
}

export interface InputBookProps {
  name: string;
  value: string | number;
  label?: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  size?: "small" | "medium";
  type?: string;
}

export interface InputFileProps {
  name: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  initialFile?: File | null;
}
