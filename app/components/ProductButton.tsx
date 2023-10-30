"use client";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="py-2 text-white px-3 mx-2 rounded-full bg-green-400 border border-transparent hover:bg-yellow-200 hover:border-black hover:text-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
