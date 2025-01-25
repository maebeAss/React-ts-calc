import { ReactNode } from "react";

export interface ButtonProps {
    children?: ReactNode;
    onClick?: JSX.IntrinsicElements['button']['onClick'];
    value?: string;
}

export default function Button({children, onClick, value}:ButtonProps) {
    return <button onClick={onClick} value={value}>{children}</button>;
}