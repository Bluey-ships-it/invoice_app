import React from "react";

type PillButtonVariant = "default" | "danger" | "primary";

interface PillButtonProps {
	label: string;
	onClick?: () => void;
	variant?: PillButtonVariant;
	disabled?: boolean;
	className?: string;
}

const variantStyles: Record<PillButtonVariant, string> = {
	default:
		"bg-semi-transparent text-muted-blue hover:bg-semi-transparent-hover",
	danger: "bg-danger text-white hover:bg-danger-hover",
	primary: "bg-primary text-white hover:bg-primary-hover",
};

const PillButton: React.FC<PillButtonProps> = ({
	label,
	onClick,
	variant = "default",
	disabled = false,
	className = "",
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
        h-12 px-6 rounded-3xl text-sm cursor-pointer
        transition-all duration-300
 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed font-bold ease-in
        ${variantStyles[variant]}
        ${className}
      `}
		>
			{label}
		</button>
	);
};

export default PillButton;
