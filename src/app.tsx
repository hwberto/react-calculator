import { useState } from "react";

import Button from "./components/button";

import {
  FaPercent,
  FaPlus,
  FaXmark,
  FaDivide,
  FaMinus,
  FaEquals,
  FaPlusMinus,
} from "react-icons/fa6";

interface IButton {
  className?: string;
  action: () => void;
  children: React.ReactNode | string;
}

export default function App() {
  const [upperText, setUpperText] = useState<string>("");
  const [text, setText] = useState<string>("0");
  const [resolved, setResolved] = useState<boolean>(false);

  const addOperator = (operator: string) => {
    if (text.length > 0 && text.length < 9 && !resolved) {
      setUpperText(`${upperText}${text}${operator}`);
      setText("");
    } else if (text.length > 0 && text.length < 9 && resolved) {
      setResolved(false);
      setUpperText(text + operator);
      setText("");
    }
  };

  const addNumber = (number: string) => {
    if (text.length < 8 && text === "0" && !upperText) setText(number);
    else if (text.length < 8) setText(text + number);
  };

  const changeSign = () => {
    if (text.startsWith("-")) {
      setText(text.substring(1));
    } else {
      setText(`-${text}`);
    }
  };

  const clearLatest = () => {
    if (text.length === 1) {
      setText("0");
    } else if (text.length !== 1) {
      setText(text.slice(0, -1));
    }
  };

  const resolve = () => {
    const result: number = upperText.includes("%")
      ? eval(
          upperText
            .replace("x", "*")
            .replace("÷", "/")
            .replace("%", "*")
            .toString() + text,
        ) / 100
      : eval((upperText + text).replace("x", "*").replace("÷", "/").toString());

    if (
      upperText.endsWith("+") ||
      upperText.endsWith("-") ||
      upperText.endsWith("x") ||
      upperText.endsWith("÷") ||
      upperText.endsWith("%")
    ) {
      setUpperText(upperText + text);
      setText(result.toString().slice(0, 8));
      setResolved(true);
    }
  };

  const buttons: IButton[] = [
    {
      className: "text-indigo-500",
      action: () => {
        setText("0");
        setUpperText("");
      },
      children: "ce",
    },
    {
      action: () => clearLatest(),
      children: "c",
    },
    {
      action: () => addOperator("%"),
      children: <FaPercent />,
    },
    {
      action: () => addOperator("÷"),
      children: <FaDivide />,
    },
    {
      action: () => addNumber("7"),
      children: "7",
    },
    {
      action: () => addNumber("8"),
      children: "8",
    },
    {
      action: () => addNumber("9"),
      children: "9",
    },
    {
      action: () => addOperator("x"),
      children: <FaXmark />,
    },
    {
      action: () => addNumber("4"),
      children: "4",
    },
    {
      action: () => addNumber("5"),
      children: "5",
    },
    {
      action: () => addNumber("6"),
      children: "6",
    },
    {
      action: () => addOperator("-"),
      children: <FaMinus />,
    },
    {
      action: () => addNumber("1"),
      children: "1",
    },
    {
      action: () => addNumber("2"),
      children: "2",
    },
    {
      action: () => addNumber("3"),
      children: "3",
    },
    {
      action: () => addOperator("+"),
      children: <FaPlus />,
    },
    {
      action: () => changeSign(),
      children: <FaPlusMinus />,
    },
    {
      action: () => addNumber("0"),
      children: "0",
    },
    {
      action: () => addNumber("."),
      children: ".",
    },
    {
      className: "!from-indigo-800 !to-indigo-700",
      action: () => resolve(),
      children: <FaEquals />,
    },
  ];

  return (
    <main className="p-6 absolute text-white/90 m-auto top-0 bottom-0 left-0 right-0 bg-gradient-to-bl from-slate-800 to-slate-900 h-max w-80 rounded-2xl shadow-[0px_0px_20px_hsla(0,0%,0%,.2),inset_0px_5px_5px_hsla(0,100%,100%,.06),inset_0px_-5px_10px_hsla(0,0%,0%,.3)]">
      <div className="w-full flex px-2 flex-col items-end">
        <h2 className="opacity-30 h-6">{upperText}</h2>
        <h1 className="h-12 font-semibold text-5xl">{text}</h1>
      </div>
      <ul className="h-auto mt-4 grid grid-cols-4 grid-rows-5 gap-4 select-none">
        {buttons.map((button, idx) => (
          <Button
            key={idx}
            className={button?.className}
            action={button.action}
          >
            {button.children}
          </Button>
        ))}
      </ul>
    </main>
  );
}
