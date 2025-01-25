interface DisplayProps {
    secondary?: string;
    main?: string;
}

export default function Display({main, secondary}:DisplayProps) {
    return <div>
        <div>{secondary}</div>
        <div>{main}</div>
        </div>;
}