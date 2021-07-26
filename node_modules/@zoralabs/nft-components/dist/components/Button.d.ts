/// <reference types="react" />
export declare type ButtonProps = {
    primary?: boolean;
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
};
export declare const Button: ({ children, primary, href, onClick, }: ButtonProps) => JSX.Element;
