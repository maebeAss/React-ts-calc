import { useRef, useState } from "react";
import Button from "../components/Button";
import Display from "../components/Display";
import { Key } from "../types";
import { ButtonProps } from "../components/Button";

const keys: Key[] = [
    Key.CE,
    Key.C,
    Key.BACKSPACE,
    Key.DIVIDE,
    Key.MULTIPLY,
    Key.NINE,
    Key.EIGHT,
    Key.SEVEN,
    Key.SIX,
    Key.FIVE,
    Key.FOUR,
    Key.THREE,
    Key.TWO,
    Key.ONE,
    Key.ZERO,
    Key.MINUS,
    Key.PLUS,
    Key.PLUS_MINUS,
    Key.DOT,
    Key.EQUAL,
];

function KeyPad({ onKeyPress }: { onKeyPress?: (key:string) => void}) {
    const handleClick: ButtonProps['onClick']=(e)=>{
        onKeyPress?.(e.currentTarget.value);
    }
    return (
        <div>
            {keys.map((key) => (
                <Button key={key} value={key} onClick={handleClick}>
                    {key}
                </Button>
            ))}
        </div>
    );
}

enum CalculatorState {
    OPERAND1,
    OPERAND2_ZERO,
    OPERAND2,
    RESULT,
}

const operatorRegex = new RegExp(
    `^[${Key.MINUS}${Key.PLUS}${Key.MULTIPLY}${Key.DIVIDE}]{1}$`
);

function getUpdatedOperand(currentInput: string, key: string) {
    if (key >= Key.ZERO && key <= Key.NINE) {
        return currentInput === Key.ZERO ||
        currentInput === `${Key.NEGATIVE}${Key.ZERO}`
        ? currentInput.slice(0,-1).concat(key) : currentInput.concat(key);
    } else if (key === Key.DOT) {
        if (!currentInput.includes(Key.DOT)) {
            return currentInput.concat(Key.DOT);
        }
    } else if (key === Key.PLUS_MINUS) {
        return currentInput.startsWith(Key.NEGATIVE)
        ? currentInput.slice(1) : Key.NEGATIVE.concat(currentInput);
    } else if (key === Key.BACKSPACE) {
        const lastCharRemoved = currentInput.slice(0,-1);
        return lastCharRemoved === Key.NEGATIVE || lastCharRemoved
        ? lastCharRemoved.concat(Key.ZERO)
        : lastCharRemoved;
    } else if (key === Key.CE) {
        return Key.ZERO;
    }
    return currentInput;
}

export default function Calculator() {
    const [expression, setExpression] = useState<string>('0');
    const [currentInput, setCurrentInput] = useState<string>(Key.ZERO);
    const calculatorState = useRef<CalculatorState>(CalculatorState.OPERAND1);
    calculatorState.current = CalculatorState.OPERAND2;


    function handleKeyPress(key: string) {
        console.log(`${key} is pressed`);
        function reset() {
            setExpression('');
            setCurrentInput(Key.ZERO);
            calculatorState.current = CalculatorState.OPERAND1;
        }
        function setResult() {
            const fullExpression = expression.concat(`${currentInput} ${Key.EQUAL}`);
            setExpression(fullExpression);
            // TODO: ADD CALC LOGIC
            setCurrentInput('Result');
            calculatorState.current = CalculatorState.RESULT;
        } 
        setCurrentInput((prevInput) => prevInput.concat(key));
        switch (calculatorState.current) {
            case CalculatorState.OPERAND1: {
                if (key === Key.C) {
                    reset();
                } else if (key.match(operatorRegex)) {
                    setExpression(currentInput.concat(`${key}`));
                    setCurrentInput(Key.ZERO);
                    calculatorState.current = CalculatorState.OPERAND2_ZERO;
                } else {
                    setCurrentInput(getUpdatedOperand(currentInput, key));
                }
                break;
            }
            case CalculatorState.OPERAND2_ZERO: {
                if (key === Key.C) {
                    reset();
                } else if (key === Key.EQUAL) {
                    setResult();
                } else if (key.match(operatorRegex)) {
                    setExpression(expression.slice(0, -1).concat(key));
                } else {
                    const updatedOperand = getUpdatedOperand(currentInput, key);
                    setCurrentInput(updatedOperand);
                    if (updatedOperand !== Key.ZERO) {
                        calculatorState.current = CalculatorState.OPERAND2;
                    }
                }
                break;
            }
            case CalculatorState.OPERAND2: {
                if (key === Key.C) {
                    reset();
                } else if (key === Key.EQUAL) {
                    setResult();
                } else {
                    const updatedOperand = getUpdatedOperand(currentInput, key);
                    setCurrentInput(updatedOperand);
                    if (updatedOperand === Key.ZERO) {
                        calculatorState.current = CalculatorState.OPERAND2_ZERO;
                    }
                }
                break;
            }
            case CalculatorState.RESULT: {
                if (key === Key.C) {
                    reset();
                }
                break;
            }
        }
    }
    return (
        <div>
            <Display main={currentInput} secondary={expression}></Display>
            <KeyPad onKeyPress={handleKeyPress}></KeyPad>
        </div>
    );
} 