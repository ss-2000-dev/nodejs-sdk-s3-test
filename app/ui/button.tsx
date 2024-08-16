interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}
